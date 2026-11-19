import React, { useCallback, useRef, useState } from 'react';
import SearchForm from './components/SearchForm.jsx';
import AddUser from './components/AddUser.jsx';
import ResultTable from './components/ResultTable.jsx';

export default function App() {
  const [kw, setKeyword] = useState('');
  const [newUser, setNewUser] = useState(null);
  const nextId = useRef(0);
  const handleAdded = useCallback(() => setNewUser(null), []);

  function handleAdd(user) {
    // Allocate once per submitted user, never from array length or during render.
    nextId.current += 1;
    setNewUser({ ...user, id: `local-${nextId.current}` });
  }

  return (
    <div className="app-shell">
      <a className="skip-link" href="#main">Bỏ qua đến nội dung</a>
      <header className="topbar">
        <a className="brand" href="./" aria-label="UserSpace - trang quản lý người dùng">
          <span className="brand-icon" aria-hidden="true">u<span>+</span></span>
          <span>UserSpace</span>
        </a>
        <span className="course-tag">IT4409 <span>/</span> React CRUD</span>
        <a className="source-link" href="https://github.com/dunglq0902/assignment-IT4409-web/tree/main/react-crud" target="_blank" rel="noreferrer">Mã nguồn GitHub</a>
      </header>
      <main id="main">
        <div className="page-heading">
          <div><p className="eyebrow">KHÔNG GIAN QUẢN LÝ</p><h1>Quản lý người dùng</h1><p className="intro">Mọi thông tin, trong một danh sách.</p></div>
          <div className="heading-mark" aria-hidden="true"><span>U</span><span>S</span><span>+</span></div>
        </div>
        <section className="workspace" aria-label="Danh sách và thao tác người dùng">
          <div className="toolbar">
            <SearchForm value={kw} onChangeValue={setKeyword} />
            <AddUser onAdd={handleAdd} />
          </div>
          <ResultTable keyword={kw} user={newUser} onAdded={handleAdded} />
        </section>
        <aside className="demo-note"><span aria-hidden="true">i</span><p>Dữ liệu mẫu từ JSONPlaceholder. Thao tác thêm, sửa, xóa chỉ áp dụng trong phiên hiện tại; tải lại trang để lấy danh sách ban đầu.</p></aside>
      </main>
      <footer className="page-footer"><span>Bài thực hành React CRUD</span><span>IT4409 · Học kỳ 20261</span></footer>
    </div>
  );
}
