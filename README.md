# Blakletterpress — IT4409

Website tĩnh hoàn thành câu 3, 4, 5: form đăng ký, đa phương tiện và
refactor HTML5 semantic. Giao diện dựa trên mẫu trong đề bài.

**Website:** [www.dunglq09.id.vn](http://www.dunglq09.id.vn/)

**Link từng trang và prompt nộp bài:** [NOP_BAI.md](NOP_BAI.md).

## Chạy trên máy

Cần Node.js 18 trở lên, không cần cài thư viện:

```sh
npm start
```

Mở http://127.0.0.1:4173. Có thể mở trực tiếp HTML để xem giao diện,
nhưng nên dùng server để tải phụ đề video qua HTTP đúng cách.

```sh
npm run check
```

Lệnh kiểm tra asset, liên kết nội bộ và anchor, ID, nhãn form, cấu trúc
semantic, định dạng media và nội dung hai trang chủ không thay đổi.

## Tệp chính

- `index.html`: trang chủ trước refactor, dùng div làm các vùng bố cục.
- `index_new.html`: cùng nội dung/giao diện, dùng thẻ HTML5 semantic.
- `register.html`: form có ràng buộc HTML5 và kiểm tra bổ sung bằng JavaScript.
- `media.html`: bài viết với ảnh, video, audio, phụ đề và iframe bản đồ.
- `css/style.css`: một stylesheet dùng chung; bố cục hai cột trên desktop.
- `js/site.js`: kiểm tra form, tính tuổi, reset và tìm kiếm trang trong website.
- `images/`, `fonts/`, `media/`: tài nguyên phục vụ trực tiếp từ host.
- `CNAME`: tên miền cá nhân đã có từ Assignment 01.
- `.nojekyll`: phục vụ website tĩnh trên GitHub Pages.

## Triển khai

GitHub Pages đã cấu hình lấy nội dung từ `main` → `/(root)`. Khi push lên
nhánh này, GitHub tự build và cập nhật website. Giữ nguyên `CNAME` để tiếp tục
dùng tên miền cá nhân. Không cần npm install hoặc bước build khi triển khai.

Tên miền đang dùng HTTP; GitHub Pages chưa cấp chứng chỉ HTTPS tại thời điểm
chuẩn bị bài. Các link nộp bài sử dụng giao thức đang hoạt động. Khi chứng chỉ
được cấp, có thể bật Enforce HTTPS trong Settings → Pages.

## Phạm vi và nguồn tài nguyên

Đây là bài thực hành front-end, không có backend đăng ký/email. Form không
gửi hoặc lưu thông tin; thông báo kết quả nói rõ đây là bản minh họa.
Không lưu mật khẩu vào localStorage, sessionStorage, URL hoặc log.

Trang chủ được dựng lại vì repo ban đầu chỉ có Hello World. Người dùng đã
chọn dùng khung trong ảnh đề bài; bản refactor giữ nguyên trang chủ dựng lại.
Trang Hello World cũ vẫn có trong lịch sử Git (`b80651f`).

Xem [CREDITS.md](CREDITS.md) cho nguồn và ghi công giao diện/font/media.

## Bài tập sửa lỗi CSS — hạn 04/10/2026

[Bài tập 2 trên host cá nhân](http://www.dunglq09.id.vn/css-bai-tap/bai-2/trang.html)
giữ nguyên HTML và ảnh trong đề, chỉ chỉnh CSS. Xem
[báo cáo và nội dung nộp bài](css-bai-tap/BAO_CAO_BAI_2.md) cùng
[prompt sửa lỗi bằng AI](css-bai-tap/PROMPT_BAI_2.md).
Bài tập 1 dành cho người học tự thực hiện theo yêu cầu không dùng AI.
