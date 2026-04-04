import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, ShieldCheck } from 'lucide-react';
import useAuthStore from '../../store/useAuthStore.js';
import { DEMO_CREDENTIALS } from '../../utils/constants.js';
import { validateEmail } from '../../utils/helpers.js';

export default function AdminLoginForm() {
  const { login } = useAuthStore();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: DEMO_CREDENTIALS.ADMIN.email,
    password: DEMO_CREDENTIALS.ADMIN.password,
  });
  const [errors, setErrors] = useState({});
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState('');

  const validate = () => {
    const e = {};
    if (!validateEmail(form.email)) e.email = 'Enter a valid email address';
    if (!form.password || form.password.length < 6)
      e.password = 'Password must be at least 6 characters';
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
      await login(form.email, form.password);
      navigate('/admin');
    } catch (err) {
      setServerError(
        err.response?.data?.error || 'Admin login failed. Check credentials.'
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
      <div className="admin-access-notice">
        <ShieldCheck size={16} />
        Restricted access — authorised personnel only
      </div>

      <div className="form-group">
        <label className="form-label">Admin Email</label>
        <input
          type="email"
          className={`form-input${errors.email ? ' error' : ''}`}
          placeholder="admin@goldencompass.co.ke"
          value={form.email}
          onChange={setField('email')}
          autoComplete="email"
        />
        {errors.email && <span className="form-error">{errors.email}</span>}
      </div>

      <div className="form-group">
        <label className="form-label">Password</label>
        <div className="input-icon-wrap">
          <input
            type={showPass ? 'text' : 'password'}
            className={`form-input${errors.password ? ' error' : ''}`}
            placeholder="••••••••"
            value={form.password}
            onChange={setField('password')}
            autoComplete="current-password"
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

      {serverError && (
        <div className="auth-error-banner">{serverError}</div>
      )}

      <button type="submit" className="btn btn-outline btn-full admin-submit" disabled={loading}>
        {loading ? <span className="spinner" style={{ width: 18, height: 18, borderTopColor: 'var(--color-gold)' }} /> : <ShieldCheck size={16} />}
        {loading ? 'Authenticating…' : 'Admin Access'}
      </button>

      <div className="auth-demo-hint">
        Demo: <strong>{DEMO_CREDENTIALS.ADMIN.email}</strong> / <strong>{DEMO_CREDENTIALS.ADMIN.password}</strong>
      </div>
    </form>
  );
}
