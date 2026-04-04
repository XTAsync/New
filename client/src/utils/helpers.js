export function formatCurrency(amount, currency = 'KES') {
  if (amount === null || amount === undefined) return `${currency} 0`;
  return new Intl.NumberFormat('en-KE', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatNumber(n) {
  if (n === null || n === undefined) return '0';
  return new Intl.NumberFormat('en-KE').format(n);
}

export function formatPercent(n, decimals = 2) {
  if (n === null || n === undefined) return '0%';
  return `${Number(n).toFixed(decimals)}%`;
}

export function formatDate(dateString, options = {}) {
  if (!dateString) return '';
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-KE', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    ...options,
  }).format(date);
}

export function formatDateTime(dateString) {
  return formatDate(dateString, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function formatRelativeTime(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now - date;
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;
  return formatDate(dateString);
}

export function getInitials(name) {
  if (!name) return '?';
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0].toUpperCase())
    .join('');
}

export function slugify(str) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

export function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

export function validatePhone(phone) {
  const re = /^\+254[17]\d{8}$/;
  return re.test(phone);
}

export function validatePassword(password) {
  return password && password.length >= 6;
}

export function truncate(str, length = 40) {
  if (!str || str.length <= length) return str;
  return `${str.substring(0, length)}...`;
}

export function clsx(...classes) {
  return classes.filter(Boolean).join(' ');
}

export function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
