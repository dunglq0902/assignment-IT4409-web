// Documentation figures, rendered from SVG (not application code).
const fs = require('node:fs');
const path = require('node:path');
const sharp = require(process.env.SHARP_MODULE || 'sharp');
const dir = path.resolve(__dirname, '../docs');
fs.mkdirSync(dir, { recursive: true });
const escape = value => value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
const text = (x, y, value, size = 26, color = '#34415e', weight = 400) => `<text x="${x}" y="${y}" text-anchor="middle" font-family="Arial, sans-serif" font-size="${size}" font-weight="${weight}" fill="${color}">${escape(value)}</text>`;
const box = (x, y, w, h, title, lines, dark = false) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="16" fill="${dark ? '#3159d8' : '#f2f5fc'}" stroke="${dark ? '#3159d8' : '#ced8ed'}" stroke-width="2"/>${text(x + w / 2, y + 43, title, 31, dark ? '#fff' : '#1b2b50', 700)}${lines.map((line, i) => text(x + w / 2, y + 79 + i * 32, line, 24, dark ? '#e9efff' : '#53617d')).join('')}`;
const line = d => `<path d="${d}" fill="none" stroke="#97a9ce" stroke-width="4"/>`;
const svg = (width, height, content) => `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}"><rect width="100%" height="100%" fill="white"/><defs><marker id="arrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 Z" fill="#3159d8"/></marker></defs>${content}</svg>`;
const arrow = d => `<path d="${d}" fill="none" stroke="#3159d8" stroke-width="4" marker-end="url(#arrow)"/>`;
const tree = svg(1500, 740,
  line('M750 145 V195 M240 195 H1260 M240 195 V240 M750 195 V240 M1260 195 V240 M750 380 V440 M1260 380 V440 M750 545 V605 M1260 545 V605') +
  box(550, 20, 400, 125, 'App', ['state: kw, newUser'], true) +
  box(40, 240, 400, 140, 'SearchForm', ['Input tìm kiếm', 'Nhận value và callback']) +
  box(550, 240, 400, 140, 'AddUser', ['state: adding, user', 'Bản nháp người dùng mới']) +
  box(1060, 240, 400, 140, 'ResultTable', ['state: users, editing', 'loading, error, attempt, notice']) +
  box(550, 440, 400, 105, 'Modal', ['Khi adding = true']) +
  box(1060, 440, 400, 105, 'Modal', ['Khi editing khác null']) +
  box(550, 605, 400, 105, 'UserForm', ['Form thêm; state: errors']) +
  box(1060, 605, 400, 105, 'UserForm', ['Form sửa; state: errors']) +
  text(240, 480, 'Component gốc quản lý', 25) + text(240, 516, 'dữ liệu dùng chung.', 25) +
  text(240, 605, 'Modal và UserForm', 25) + text(240, 641, 'được tái sử dụng.', 25));
const flow = svg(1500, 770,
  text(750, 45, 'TÌM KIẾM', 28, '#1b2b50', 700) +
  box(30, 115, 400, 120, 'SearchForm', ['Người dùng nhập từ khóa']) +
  box(550, 115, 400, 120, 'App', ['setKeyword(text) → kw'], true) +
  box(1070, 115, 400, 120, 'ResultTable', ['filter(users, keyword)']) +
  arrow('M430 175 H542') + arrow('M950 175 H1062') +
  text(490, 100, 'callback', 22) + text(1010, 100, 'props', 22) +
  text(400, 285, 'onChangeValue(text)', 25) + text(1100, 285, 'keyword={kw}', 25) +
  text(750, 365, 'THÊM NGƯỜI DÙNG', 28, '#1b2b50', 700) +
  box(30, 440, 400, 120, 'AddUser', ['Gửi bản nháp hợp lệ']) +
  box(550, 440, 400, 120, 'App', ['handleAdd(data) → newUser'], true) +
  box(1070, 440, 400, 120, 'ResultTable', ['useEffect → setUsers']) +
  arrow('M430 500 H542') + arrow('M950 500 H1062') +
  text(490, 425, 'onAdd(data)', 22) + text(1010, 425, 'user prop', 22) +
  arrow('M1270 560 V655 H750 V570') +
  text(1045, 700, 'onAdded() → App đặt newUser = null', 25) +
  text(750, 752, 'Props đi xuống; component con gọi callback do App truyền xuống.', 24, '#53617d'));
(async () => {
  for (const [name, content] of [['component-tree', tree], ['state-lifting', flow]]) {
    fs.writeFileSync(path.join(dir, name + '.svg'), content);
    await sharp(Buffer.from(content)).png().toFile(path.join(dir, name + '.png'));
  }
  const work = path.resolve(dir, '../../.local/react-crud');
  await sharp(path.join(work, 'desktop.png')).extract({ left: 65, top: 110, width: 1310, height: 775 }).resize(1600).png().toFile(path.join(dir, 'application.png'));
  await sharp(path.join(work, 'add-modal.png')).extract({ left: 400, top: 195, width: 640, height: 660 }).png().toFile(path.join(dir, 'add-form.png'));
  console.log('Created component tree, state flow, and application screenshots.');
})();
