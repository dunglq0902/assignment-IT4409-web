import React, { useEffect, useId, useRef } from 'react';

export default function Modal({ title, onClose, children }) {
  const dialog = useRef(null);
  const titleId = useId();
  // A ref keeps the latest callback without re-opening the dialog on every keystroke.
  const close = useRef(onClose);
  close.current = onClose;
  useEffect(() => {
    const element = dialog.current;
    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    element.showModal();
    element.querySelector('input')?.focus();
    return () => {
      element.close();
      document.body.style.overflow = previousOverflow;
      if (previousFocus?.isConnected) previousFocus.focus();
    };
  }, []);
  return <dialog ref={dialog} className="modal" aria-labelledby={titleId}
    onCancel={event => { event.preventDefault(); close.current(); }}>
    <div className="modal-heading"><div><p className="eyebrow">THÔNG TIN NGƯỜI DÙNG</p><h2 id={titleId}>{title}</h2></div><button type="button" className="close-modal" aria-label="Đóng hộp thoại" onClick={onClose}>×</button></div>
    {children}
  </dialog>;
}
