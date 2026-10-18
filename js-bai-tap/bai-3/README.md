# Bài tập 3 — JavaScript: thư viện ảnh và tin nhanh

## Xem bài làm

- [Bài 3a — Thư viện ảnh](http://www.dunglq09.id.vn/js-bai-tap/bai-3/index.html).
- [Bài 3b — Lọc tin và đăng tin nhanh](http://www.dunglq09.id.vn/js-bai-tap/bai-3/news.html).
- [Bản ZIP bài làm](../bai-3-js-hoan-thien.zip).

Chạy `npm start` ở thư mục gốc repository rồi mở
`http://127.0.0.1:4173/js-bai-tap/bai-3/`, hoặc mở trực tiếp các file HTML.

## Nội dung hoàn thành

- `js/bai-a-gallery.js`: điền đủ 27 chỗ trống, cả code và kết quả dự đoán.
- `js/bai-b-tin-nhanh.js`: hoàn thành F1–F5: bộ đếm, lọc `keyup`, thông báo
  không tìm thấy, mở/thu gọn và đăng tin nhanh.

HTML, CSS, ảnh, font, `js/ho-tro.js` và `js/kiem-tra.js` giữ nguyên từ ZIP đề bài.

## Kiểm tra Bài 3a

Đã kiểm tra cả 6 ảnh nhỏ: đổi đúng ảnh lớn, cập nhật chú thích và chỉ một
ảnh có viền chọn. Bấm nền `<ul>` hoặc mép `<li>` không đổi ảnh hay phát sinh lỗi.
Ô tìm kiếm xoá/khôi phục gợi ý đúng lúc; chữ đã nhập được giữ nguyên.
Nút khoá gỡ listener nên bấm ảnh nhỏ không còn tác dụng. Mục khuyến mãi
được thêm đầu cột bên, giữ nguyên văn cặp thẻ `<b>…</b>`.

Với HTML gốc: có 6 ảnh nhỏ; `firstChild.nodeType` là 3 vì là text node
khoảng trắng; `childNodes.length` là 13 (6 phần tử `li` và 7 text node).
Danh sách cột bên có 3 mục sau khi thêm. Gọi `doiAnh()` khi đăng ký listener
gây TypeError vì chưa truyền event. Hai hàm mũi tên viết giống nhau vẫn là
hai object hàm khác nhau nên không dùng thay nhau để gỡ listener được.

## Kiểm tra Bài 3b

Mở `news.html`, bấm **Chạy kiểm tra Bài B** ở cuối trang, hoặc gọi `kiemTra()`
trong Console. Kết quả: **18/18 test đạt**. Bấm F5 sau khi kiểm tra để xoá tin thử.

Đã kiểm tra thêm bộ đếm **5/5 ngay khi tải trang**, chỉ một listener `click`
trên `#list`, tin mới tuân theo bộ lọc hiện tại, thông báo không tìm thấy ẩn
đúng khi đăng một tin khớp, và form tìm kiếm không gửi lại trang.

Tiêu đề, nội dung và từ khoá hiển thị bằng `textContent`, không diễn giải HTML;
cả khoảng trắng đầu/cuối trong tin đăng cũng được giữ. Listener dùng event
delegation nên nút Read more của tin vừa thêm hoạt động ngay. Tin đăng nhanh
nằm trong DOM của phiên hiện tại; tải lại trang sẽ trở về 5 tin mẫu, đúng đặc tả.
