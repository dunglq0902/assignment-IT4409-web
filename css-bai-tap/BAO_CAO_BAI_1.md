# Bài tập 1 — Phân tích và sửa lỗi CSS

Ngày thực hiện: 02/10/2026. Hạn nộp: hết ngày 04/10/2026.

Bản sửa này có sử dụng Codex (OpenAI) theo yêu cầu của người dùng.
Đề gốc yêu cầu Bài tập 1 tự làm không dùng AI; đây không phải lời xác nhận
người học đã tự thực hiện độc lập.

## Tệp và đường dẫn

- [Trang đã sửa trên host cá nhân](http://www.dunglq09.id.vn/css-bai-tap/bai-1/trang.html).
- [CSS đã sửa](bai-1/style-loi.css).
- [Gói HTML, CSS và toàn bộ ảnh](bai-1-da-sua.zip).
- [Mã nguồn trên GitHub](https://github.com/dunglq0902/assignment-IT4409-web/tree/main/css-bai-tap/bai-1).

Giữ nguyên từng byte của `trang.html` và 14 ảnh trong bộ nguồn được cung cấp.
Chỉ sửa `style-loi.css`; giữ tên file để không phải đổi liên kết stylesheet
trong HTML. Không thêm JavaScript hoặc thư viện.

## 1. Chẩn đoán và cách sửa

| Lỗi quan sát được | Nguyên nhân | Sửa CSS |
| --- | --- | --- |
| Header cuộn mất và có thể nằm dưới khối tiêu đề | `position: sticky` thiếu ngưỡng `top`; header chưa có lớp cao hơn `.hero-overlay` có `z-index: 5` | Thêm `top: 0; z-index: 100` cho `.site-header`. |
| Khối tiêu đề không nằm giữa hero | `.hero-overlay` dùng `absolute` nhưng `.hero` chưa làm mốc định vị; các giá trị `50%` tính theo initial containing block | Thêm `position: relative` cho `.hero`, giữ phép dịch `translate(-50%, -50%)` của overlay. |
| Ảnh hero bị kéo méo theo khung | `width/height: 100%` chưa chỉ định cách giữ tỉ lệ nội dung ảnh | Thêm `object-fit: cover` và `display: block` cho `.hero-bg`; ảnh phủ khung 360px, phần dư được cắt bởi `overflow: hidden` có sẵn. |
| Ba card không vừa một hàng | Mặc định `content-box`: flex-basis chưa bao gồm padding 16px và border 1px ở mỗi bên | Thêm `box-sizing: border-box` vào quy tắc `*`. |
| Ba nhãn `-20%` chồng lên nhau ở góc trên bên phải trang | `.card` chưa có `position: relative`, nên badge không lấy chính card làm mốc | Thêm `position: relative` cho `.card`; giữ `top/right: 12px` và thêm `z-index: 1` cho badge. |
| Ảnh lớn làm card nở rộng, ảnh/chữ vượt khung | Ảnh đang dùng kích thước tự nhiên; card cố định `height: 300px` không đủ chứa toàn bộ nội dung | Thêm `.card img { width: 100%; height: auto; }`, đổi `height: 300px` thành `min-height: 300px` để card tăng chiều cao theo nội dung. |
| Nút `↑` nằm ở góc trên | Nút đã `fixed` nhưng dùng `top: 24px` | Thay `top` bằng `bottom: 24px`, giữ `right: 24px`, thêm `z-index: 200` để nút nổi trên nội dung. |

Với box model cũ, mỗi card bị cộng thêm `2 × 16 + 2 × 1 = 34px` vào
flex-basis. Ba card sẽ vượt vùng chứa ít nhất 102px nếu chỉ xét padding và
border. Ngoài ra ảnh lớn còn có thể đẩy kích thước tối thiểu của flex item
lên cao hơn. Sau sửa, ở viewport 1280px, vùng chứa card rộng 952px;
mỗi card rộng `(952 - 48) / 3 ≈ 301,33px`, cộng hai gap 24px vừa vùng chứa.

Đối với ảnh sản phẩm, `height: auto` giữ tỉ lệ ảnh gốc, không cắt ảnh hoặc
ép mọi ảnh có cùng chiều cao. Card vẫn có chiều cao bằng nhau nhờ cơ chế
stretch mặc định của flex; chữ và giá được chứa đầy đủ.

## 2. Hỗ trợ màn hình hẹp

Thêm `min-width: 0; overflow-wrap: anywhere` cho `.card`: cho phép flex item
thu nhỏ theo công thức đã đặt và ngắt chuỗi dài trong thẻ. Không dùng
`overflow: hidden` để che chữ tràn. Giữ `flex-wrap: wrap`, gap 24px và công
thức chia ba cột; các card thực tế vẫn nằm cùng một hàng ở mọi cỡ đã thử.

Thêm `flex-wrap: wrap; gap: 12px 24px` cho `.header-inner`, giúp menu xuống
hàng dưới brand khi không đủ chiều rộng. Ở desktop, chúng vẫn trên cùng hàng.

Theo yêu cầu ba thẻ một hàng, màn hình 320–390px có cột hẹp và nhiều dòng
chữ, kể cả giá tiền. Bản sửa không chuyển sang một cột.

## 3. Các phần giữ nguyên

- Giữ màu sắc, font, nội dung, liên kết và ảnh của bộ mã nguồn Bài tập 1.
- Giữ hero cao 360px và cách căn giữa overlay bằng `top/left: 50%` kết hợp
  `translate(-50%, -50%)`.
- Giữ khoảng cách 48px giữa hero và khu sản phẩm, không áp dụng margin âm
  hoặc hiệu ứng phóng ảnh của Bài tập 2 vào Bài tập 1.
- Giữ padding 16px, border 1px, bo góc và bóng của card; giữ gap 24px.
- Giữ nút `↑` là liên kết `href="#"`, kích thước 48 × 48px, dùng `fixed`.

## 4. Kiểm chứng trên trình duyệt

Kiểm thử bằng Chrome 154.0.8037.58 qua HTTP trên máy, viewport cao 600px.
Đo computed styles, bounding boxes và vùng chữ; kiểm tra lớp nhãn bằng
`elementFromPoint`, quan sát ảnh chụp. Cuộn tới 150px, 250px và cuối trang;
nhấn `↑` để xác nhận trở lại đầu trang.

| Chiều rộng viewport | Rộng mỗi card (px) | Ba card một hàng | Ảnh/chữ trong card | Header sau cuộn 250px | Nút cách đáy/phải |
| --- | ---: | --- | --- | --- | --- |
| 1280 | 301,33 | Đạt | Đạt | top = 0 | 24px / 24px |
| 1024 | 301,33 | Đạt | Đạt | top = 0 | 24px / 24px |
| 900 | 267,98 | Đạt | Đạt | top = 0 | 24px / 24px |
| 768 | 223,98 | Đạt | Đạt | top = 0 | 24px / 24px |
| 390 | 97,98 | Đạt | Đạt | top = 0 | 24px / 24px |
| 320 | 74,66 | Đạt | Đạt | top = 0 | 24px / 24px |

Số đo đối chiếu tại 1280 × 600px:

- Trước sửa: cuộn 250px làm header có `top = -250px`; ba badge cùng nằm
  ở `top = 12px`, `right = 12px` của viewport; nút cách đáy 528px.
- Tâm overlay trước sửa có tọa độ y = 300px, trong khi tâm hero là 248px;
  sau sửa hai tâm trùng nhau ở y = 248px.
- Trước sửa, hai card đầu rộng 351,33px; card thứ ba bị ảnh tự nhiên kéo
  rộng thành 700px và xuống hàng. Sau sửa, cả ba rộng 301,33px, cùng hàng,
  cao 412px tại viewport này và chứa đủ chữ.
- Sau sửa, cả ba badge bám góc trên bên phải card tương ứng và nằm trên ảnh;
  header nằm trên hero; hero phủ kín khung, không kéo méo ảnh. Nút fixed
  có thể che phần nội dung đi qua góc màn hình trong khi cuộn, như thiết kế.
- Không có tràn ngang, lỗi tải ảnh/CSS hoặc lỗi JavaScript. `npm run check`
  của dự án hiện tại cũng đạt.

HTML và 14 tệp ảnh trùng SHA-256 với nguồn gốc. SHA-256 của HTML:

```text
f084148e5d0b9ea79471a49762419bf716098706fa9a0b67388c6da815864676
```

Minh chứng: [trước sửa ở 1280px](minh-chung/bai-1-truoc-sua-1280.png),
[sau sửa ở 1280px](minh-chung/bai-1-sau-sua-1280.png),
[sau cuộn ở 1280px](minh-chung/bai-1-sau-cuon-1280.png),
[sau cuộn ở 390px](minh-chung/bai-1-sau-cuon-390.png).

## 5. Vấn đề ngoài CSS

HTML gốc có liên kết `href="#uu-dai"` nhưng không có phần tử
`id="uu-dai"`. Giữ nguyên theo yêu cầu không sửa HTML; CSS không thể tạo
đích anchor còn thiếu. Chưa có mẫu trả lời chính thức kèm đề, nên tài liệu
này là báo cáo riêng để đối chiếu và điền vào mẫu khi được cung cấp.
