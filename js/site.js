"use strict";

// Search is local: user-entered text is never inserted as HTML.
const searchForm = document.querySelector(".search-form");
const searchResults = document.querySelector(".search-results");
const pages = [
  { title: "Trang chủ — Blakletterpress", url: "index.html", keywords: "trang chu home blog gioi thieu tin tuc" },
  { title: "Đăng ký nhận thông tin", url: "register.html", keywords: "dang ky register nhan thong tin ban tin email" },
  { title: "Ngày hội Công nghệ Xanh 2026", url: "media.html", keywords: "media da phuong tien video podcast audio cong nghe xanh su kien ha noi ben vung" },
  { title: "Trang chủ HTML5 semantic", url: "index_new.html", keywords: "html5 semantic seo refactor trang chu" }
];
const normalize = value => value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/đ/g, "d").toLowerCase();
searchForm?.addEventListener("submit", event => {
  event.preventDefault();
  const query = searchForm.elements.q.value.trim();
  const matches = pages.filter(page => normalize(`${page.title} ${page.keywords}`).includes(normalize(query)));
  searchResults.replaceChildren();
  const title = document.createElement("h2");
  title.textContent = `Kết quả tìm kiếm: ${query}`;
  searchResults.append(title);
  if (matches.length) {
    const list = document.createElement("ul");
    for (const page of matches) {
      const item = document.createElement("li");
      const link = document.createElement("a");
      link.href = page.url;
      link.textContent = page.title;
      item.append(link);
      list.append(item);
    }
    searchResults.append(list);
  } else {
    const message = document.createElement("p");
    message.textContent = "Không tìm thấy nội dung phù hợp. Hãy thử “đăng ký” hoặc “công nghệ xanh”.";
    searchResults.append(message);
  }
  searchResults.hidden = false;
  searchResults.focus();
});

const registration = document.querySelector("#registration-form");
if (registration) {
  document.querySelector("#register-submit").disabled = false;
  const birthday = registration.elements.birthday;
  const age = registration.elements.age;
  const fullName = registration.elements.fullName;
  const status = document.querySelector("#form-status");
  const today = new Date();
  const dateString = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
  birthday.max = dateString;

  const calculateAge = () => {
    if (!birthday.value) return null;
    const [year, month, day] = birthday.value.split("-").map(Number);
    return today.getFullYear() - year - (today.getMonth() + 1 < month || (today.getMonth() + 1 === month && today.getDate() < day) ? 1 : 0);
  };
  const validate = () => {
    fullName.setCustomValidity(fullName.value.trim() ? "" : "Vui lòng nhập họ và tên.");
    const expectedAge = calculateAge();
    age.setCustomValidity(age.value && expectedAge !== null && Number(age.value) !== expectedAge ? "Độ tuổi cần khớp với ngày sinh." : "");
  };
  birthday.addEventListener("input", () => {
    const calculatedAge = calculateAge();
    age.value = calculatedAge !== null && calculatedAge >= 0 ? calculatedAge : "";
    validate();
  });
  registration.addEventListener("input", () => { status.hidden = true; validate(); });
  registration.addEventListener("submit", event => {
    event.preventDefault();
    validate();
    if (!registration.reportValidity()) return;
    // This static assignment validates locally; do not transmit or persist personal data.
    registration.elements.password.value = "";
    status.textContent = "Thông tin hợp lệ! Bạn đã hoàn thành bản đăng ký minh họa. Dữ liệu chưa được gửi hoặc lưu; chưa có đăng ký nhận email thực tế.";
    status.hidden = false;
    status.focus();
  });
  registration.addEventListener("reset", () => {
    fullName.setCustomValidity("");
    age.setCustomValidity("");
    status.textContent = "";
    status.hidden = true;
  });
}
