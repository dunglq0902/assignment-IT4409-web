# Bài tập 2 — Tìm và sửa lỗi CSS bằng AI

Ngày thực hiện: 02/10/2026. Hạn nộp: hết ngày 04/10/2026.

## Link và tệp nộp bài

- Trang kết quả: [Khuyến mãi Tết — Bài tập 2](http://www.dunglq09.id.vn/css-bai-tap/bai-2/trang.html).
- CSS đã sửa: [style-loi.css](bai-2/style-loi.css).
- Prompt sử dụng: [PROMPT_BAI_2.md](PROMPT_BAI_2.md).
- Gói HTML, CSS và toàn bộ ảnh: [bai-2-da-sua.zip](bai-2-da-sua.zip).
- Mã nguồn: [thư mục bài tập trên GitHub](https://github.com/dunglq0902/assignment-IT4409-web/tree/main/css-bai-tap).

Bài sử dụng Codex (OpenAI) để phân tích, chỉnh CSS và kiểm tra trình duyệt.
HTML và 14 tệp ảnh giữ nguyên từng byte so với ZIP được cung cấp. Giữ tên
`style-loi.css` vì `trang.html` đã liên kết đến tên này.

## 1. Chẩn đoán và sửa các lỗi chính

| Triệu chứng | Nguyên nhân | Cách sửa |
| --- | --- | --- |
| Menu trôi khỏi màn hình dù đã có `position: sticky; top: 0` | `.page` có `overflow-x: hidden`, khiến `overflow-y: visible` mặc định được tính thành `auto`. Ancestor này trở thành scroll container; header bám theo vùng đó thay vì vùng cuộn của tài liệu. | Đổi thành `.page { overflow-x: clip; }`. Vẫn cắt tràn ngang, nhưng không tạo scroll container. Giữ `sticky`, `top: 0`, `z-index: 100` của header. |
| Thẻ thứ ba xuống hàng | `.card { box-sizing: content-box; }` thắng quy tắc `* { box-sizing: border-box; }` do selector cụ thể hơn. Flex-basis chỉ tính vùng nội dung, sau đó cộng thêm padding và border. | Đổi `box-sizing` của `.card` thành `border-box`, giữ công thức flex-basis và gap. |
| Nhãn `-20%` bị ảnh che | Badge được định vị đúng theo card, nhưng `z-index: auto` nằm dưới ảnh có `position: relative; z-index: 2`. | Thêm `.badge { z-index: 3; }` để nhãn nổi trên ảnh. Giữ vị trí `top/right: 12px`. |

Ở viewport 1280px, `.products` rộng 1000px, có padding trái/phải 24px,
nên vùng `.card-list` rộng 952px. Độ rộng dự kiến mỗi card là
`(952 - 2 × 24) / 3 ≈ 301,33px`. Khi dùng `content-box`, mỗi card bị cộng
thêm `2 × 16 + 2 × 1 = 34px`, thành khoảng 335,33px. Tổng ba card và
hai gap là 1054px, vượt vùng chứa 102px. Với `border-box`, tổng còn 952px,
nên cả ba card vừa một hàng.

Các khai báo sửa lỗi chính:

```css
.page {
    overflow-x: clip;
}

.card {
    box-sizing: border-box;
}

.badge {
    z-index: 3;
}
```

Về cơ chế CSS, xem tài liệu MDN về [overflow](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/overflow),
[box-sizing](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/box-sizing)
và [z-index](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/z-index).

## 2. Lỗi phát hiện thêm khi thu hẹp màn hình

Sau ba sửa đổi chính, ở 390px card vẫn rớt hàng: mỗi card cần khoảng 97,98px,
nhưng `min-width: auto` của flex item giữ kích thước theo nội dung, đo được
khoảng 112,39px. Thêm `min-width: 0` để card được thu hẹp theo flex-basis và
`overflow-wrap: anywhere` để chuỗi dài, kể cả giá tiền, xuống dòng trong card.
Chỉ thêm `min-width: 0` mà không cho chữ ngắt dòng có thể làm chữ tràn.

Header cũng cần cho brand và menu xuống hai hàng khi không đủ chỗ. Thêm
`flex-wrap: wrap; gap: 12px 24px` vào `.header-inner`; ở desktop, menu vẫn
nằm cùng hàng với brand. Đây là phần hỗ trợ màn hình hẹp, tách khỏi ba lỗi
chính bên trên.

```css
.header-inner {
    flex-wrap: wrap;
    gap: 12px 24px;
}

.card {
    min-width: 0;
    overflow-wrap: anywhere;
}
```

Vẫn giữ ba card trên cùng một hàng theo đề. Vì vậy trên màn hình 320–390px,
cột khá hẹp và nội dung phải xuống nhiều dòng; không đổi sang một cột.

## 3. Các đoạn đúng được giữ nguyên

| Đoạn CSS | Vì sao giữ |
| --- | --- |
| `.site-header`: `position: sticky; top: 0; z-index: 100` | Header cần bám khi cuộn và nằm trên hero, sản phẩm. Nguyên nhân lỗi nằm ở ancestor `.page`, không phải thiếu `top` hoặc thiếu `z-index`. |
| `.hero`: `position: relative; height: 360px; overflow: hidden` | Làm mốc định vị cho overlay và cắt phần ảnh phóng to ra ngoài khung. Hero không phải ancestor của header nên overflow này không cản sticky của header. |
| `.hero-bg`: `width/height: 100%; object-fit: cover; transform: scale(1.08)` | Phủ kín hero, giữ tỉ lệ ảnh, đồng thời giữ hiệu ứng phóng nhẹ có sẵn. Transform chỉ đặt trên ảnh, không phải ancestor của nút fixed. |
| `.hero-overlay`: `top/left: 50%; transform: translate(-50%, -50%)` | Đưa tâm của cả khối tiêu đề vào tâm hero; chỉ dùng `top/left: 50%` sẽ đặt góc trên trái ở tâm. |
| `.products`: `margin: -48px auto 48px; position: relative; z-index: 1` | Vùng sản phẩm chủ động chồng lên hero 48px; không phải lỗi margin cần xóa. |
| `.card-list`: `display: flex; flex-wrap: wrap; gap: 24px` | Cho phép bố cục flex; công thức mỗi card đã trừ đủ hai khoảng trống. Sửa box model thay vì che lỗi bằng `nowrap`. |
| `.card`: `position: relative; min-height: 320px` | Badge định vị theo đúng card. `min-height` cho phép card cao thêm để chứa nội dung, không cắt chữ bằng chiều cao cố định. |
| `.card img`: `width: 100%; height: 180px; object-fit: cover` | Ảnh vừa bề rộng phần nội dung, cùng chiều cao và không méo. Giữ lớp ảnh `z-index: 2`, nâng badge lên lớp 3. |
| `.back-to-top`: `position: fixed; bottom/right: 24px; z-index: 200` | Vốn đã đúng: nút neo theo viewport và nổi phía trên nội dung. |

## 4. Kết quả kiểm thử

Kiểm tra bằng Chrome 154.0.8037.58, viewport cao 600px, qua HTTP trên máy.
Sau khi triển khai GitHub Pages, chạy lại toàn bộ kiểm tra trên
`http://www.dunglq09.id.vn/css-bai-tap/bai-2/trang.html` và đạt cùng kết quả.
Đo tọa độ, computed styles, vùng chữ bằng DOM Range và lớp hiển thị bằng
`elementFromPoint`; kiểm tra thêm ảnh chụp. Thử cuộn 150px, 250px và tới
cuối tài liệu; nhấn nút `↑` đưa trang về đầu.

| Chiều rộng viewport | Chiều rộng mỗi card (px) | Ba card một hàng | Ba nhãn trên ảnh | Ảnh/chữ trong card | Header sau cuộn 250px |
| --- | ---: | --- | --- | --- | --- |
| 1280 | 301,33 | Đạt | Đạt | Đạt | top = 0 |
| 1024 | 301,33 | Đạt | Đạt | Đạt | top = 0 |
| 900 | 267,98 | Đạt | Đạt | Đạt | top = 0 |
| 768 | 223,98 | Đạt | Đạt | Đạt | top = 0 |
| 390 | 97,98 | Đạt | Đạt | Đạt | top = 0 |
| 320 | 74,66 | Đạt | Đạt | Đạt | top = 0 |

Trước sửa, ở 1280px header có `top = -250px` sau khi cuộn 250px; card thứ
ba ở hàng dưới và tâm nhãn bị ảnh che. Sau sửa, header giữ `top = 0`,
ba card cùng tọa độ trên và các nhãn xuất hiện trên ảnh.

Tất cả kích thước thử đều giữ tâm overlay trùng tâm hero, ảnh phủ kín khung,
sản phẩm chồng lên hero đúng 48px, và nút `↑` cách mép dưới/phải 24px.
Không có tràn ngang, lỗi tải ảnh/CSS hoặc lỗi JavaScript. Nhãn được kiểm tra
trong vùng nhìn thấy, tránh vùng nút nổi ở góc dưới để phân biệt lớp ảnh
với lớp nút. Nút fixed có thể đè lên nội dung đi qua góc màn hình khi cuộn,
đúng hành vi nút nổi của thiết kế gốc.

Kiểm tra sẵn có của dự án (`npm run check`) cũng đạt; các trang Assignment 01
không thay đổi. HTML và 14 ảnh có SHA-256 trùng bản gốc. SHA-256 của HTML:

```text
36ad279a998f3a17076f8b6da511375982cdbad33abd3ab31d2df01e32de502f
```

Minh chứng: [trước sửa](minh-chung/truoc-sua-1280.png),
[sau sửa](minh-chung/sau-sua-1280.png),
[sau cuộn](minh-chung/sau-cuon-1280.png),
[màn hình 390px sau cuộn](minh-chung/sau-cuon-390.png).

## 5. Ghi nhận ngoài phạm vi

- HTML gốc có link `href="#uu-dai"` nhưng không có phần tử `id="uu-dai"`.
  Đây là vấn đề anchor của HTML, không thể tạo đích liên kết bằng CSS;
  giữ nguyên theo ràng buộc không thay HTML.
- Comment của CSS gốc nhắc tới `de-bai.md`, nhưng ZIP không chứa file này.
  Bài làm dựa trên yêu cầu đã cung cấp và các tệp thực tế trong ZIP.
- Bài tập 1 được bổ sung theo yêu cầu tiếp theo của người dùng; xem
  [báo cáo Bài tập 1](BAO_CAO_BAI_1.md). Bản sửa đó có AI hỗ trợ, trong khi
  đề gốc yêu cầu tự làm không dùng AI.
- Chưa có file mẫu nộp bài kèm theo yêu cầu. Báo cáo và prompt này cung cấp
  nội dung để điền vào mẫu khi có, không phải mẫu chính thức của giảng viên.
