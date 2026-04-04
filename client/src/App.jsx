import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import useAuthStore from './store/useAuthStore.js';
import LoginPage from './pages/LoginPage.jsx';
import DashboardPage from './pages/DashboardPage.jsx';
import PoolsPage from './pages/PoolsPage.jsx';
import PoolDetailPage from './pages/PoolDetailPage.jsx';
import NavigatorPage from './pages/NavigatorPage.jsx';
import TransactionsPage from './pages/TransactionsPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import KYCPage from './pages/KYCPage.jsx';
import AdminPage from './pages/AdminPage.jsx';
import DashboardLayout from './components/layout/DashboardLayout.jsx';
import ProtectedRoute from './components/common/ProtectedRoute.jsx';
import LoadingSpinner from './components/common/LoadingSpinner.jsx';

function App() {
  const { loadMe, isLoading } = useAuthStore();

  useEffect(() => {
    loadMe();
  }, []);

  if (isLoading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--color-bg-primary)',
      }}>
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/pools" element={<PoolsPage />} />
          <Route path="/pools/:slug" element={<PoolDetailPage />} />
          <Route path="/navigator" element={<NavigatorPage />} />
          <Route path="/transactions" element={<TransactionsPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/kyc" element={<KYCPage />} />
          <Route path="/admin" element={
            <ProtectedRoute roles={['admin', 'compliance', 'auditor']}>
              <AdminPage />
            </ProtectedRoute>
          } />
        </Route>

        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
