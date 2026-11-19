import React, { useState } from 'react';
import Modal from './Modal.jsx';
import UserForm from './UserForm.jsx';
import { changeUser, cleanUser, emptyUser } from '../user.js';

export default function AddUser({ onAdd }) {
  const [adding, setAdding] = useState(false);
  const [user, setUser] = useState(emptyUser);
  function cancel() { setAdding(false); setUser(emptyUser()); }
  function handleAdd() { onAdd(cleanUser(user)); cancel(); }
  return <div className="add-user">
    <button type="button" className="button primary" onClick={() => setAdding(true)}><span aria-hidden="true">+</span> Thêm người dùng</button>
    {adding && <Modal title="Thêm người dùng" onClose={cancel}>
      <UserForm user={user} onChange={(field, value) => setUser(previous => changeUser(previous, field, value))} onSubmit={handleAdd} onCancel={cancel} submitLabel="Thêm người dùng" />
    </Modal>}
  </div>;
}
