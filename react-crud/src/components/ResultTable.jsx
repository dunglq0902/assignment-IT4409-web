import React, { useEffect, useRef, useState } from 'react';
import Modal from './Modal.jsx';
import UserForm from './UserForm.jsx';
import { changeUser, cleanUser, normalizeSearch } from '../user.js';

const API_URL = 'https://jsonplaceholder.typicode.com/users';

export default function ResultTable({ keyword, user, onAdded }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [attempt, setAttempt] = useState(0);
  const [editing, setEditing] = useState(null);
  const [notice, setNotice] = useState('');
  const handledUser = useRef(null);

  useEffect(() => {
    const controller = new AbortController();
    let active = true;
    const timeout = setTimeout(() => controller.abort(), 15000);
    setLoading(true);
    setError('');
    async function loadUsers() {
      try {
        const response = await fetch(API_URL, { signal: controller.signal });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();
        if (!Array.isArray(data) || data.some(item => !item || typeof item.id !== 'number' || typeof item.name !== 'string' || typeof item.username !== 'string')) throw new Error('Dữ liệu không hợp lệ');
        if (new Set(data.map(item => item.id)).size !== data.length) throw new Error('ID bị trùng');
        if (active) {
          const normalized = data.map(item => ({ ...item, email: item.email || '', phone: item.phone || '', website: item.website || '', address: { street: '', suite: '', city: '', ...item.address } }));
          // Keep users created while the initial API request was in flight.
          setUsers(previous => [...normalized, ...previous.filter(item => typeof item.id === 'string')]);
        }
      } catch (failure) {
        if (active) setError(failure.name === 'AbortError' ? 'Kết nối quá thời gian chờ. Vui lòng thử lại.' : 'Không tải được danh sách. Kiểm tra kết nối rồi thử lại.');
      } finally {
        clearTimeout(timeout);
        if (active) setLoading(false);
      }
    }
    loadUsers();
    return () => { active = false; clearTimeout(timeout); controller.abort(); };
  }, [attempt]);

  useEffect(() => {
    if (!user || handledUser.current === user.id) return;
    handledUser.current = user.id;
    setUsers(previous => previous.some(item => item.id === user.id) ? previous : [...previous, user]);
    setNotice(`Đã thêm ${user.name}.`);
    onAdded();
  }, [user, onAdded]);

  function editUser(selected) {
    setEditing({ ...selected, address: { ...selected.address } });
  }
  function saveUser() {
    const saved = cleanUser(editing);
    setUsers(previous => previous.map(item => item.id === saved.id ? saved : item));
    setNotice(`Đã cập nhật ${saved.name}.`);
    setEditing(null);
  }
  function removeUser(selected) {
    setUsers(previous => previous.filter(item => item.id !== selected.id));
    setNotice(`Đã xóa ${selected.name}.`);
  }
  const query = normalizeSearch(keyword);
  const filteredUsers = users.filter(item => normalizeSearch(item.name).includes(query) || normalizeSearch(item.username).includes(query));

  return <>
    <div className="list-heading"><div><h2>Danh sách người dùng</h2><span className="count-badge">{users.length}</span></div><p aria-live="polite">{loading ? 'Đang tải dữ liệu…' : `Hiển thị ${filteredUsers.length} / ${users.length} người dùng`}</p></div>
    <div className="status-message" role="status" aria-live="polite">{notice}{notice && query && ' Danh sách đang áp dụng bộ lọc tìm kiếm.'}</div>
    {error && <div className="api-error" role="alert"><p>{error}</p><button type="button" className="button secondary" onClick={() => setAttempt(value => value + 1)}>Thử lại</button></div>}
    <div className="table-scroll" tabIndex="0" role="region" aria-label="Bảng người dùng, cuộn ngang để xem đủ thông tin">
      <table>
        <caption className="sr-only">Danh sách người dùng và các thao tác sửa, xóa</caption>
        <thead><tr><th scope="col">ID</th><th scope="col">Họ và tên / Username</th><th scope="col">Liên hệ</th><th scope="col">Địa chỉ</th><th scope="col">Thao tác</th></tr></thead>
        <tbody>
          {filteredUsers.map(item => <tr key={item.id} data-user-id={item.id}>
            <td className="user-id">{typeof item.id === 'number' ? String(item.id).padStart(2, '0') : item.id}</td>
            <td><div className="identity"><span className="avatar" aria-hidden="true">{item.name.split(/\s+/).map(word => word[0]).slice(0, 2).join('')}</span><div><strong>{item.name}</strong><span className="subtext">@{item.username}</span></div></div></td>
            <td><span>{item.email || 'Chưa có email'}</span><span className="subtext">{item.phone || 'Chưa có số điện thoại'}</span>{item.website && <span className="website">{item.website}</span>}</td>
            <td className="address"><span>{[item.address.street, item.address.suite].filter(Boolean).join(', ') || 'Chưa có địa chỉ'}</span><span className="subtext">{item.address.city || 'Chưa có thành phố'}</span></td>
            <td><div className="row-actions"><button type="button" className="action edit" aria-label={`Sửa ${item.name}`} onClick={() => editUser(item)}>Sửa</button><button type="button" className="action delete" aria-label={`Xóa ${item.name}`} onClick={() => removeUser(item)}>Xóa</button></div></td>
          </tr>)}
          {filteredUsers.length === 0 && <tr><td colSpan="5" className="empty-state"><span className="empty-symbol" aria-hidden="true">{loading ? '…' : '∅'}</span><strong>{loading ? 'Đang tải danh sách' : query ? 'Không tìm thấy người dùng' : error ? 'Danh sách chưa tải được' : 'Chưa có người dùng'}</strong><p>{loading ? 'Vui lòng đợi trong giây lát.' : query ? 'Thử tìm bằng họ tên hoặc username khác.' : 'Bạn có thể thêm người dùng bằng nút phía trên.'}</p></td></tr>}
        </tbody>
      </table>
    </div>
    <div className="table-footer"><span>Tìm kiếm không phân biệt chữ hoa, chữ thường và dấu tiếng Việt.</span><span>React 18</span></div>
    {editing && <Modal title="Chỉnh sửa người dùng" onClose={() => setEditing(null)}>
      <UserForm user={editing} onChange={(field, value) => setEditing(previous => changeUser(previous, field, value))} onSubmit={saveUser} onCancel={() => setEditing(null)} submitLabel="Lưu thay đổi" />
    </Modal>}
  </>;
}
