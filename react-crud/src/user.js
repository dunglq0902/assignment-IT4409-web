export function emptyUser() {
  return { name: '', username: '', email: '', address: { street: '', suite: '', city: '' }, phone: '', website: '' };
}

export function changeUser(user, field, value) {
  return ['street', 'suite', 'city'].includes(field)
    ? { ...user, address: { ...user.address, [field]: value } }
    : { ...user, [field]: value };
}

export function cleanUser(user) {
  return {
    ...user,
    name: user.name.trim(), username: user.username.trim(), email: user.email.trim(),
    phone: user.phone.trim(), website: user.website.trim(),
    address: Object.fromEntries(Object.entries(user.address).map(([key, value]) => [key, typeof value === 'string' ? value.trim() : value])),
  };
}

export function userErrors(user) {
  const errors = {};
  if (!user.name.trim()) errors.name = 'Vui lòng nhập họ và tên.';
  if (!user.username.trim()) errors.username = 'Vui lòng nhập tên đăng nhập.';
  if (user.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.email.trim())) errors.email = 'Email chưa đúng định dạng.';
  return errors;
}

export function normalizeSearch(value) {
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[đĐ]/g, 'd').toLowerCase().trim();
}
