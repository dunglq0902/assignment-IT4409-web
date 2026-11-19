import React, { useId, useState } from 'react';
import { userErrors } from '../user.js';

export default function UserForm({ user, onChange, onSubmit, onCancel, submitLabel }) {
  const prefix = useId();
  const [errors, setErrors] = useState({});
  const fields = [
    ['name', 'Họ và tên', 'Nguyễn Văn An', 'text', true],
    ['username', 'Tên đăng nhập', 'nguyenvanan', 'text', true],
    ['email', 'Email', 'an@example.com', 'email'],
    ['phone', 'Số điện thoại', '090 123 4567', 'tel'],
    ['street', 'Đường / phố', 'Số 1 Đại Cồ Việt', 'text'],
    ['suite', 'Căn hộ / phòng', 'Phòng 302', 'text'],
    ['city', 'Thành phố', 'Hà Nội', 'text'],
    ['website', 'Website', 'example.com', 'text'],
  ];
  function submit(event) {
    event.preventDefault();
    const nextErrors = userErrors(user);
    setErrors(nextErrors);
    const firstError = Object.keys(nextErrors)[0];
    if (firstError) {
      event.currentTarget.elements.namedItem(firstError)?.focus();
      return;
    }
    onSubmit();
  }
  return <form className="user-form" onSubmit={submit} noValidate>
    <p className="form-hint">Các trường có dấu <span>*</span> là bắt buộc.</p>
    <div className="field-grid">
      {fields.map(([name, label, placeholder, type, required]) => <div className="field" key={name}>
        <label htmlFor={`${prefix}-${name}`}>{label}{required && <span aria-hidden="true"> *</span>}</label>
        <input id={`${prefix}-${name}`} name={name} type={type} placeholder={placeholder} required={!!required}
          value={['street', 'suite', 'city'].includes(name) ? user.address[name] : user[name]}
          maxLength={name === 'name' ? 100 : 160} autoComplete="off"
          aria-invalid={!!errors[name]} aria-describedby={errors[name] ? `${prefix}-${name}-error` : undefined}
          onChange={event => { onChange(name, event.target.value); if (errors[name]) setErrors(previous => ({ ...previous, [name]: undefined })); }} />
        {errors[name] && <p className="field-error" id={`${prefix}-${name}-error`} role="alert">{errors[name]}</p>}
      </div>)}
    </div>
    <div className="form-actions"><button type="button" className="button secondary" onClick={onCancel}>Hủy</button><button type="submit" className="button primary">{submitLabel}</button></div>
  </form>;
}
