// Isolated reproduction of the PDF's prev.length + 1 ID strategy.
// This fixture is never included in the application bundle.
import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';

function BrokenList() {
  const [users, setUsers] = useState(Array.from({ length: 10 }, (_, index) => ({ id: index + 1, name: `User ${index + 1}` })));
  return <><h1>Đối chiếu lỗi trùng ID trong mã mẫu</h1>
    <button onClick={() => setUsers(previous => previous.filter(user => user.id !== 5))}>Xóa ID 5</button>
    <button onClick={() => setUsers(previous => [...previous, { id: previous.length + 1, name: 'Người dùng mới' }])}>Thêm theo length</button>
    <ul>{users.map(user => <li key={user.id}>ID {user.id}: {user.name}</li>)}</ul>
  </>;
}
createRoot(document.getElementById('root')).render(<BrokenList />);
