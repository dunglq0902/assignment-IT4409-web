const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { createServer } = require('node:http');
const { chromium } = require('playwright');

const root = path.resolve(__dirname, '..');
const out = path.resolve(root, '../.local/react-crud');
const API = 'https://jsonplaceholder.typicode.com/users';
const sample = Array.from({ length: 10 }, (_, i) => ({ id: i + 1, name: `Sample User ${i + 1}`, username: `sample${i + 1}`, email: `user${i + 1}@example.com`, phone: '0123456789', website: 'example.com', address: { street: `Street ${i + 1}`, suite: `Room ${i + 1}`, city: 'Hà Nội' } }));
const passed = [];
const mark = text => { passed.push(text); console.log(`PASS: ${text}`); };

(async () => {
  fs.mkdirSync(out, { recursive: true });
  const server = createServer((request, response) => {
    const url = new URL(request.url, 'http://localhost');
    const dev = url.pathname.startsWith('/dev/');
    const base = dev ? path.join(out, 'dev') : root;
    const relative = dev ? url.pathname.slice(5) : url.pathname.slice(1);
    const file = path.resolve(base, relative || 'index.html');
    if (!file.startsWith(base + path.sep)) return response.writeHead(403).end();
    try {
      const data = fs.readFileSync(file);
      response.writeHead(200, { 'Content-Type': ({ '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml' })[path.extname(file)] || 'application/octet-stream' });
      response.end(data);
    } catch { response.writeHead(404).end(); }
  });
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const base = process.argv[2] || `http://127.0.0.1:${server.address().port}/`;
  const local = `http://127.0.0.1:${server.address().port}/`;
  const browser = await chromium.launch({ headless: true, ...(process.env.PLAYWRIGHT_CHANNEL ? { channel: process.env.PLAYWRIGHT_CHANNEL } : {}) });
  const context = await browser.newContext({ viewport: { width: 1440, height: 1050 } });
  const page = await context.newPage();
  const consoleProblems = [];
  page.on('pageerror', error => consoleProblems.push(error.message));
  page.on('console', message => { if (['error', 'warning'].includes(message.type())) consoleProblems.push(message.text()); });
  const rows = () => page.locator('tbody tr[data-user-id]');
  const waitCount = async count => { await page.waitForFunction(count => document.querySelectorAll('tbody tr[data-user-id]').length === count, count); };
  const openAdd = () => page.getByRole('button', { name: 'Thêm người dùng', exact: true }).click();
  const fillUser = async (name, username) => {
    await page.getByRole('dialog').getByLabel('Họ và tên').fill(name);
    await page.getByRole('dialog').getByLabel('Tên đăng nhập').fill(username);
  };
  try {
    await page.route(API, route => route.fulfill({ json: sample }));
    await page.goto(base);
    await waitCount(10);
    mark('Read: hiển thị đủ 10 người dùng');
    await page.getByRole('searchbox').fill('SAMPLE2');
    await waitCount(1);
    assert.match(await rows().innerText(), /Sample User 2/);
    await page.getByRole('searchbox').fill('không tồn tại');
    await waitCount(0);
    assert.equal(await page.getByText('Không tìm thấy người dùng', { exact: true }).count(), 1);
    await page.getByRole('button', { name: 'Xóa từ khóa' }).click();
    await waitCount(10);
    mark('Search: username, hoa/thường, không có kết quả, xóa bộ lọc');

    await openAdd();
    await page.getByRole('dialog').getByRole('button', { name: 'Thêm người dùng' }).click();
    assert.equal(await page.getByRole('alert').count(), 2);
    await fillUser('   ', '   ');
    await page.getByRole('dialog').getByRole('button', { name: 'Thêm người dùng' }).click();
    assert.equal(await page.getByRole('alert').count(), 2);
    await fillUser('Đặng Thị An', 'dangan');
    await page.getByRole('dialog').getByLabel('Email', { exact: true }).fill('bad-email');
    await page.getByRole('dialog').getByRole('button', { name: 'Thêm người dùng' }).click();
    assert.equal(await page.getByText('Email chưa đúng định dạng.').count(), 1);
    await page.getByRole('dialog').getByLabel('Email', { exact: true }).fill('an@example.com');
    await page.getByLabel('Đường / phố').fill('Đại Cồ Việt');
    await page.getByLabel('Căn hộ / phòng').fill('P301');
    await page.getByLabel('Thành phố').fill('Hà Nội');
    await page.getByRole('dialog').getByRole('button', { name: 'Thêm người dùng' }).click();
    await waitCount(11);
    assert.equal(await page.getByRole('dialog').count(), 0);
    assert.match(await page.locator('[data-user-id="local-1"]').innerText(), /Đại Cồ Việt, P301[\s\S]*Hà Nội/);
    mark('Create: validation trống/khoảng trắng/email và địa chỉ lồng');
    await page.getByRole('searchbox').fill('dang thi an');
    await waitCount(1);
    mark('Search: tìm tên tiếng Việt không dấu');
    await page.getByRole('button', { name: 'Xóa từ khóa' }).click();
    await page.getByRole('button', { name: 'Sửa Đặng Thị An', exact: true }).click();
    await page.getByLabel('Đường / phố').fill('Địa chỉ chưa lưu');
    await page.getByRole('button', { name: 'Hủy', exact: true }).click();
    assert.match(await page.locator('[data-user-id="local-1"]').innerText(), /Đại Cồ Việt/);
    assert.doesNotMatch(await page.locator('[data-user-id="local-1"]').innerText(), /chưa lưu/);
    mark('Cancel edit: không làm thay đổi địa chỉ gốc');
    await page.getByRole('button', { name: 'Sửa Đặng Thị An', exact: true }).click();
    await page.getByLabel('Đường / phố').fill('Trần Đại Nghĩa');
    await page.getByRole('button', { name: 'Lưu thay đổi' }).click();
    assert.match(await page.locator('[data-user-id="local-1"]').innerText(), /Trần Đại Nghĩa, P301[\s\S]*Hà Nội/);
    mark('Update: lưu đúng hàng, giữ suite và city');

    await page.getByRole('button', { name: 'Xóa Sample User 5', exact: true }).click();
    await waitCount(10);
    await openAdd(); await fillUser('Người dùng mới', 'newuser');
    await page.getByRole('dialog').getByRole('button', { name: 'Thêm người dùng' }).click();
    await waitCount(11);
    const ids = await rows().evaluateAll(elements => elements.map(element => element.dataset.userId));
    assert.equal(ids.length, new Set(ids).size);
    assert(ids.includes('10')); assert(ids.includes('local-2')); assert(!ids.includes('5'));
    await page.getByRole('button', { name: 'Xóa Người dùng mới', exact: true }).click();
    await waitCount(10);
    assert.equal(await page.locator('[data-user-id="10"]').count(), 1);
    mark('Delete + Create: ID không trùng, xóa không ảnh hưởng hàng khác');
    await openAdd();
    await page.keyboard.press('Escape');
    assert.equal(await page.getByRole('dialog').count(), 0);
    assert.equal(await page.getByRole('button', { name: 'Thêm người dùng', exact: true }).evaluate(element => element === document.activeElement), true);
    mark('Modal: Escape đóng và trả focus về nút mở');

    for (const width of [320, 390, 768, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      const overflows = await page.evaluate(() => document.documentElement.scrollWidth > innerWidth);
      assert.equal(overflows, false, `overflow at ${width}`);
      await openAdd();
      const box = await page.getByRole('dialog').boundingBox();
      assert(box.x >= 0 && box.x + box.width <= width && box.y >= 0);
      await page.getByRole('button', { name: 'Hủy', exact: true }).click();
    }
    mark('Responsive: trang và modal ở 320 / 390 / 768 / 1440 px');

    await page.setViewportSize({ width: 1440, height: 1050 });
    await page.unroute(API);
    const errorsBefore = consoleProblems.length;
    await page.route(API, route => route.abort('failed'));
    await page.reload();
    await page.getByRole('button', { name: 'Thử lại' }).waitFor();
    await page.unroute(API);
    await page.route(API, route => route.fulfill({ json: sample }));
    await page.getByRole('button', { name: 'Thử lại' }).click();
    await waitCount(10);
    // A failed network request deliberately logs a browser network diagnostic.
    const deliberate = consoleProblems.splice(errorsBefore);
    assert(deliberate.every(message => message.includes('Failed to load resource') || message.includes('net::ERR_FAILED')));
    mark('API error: thông báo lỗi và Thử lại khôi phục dữ liệu');

    await page.unroute(API);
    await page.route(API, route => route.fulfill({ json: { invalid: true } }));
    await page.reload();
    await page.getByRole('button', { name: 'Thử lại' }).waitFor();
    assert.equal(await rows().count(), 0);
    mark('API schema: dữ liệu sai được xử lý, ứng dụng không crash');

    let release;
    const gate = new Promise(resolve => { release = resolve; });
    await page.unroute(API);
    await page.route(API, async route => { await gate; await route.fulfill({ json: sample }); });
    await page.reload();
    await openAdd(); await fillUser('Thêm khi đang tải', 'early');
    await page.getByRole('dialog').getByRole('button', { name: 'Thêm người dùng' }).click();
    await waitCount(1);
    release();
    await waitCount(11);
    assert.equal(await page.getByText('Thêm khi đang tải', { exact: true }).count(), 1);
    mark('Fetch race: tải API không ghi đè người dùng vừa thêm');

    if (!process.argv[2]) {
      await page.goto(local + 'dev/index.html');
      await waitCount(10);
      await openAdd(); await fillUser('StrictMode User', 'strict');
      await page.getByRole('dialog').getByRole('button', { name: 'Thêm người dùng' }).click();
      await waitCount(11);
      assert.equal(await page.getByText('StrictMode User', { exact: true }).count(), 1);
      mark('Development StrictMode: thêm đúng một lần, không warning');
    }
    assert.deepEqual(consoleProblems, []);
    mark('Console: không có React warning hay JavaScript error');

    await page.unroute(API);
    await page.goto(base);
    await waitCount(10);
    await page.screenshot({ path: path.join(out, process.argv[2] ? 'live-desktop.png' : 'desktop.png'), fullPage: true });
    await openAdd();
    await page.getByLabel('Họ và tên').fill('Nguyễn Văn An');
    await page.getByLabel('Tên đăng nhập').fill('nguyenvanan');
    await page.screenshot({ path: path.join(out, 'add-modal.png'), fullPage: true });
    await page.getByRole('button', { name: 'Hủy', exact: true }).click();
    await page.setViewportSize({ width: 390, height: 844 });
    await page.screenshot({ path: path.join(out, 'mobile.png'), fullPage: true });
    mark('Live API: tải JSONPlaceholder thật và chụp giao diện');

    if (!process.argv[2]) {
      const esbuild = require('esbuild');
      await esbuild.build({ entryPoints: [path.join(__dirname, 'duplicate-key.jsx')], bundle: true, outfile: path.join(out, 'dev/duplicate-key.js'), define: { 'process.env.NODE_ENV': '"development"' } });
      fs.writeFileSync(path.join(out, 'dev/duplicate-key.html'), '<meta charset="utf-8"><div id="root"></div><script src="duplicate-key.js"></script>');
      const repro = await context.newPage();
      const warnings = [];
      repro.on('console', message => { if (message.type() === 'error') warnings.push(message.text()); });
      await repro.goto(local + 'dev/duplicate-key.html');
      await repro.getByText('Xóa ID 5', { exact: true }).click();
      await repro.getByText('Thêm theo length', { exact: true }).click();
      await repro.waitForFunction(() => [...document.querySelectorAll('li')].filter(element => element.textContent.startsWith('ID 10:')).length === 2);
      assert(warnings.some(message => message.includes('Encountered two children with the same key')));
      fs.writeFileSync(path.join(out, 'duplicate-key-warning.txt'), warnings.join('\n'), 'utf8');
      mark('Reproduction: mã mẫu prev.length + 1 thực sự phát warning key trùng');
    }
    fs.writeFileSync(path.join(out, process.argv[2] ? 'live-verification.json' : 'verification.json'), JSON.stringify({ base, passed, consoleProblems }, null, 2));
    console.log(`${passed.length} nhóm kiểm tra thành công.`);
  } finally {
    await browser.close();
    await new Promise(resolve => server.close(resolve));
  }
})().catch(error => { console.error(error); process.exitCode = 1; });
