import React from 'react';

export default function SearchForm({ value, onChangeValue }) {
  return <form className="search-form" role="search" onSubmit={event => event.preventDefault()}>
    <label className="sr-only" htmlFor="keyword">Tìm người dùng</label>
    <svg aria-hidden="true" viewBox="0 0 24 24"><circle cx="10.5" cy="10.5" r="6.5" /><path d="m16 16 5 5" /></svg>
    <input id="keyword" type="search" value={value} onChange={event => onChangeValue(event.target.value)} placeholder="Tìm theo họ tên hoặc username…" autoComplete="off" />
    {value && <button type="button" className="clear-search" onClick={() => onChangeValue('')} aria-label="Xóa từ khóa">×</button>}
  </form>;
}
