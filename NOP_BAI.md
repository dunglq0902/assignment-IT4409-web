# Bài tập IT4409 — Form, multimedia và HTML5 semantic

## Link bài làm

| Nội dung | Đường dẫn |
| --- | --- |
| Website / trang chủ ban đầu dùng để refactor | http://www.dunglq09.id.vn/index.html |
| Câu 3 — Form đăng ký | http://www.dunglq09.id.vn/register.html |
| Câu 4 — Đa phương tiện | http://www.dunglq09.id.vn/media.html |
| Câu 5 — Trang chủ dùng HTML5 semantic | http://www.dunglq09.id.vn/index_new.html |
| Mã nguồn GitHub | https://github.com/dunglq0902/assignment-IT4409-web |

Host: GitHub Pages, branch `main`, thư mục gốc `/`, dùng tên miền cá nhân của Assignment 01.

## Prompt dùng cho câu 5

```text
Bạn là lập trình viên front-end. Hãy đọc index.html, css/style.css và js/site.js
trong dự án Blakletterpress hiện tại, sau đó tạo file index_new.html bằng cách
refactor HTML sang các thẻ semantic HTML5 để cải thiện cấu trúc và SEO cơ bản.

Yêu cầu:
1. Giữ nguyên index.html để làm bản đối chiếu trước refactor. index_new.html
   phải giữ nguyên toàn bộ nội dung hiển thị, ảnh, liên kết, thứ tự các phần,
   bố cục, kích thước, màu sắc và khả năng hiển thị trên điện thoại.
2. Dùng header cho đầu trang; nav cho các khối điều hướng; aside cho cột phụ;
   main duy nhất cho nội dung chính; article cho bài viết độc lập; section
   cho nhóm nội dung có tiêu đề; footer cho cuối bài và cuối trang.
   Các div chỉ dùng để dàn trang có thể giữ nguyên.
3. Đổi ngày 22/04/2026 sang time có datetime="2026-04-22" nhưng không thay
   đổi văn bản người đọc nhìn thấy. Không dùng section thay div máy móc.
4. Giữ nguyên class, id và các thuộc tính liên quan để CSS và JavaScript
   hoạt động như cũ. Dùng lại css/style.css và js/site.js, không tạo layout mới.
5. Đảm bảo lang="vi", UTF-8, viewport, title và meta description phù hợp;
   chỉ có một h1; phân cấp h2/h3 hợp lý; ảnh có alt mô tả; form có label;
   các vùng nav có tên truy cập. Vì hai trang có nội dung trùng nhau, dùng
   cùng canonical trỏ về trang chủ chính http://www.dunglq09.id.vn/.
6. Không bổ sung nội dung quảng cáo, thư viện hoặc framework. Giữ ghi công
   mẫu giao diện Free Website Templates trong source.
7. Kiểm tra đường dẫn, cấu trúc semantic và lỗi JavaScript. So sánh văn bản
   và ảnh chụp trình duyệt của index.html với index_new.html ở cùng kích thước
   để xác nhận giao diện không thay đổi. Kiểm tra thêm ở chiều rộng 390px.

Trả về file index_new.html hoàn chỉnh và giải thích ngắn gọn những thẻ
đã thay đổi cùng ý nghĩa của chúng đối với ngữ nghĩa và SEO.
```

## Kết quả refactor

| Thành phần | Trước | Sau |
| --- | --- | --- |
| Đầu trang | `div.site-header` | `header.site-header` |
| Thanh liên kết / menu | `div.page-links`, `div.main-nav` | `nav` |
| Cột trái | `div.sidebar` | `aside.sidebar` |
| Vùng nội dung chính | `div#main-content` | `main#main-content` |
| Nội dung trang chủ | `div.home-article` | `article.home-article` |
| Các nhóm nội dung có tiêu đề | `div.home-section` | `section.home-section` |
| Ngày xuất bản | `span` | `time[datetime]` |
| Cuối bài / cuối trang | `div` | `footer` |

Các thẻ giúp trình đọc màn hình và công cụ tìm kiếm nhận diện vai trò của
nội dung. Semantic HTML và metadata không bảo đảm một thứ hạng SEO cụ thể.

## Ghi chú bài thực hành

- Repository Assignment 01 chỉ có trang Hello World. Trang chủ Blakletterpress
  được dựng lại theo khung mẫu với sự đồng ý của người làm bài, sau đó mới
  được dùng làm bản đầu vào cho phép so sánh index.html / index_new.html.
- `register.html` có ba fieldset, các loại input HTML5, kiểm tra trường bắt buộc,
  email, mật khẩu tối thiểu 8 ký tự, điện thoại 10 chữ số bắt đầu bằng 0,
  ngày sinh, độ tuổi, giới tính và đồng ý điều khoản; có submit/reset.
- Form chỉ kiểm tra trên trình duyệt. Không có backend, không lưu dữ liệu
  cá nhân và không gửi bản tin thật. Không sử dụng mật khẩu thật để thử.
- `media.html` dùng article/header/section/figure/figcaption/time/footer,
  video WebM 18 giây với phụ đề VTT, audio WAV khoảng 36 giây, bản đồ Hà Nội
  và ảnh. Nội dung sự kiện, video trình chiếu và podcast đều là minh họa.
- Mã nguồn, CSS, font, ảnh, video và audio nằm trong repository. Bản đồ Google
  là dịch vụ ngoài và cần Internet.
- Bản so sánh trên Chrome tại 1240px cho kết quả hai trang chủ giống nhau
  từng pixel; cả bốn trang không tràn ngang ở 390px.

Chép các link và prompt bên trên vào biểu mẫu nộp bài của giảng viên.
