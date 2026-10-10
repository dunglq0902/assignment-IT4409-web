# Bài tập 4 — Xây dựng CSS responsive

## Mở bài làm

Mở `trang-goc.html` trong trình duyệt. Trang hoạt động trực tiếp từ thư mục,
không cần cài thư viện, kết nối mạng hay chạy bước build.

Nếu chạy từ repository bằng `npm start`, truy cập:
http://127.0.0.1:4173/css-bai-tap/bai-4/trang-goc.html

## Phạm vi thực hiện

- Giữ nguyên từng byte của `trang-goc.html` và 14 ảnh từ ZIP đề bài.
- Thêm `style.css`, sử dụng liên kết stylesheet đã có trong HTML.
- Chỉ dùng CSS thuần; không thêm JavaScript hoặc CSS framework.
- Giao diện lấy cảm hứng từ giấy in và mực: nền kem, điểm nhấn đỏ trầm,
  tiêu đề serif, các khối nội dung ngăn cách bằng đường kẻ mảnh.
- Font hệ thống hỗ trợ tiếng Việt; ảnh sử dụng từ bộ mã nguồn gốc.

## Bố cục responsive

| Chiều rộng màn hình | Bố cục |
| --- | --- |
| Trên 1000px | Nội dung và sidebar hai cột; giá trị/đội ngũ ba cột; footer bốn cột. |
| 601–1000px | Sidebar chuyển xuống dưới; menu xuống hàng; footer hai cột. |
| Đến 600px | Nội dung, danh sách, biểu mẫu và footer một cột; nút gửi rộng toàn hàng. |

CSS Grid dùng `minmax(0, 1fr)` để các cột co giãn. Khoảng cách và cỡ chữ dùng
`clamp()`. Ảnh giữ tỉ lệ, nội dung dài được ngắt dòng, trường nhập liệu rộng
theo cột. Không che phần tràn ngang để giấu lỗi bố cục.

Liên kết và trường nhập có trạng thái focus rõ ràng; nút và ô nhập cao tối
thiểu 44px. CSS hỗ trợ `prefers-reduced-motion` và bản in.

## Kiểm tra

Đã kiểm tra bằng Chrome/Playwright ở các chiều rộng: **320, 375, 390, 600,
601, 768, 1000, 1001, 1280, 1440 và 1920px**.

- Không tràn ngang ở trang, phần tử hoặc chữ.
- CSS và tất cả ảnh hiển thị tải thành công.
- Menu cuộn đến đúng bốn mục nội dung.
- Biểu mẫu nhập được; HTML5 kiểm tra email không hợp lệ.
- Focus bàn phím hiển thị rõ và chế độ giảm chuyển động hoạt động.
- Đối chiếu SHA-256 xác nhận 15 tệp gốc không thay đổi.
- Đã xem ảnh chụp toàn trang trên desktop, tablet và điện thoại.

Các liên kết bài viết `href="#"` và form `action="#" method="post"` được
giữ nguyên theo đề. Đây là bài giao diện; chưa có máy chủ nhận liên hệ.

Bài làm có sử dụng AI hỗ trợ viết CSS và kiểm tra hiển thị.
