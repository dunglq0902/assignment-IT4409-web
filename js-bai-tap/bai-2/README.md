# Bài tập 2 — JavaScript: tin tức và giỏ hàng

## Xem bài làm

- [Bài 2a — News](http://www.dunglq09.id.vn/js-bai-tap/bai-2/news.html).
- [Bài 2b — Giỏ hàng](http://www.dunglq09.id.vn/js-bai-tap/bai-2/index.html).
- [Bản ZIP bài làm](../bai-2-js-hoan-thien.zip).

Chạy `npm start` ở thư mục gốc repository rồi mở
`http://127.0.0.1:4173/js-bai-tap/bai-2/`. Cũng có thể mở trực tiếp
`index.html` và `news.html`; dùng HTTP để việc lưu giỏ trên trình duyệt ổn định.

## Nội dung hoàn thành

- `js/bai-a-tin-tuc.js`: điền đủ 30 chỗ trống, gồm cả kết quả dự đoán.
- `js/bai-b-gio-hang.js`: hoàn thành 7 phương thức của `GioHang`, hàm
  `napGioHang` và phần lưu/khôi phục giỏ mẫu bằng `localStorage`.

HTML, CSS, ảnh, font, `js/ho-tro.js`, `js/kiem-tra.js`, dữ liệu `DANH_MUC`
và đoạn chạy thử gốc giữ nguyên.

## Kết quả kiểm tra

Đã chạy trong Chrome với bộ kiểm tra gốc:

- Bài 2a: **4 bài đã đăng**, tổng **2600 lượt xem**, bài hot **#2**;
  thẻ `mau moi` có **2 bài**. Các giá trị Console khớp chú thích.
- Bài 2b: **20/20 test đạt**. Giỏ mẫu có thiệp cưới cotton (150 × 1500)
  và phong bì (200 × 500), hiển thị **Tổng: 325000 đ**.
- Kiểm tra thêm: danh mục bị đóng băng vẫn thêm được; từ chối số lượng
  sai kiểu, số vô cực, số âm/lẻ; kết quả trả về không sửa được giỏ;
  xuất đúng 5 thuộc tính và nạp lại đúng class; khôi phục được cả giỏ rỗng.

`them` chỉ nhận số nguyên dương, tạo object mới với đúng 5 thuộc tính.
`layDanhSach` và `dongDatNhat` tạo bản sao rồi mới thêm `thanhTien`.
Khi hai dòng có cùng thành tiền, phép so sánh `>` giữ dòng đứng trước.
Thống kê dùng `Map` rồi chuyển thành object, nên tên loại như `__proto__`
cũng được tính như một khoá dữ liệu thông thường.

Trong Bài 2a, bỏ giá trị khởi tạo `0` của `reduce` khiến object đầu tiên
tham gia phép cộng và tạo chuỗi bắt đầu bằng `[object Object]` (đáp án B).
`JSON.stringify` không lưu phương thức trên prototype của class.

## Lưu giỏ hàng

Giỏ mẫu `gio` được lưu dưới khoá `it4409-bai-2-gio-hang` trong `localStorage`:
ghi khi khởi tạo, khi trang bị ẩn và khi rời trang; nạp lại khi mở trang.
Các giỏ được tạo riêng trong bộ kiểm tra không ảnh hưởng giỏ đã lưu.
Nếu trình duyệt chặn lưu trữ hoặc JSON bị hỏng, trang vẫn dùng được với giỏ mẫu.

`xuatJSON()` / `napGioHang(chuoiJSON)` vẫn dùng độc lập để xuất và phục hồi
một giỏ bất kỳ. Dữ liệu được lưu ở trình duyệt hiện tại, không có backend.
Muốn trở về giỏ mẫu sau khi tự thử sửa `gio` trong Console, chạy:

```js
gio.dsDong = [];
gio.them(DANH_MUC[0], 150);
gio.them(DANH_MUC[3], 200);
luuGioHang();
location.reload();
```
