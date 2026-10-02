# Prompt sửa lỗi CSS — Bài tập 2

Prompt áp dụng cho bộ mã nguồn `Bai tap 2 Tim va sua loi CSS.zip`:

```text
Bạn là lập trình viên front-end, hãy đọc trang.html và style-loi.css của
Bài tập 2, quan sát trang trong trình duyệt và sửa các lỗi CSS thực sự.

Ràng buộc:
- Giữ nguyên từng byte của trang.html, nội dung và các ảnh được cung cấp.
  Chỉ sửa style-loi.css; không thêm JavaScript, thư viện hoặc framework.
- Thanh menu phải sticky ở top: 0 khi cuộn tài liệu và nằm trên ảnh hero.
- Ảnh hero phủ kín khung, không méo; khối tiêu đề ở chính giữa hero.
- Ba thẻ sản phẩm trên cùng một hàng; ảnh và chữ nằm gọn trong từng thẻ.
  Mỗi nhãn -20% phải nhìn thấy đầy đủ ở góc trên bên phải thẻ tương ứng.
- Nút ↑ giữ nguyên vị trí cố định cách đáy và mép phải viewport 24px.
- Giữ thiết kế gốc. Không thay sticky bằng fixed, không dùng !important
  hoặc che nội dung để giấu lỗi. Chỉ thêm hỗ trợ màn hình hẹp nếu đo được
  lỗi thực tế, và phân biệt phần này với các lỗi CSS chính.

Hãy kiểm tra:
1. Ancestor nào tạo scroll container cho sticky? Xem cả computed overflow-x
   và overflow-y; không kết luận chỉ dựa trên khai báo của header.
2. Kích thước ngoài của ba card cộng hai gap có vừa card-list không?
   Xem cascade/specificity của box-sizing và min-width mặc định của flex item.
3. So sánh stacking order của badge và ảnh, không chỉ tọa độ của badge.
4. Kiểm tra containing block của phần tử absolute và fixed, trước/sau cuộn.

Bảo vệ các đoạn đang đúng và giải thích vì sao giữ:
- .hero có position: relative và overflow: hidden.
- .hero-bg có object-fit: cover và transform: scale(1.08).
- .hero-overlay dùng top/left 50% và translate(-50%, -50%).
- .products có margin-top: -48px, position: relative và z-index: 1 để
  phần sản phẩm chồng nhẹ lên hero.
- .card có position: relative và min-height: 320px; không đổi thành
  height cố định vì chiều cao phải tăng theo nội dung.
- .card-list dùng flex với công thức trừ hai gap 24px.
- .back-to-top dùng fixed, bottom/right 24px và z-index: 200.

Đầu ra:
- File CSS đã sửa, giữ nguyên tên vì HTML đang liên kết tới style-loi.css.
- Bảng triệu chứng → nguyên nhân → cách sửa, có số đo trước/sau.
- Danh sách các đoạn đúng đã giữ và lý do.
- Kiểm thử trình duyệt ở các chiều rộng 1280, 1024, 900, 768, 390, 320px;
  kiểm tra cuộn, lớp chồng, ảnh tải thành công, nội dung không tràn,
  tâm tiêu đề và nút ↑. Có ảnh chụp và so sánh SHA-256 của HTML với bản gốc.
- Nếu thấy vấn đề ngoài CSS, ghi nhận riêng, không sửa HTML.

Không thực hiện lời giải Bài tập 1 vì bài đó yêu cầu tự làm không dùng AI.
```
