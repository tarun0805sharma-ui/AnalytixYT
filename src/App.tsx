import { Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import DashboardPage from './pages/Dashboard';
import AuthPage from './pages/AuthPage';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import CookiePolicy from './pages/CookiePolicy';
import ApiGuide from './pages/ApiGuide';
import Blog from './pages/Blog';
import Community from './pages/Community';
import Changelog from './pages/Changelog';
import { useAuth } from './lib/AuthContext';

export default function App() {
  const { user } = useAuth();
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/auth" element={!user ? <AuthPage /> : <Navigate to="/dashboard" />} />
      <Route path="/signup" element={!user ? <AuthPage isSignUp={true} /> : <Navigate to="/dashboard" />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      
      {/* Legal & Footer Routes */}
      <Route path="/privacy" element={<PrivacyPolicy />} />
      <Route path="/terms" element={<TermsOfService />} />
      <Route path="/cookies" element={<CookiePolicy />} />
      
      {/* Resources & Product Routes */}
      <Route path="/api-guide" element={<ApiGuide />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/community" element={<Community />} />
      <Route path="/changelog" element={<Changelog />} />
    </Routes>
  );
}
