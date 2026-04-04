import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, UserPlus } from 'lucide-react';
import useAuthStore from '../../store/useAuthStore.js';
import { validateEmail, validatePhone, validatePassword } from '../../utils/helpers.js';

export default function RegisterForm() {
  const { register } = useAuthStore();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '+254',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState('');

  const validate = () => {
    const e = {};
    if (!form.fullName || form.fullName.trim().length < 2)
      e.fullName = 'Full name is required';
    if (!validateEmail(form.email)) e.email = 'Enter a valid email address';
    if (!validatePhone(form.phone))
      e.phone = 'Enter a valid Kenyan phone (+254XXXXXXXXX)';
    if (!validatePassword(form.password))
      e.password = 'Password must be at least 6 characters';
    if (form.password !== form.confirmPassword)
      e.confirmPassword = 'Passwords do not match';
    return e;
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setErrors({});
    setServerError('');
    setLoading(true);
    try {
      await register(form.fullName, form.email, form.phone, form.password);
      navigate('/dashboard');
    } catch (err) {
      setServerError(
        err.response?.data?.error || 'Registration failed. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  const setField = (field) => (e) => {
    setForm((f) => ({ ...f, [field]: e.target.value }));
    setErrors((er) => ({ ...er, [field]: '' }));
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form" noValidate>
      <div className="form-group">
        <label className="form-label">Full Name</label>
        <input
          type="text"
          className={`form-input${errors.fullName ? ' error' : ''}`}
          placeholder="Jane Wanjiku"
          value={form.fullName}
          onChange={setField('fullName')}
          autoComplete="name"
        />
        {errors.fullName && <span className="form-error">{errors.fullName}</span>}
      </div>

      <div className="form-group">
        <label className="form-label">Email address</label>
        <input
          type="email"
          className={`form-input${errors.email ? ' error' : ''}`}
          placeholder="jane@example.com"
          value={form.email}
          onChange={setField('email')}
          autoComplete="email"
        />
        {errors.email && <span className="form-error">{errors.email}</span>}
      </div>

      <div className="form-group">
        <label className="form-label">Phone Number</label>
        <input
          type="tel"
          className={`form-input${errors.phone ? ' error' : ''}`}
          placeholder="+254712345678"
          value={form.phone}
          onChange={setField('phone')}
          autoComplete="tel"
        />
        {errors.phone && <span className="form-error">{errors.phone}</span>}
        <span className="form-hint">Format: +254XXXXXXXXX (Safaricom or Airtel)</span>
      </div>

      <div className="form-group">
        <label className="form-label">Password</label>
        <div className="input-icon-wrap">
          <input
            type={showPass ? 'text' : 'password'}
            className={`form-input${errors.password ? ' error' : ''}`}
            placeholder="At least 6 characters"
            value={form.password}
            onChange={setField('password')}
            autoComplete="new-password"
          />
          <button
            type="button"
            className="input-icon-btn"
            onClick={() => setShowPass((s) => !s)}
            tabIndex={-1}
          >
            {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
        {errors.password && <span className="form-error">{errors.password}</span>}
      </div>

      <div className="form-group">
        <label className="form-label">Confirm Password</label>
        <input
          type={showPass ? 'text' : 'password'}
          className={`form-input${errors.confirmPassword ? ' error' : ''}`}
          placeholder="Repeat password"
          value={form.confirmPassword}
          onChange={setField('confirmPassword')}
          autoComplete="new-password"
        />
        {errors.confirmPassword && (
          <span className="form-error">{errors.confirmPassword}</span>
        )}
      </div>

      {serverError && (
        <div className="auth-error-banner">{serverError}</div>
      )}

      <button type="submit" className="btn btn-primary btn-full" disabled={loading}>
        {loading ? <span className="spinner" style={{ width: 18, height: 18 }} /> : <UserPlus size={16} />}
        {loading ? 'Creating account…' : 'Create Account'}
      </button>
    </form>
  );
}
