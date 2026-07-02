import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Box, CircularProgress } from '@mui/material';

import AppLayout from '../layouts/AppLayout';
import ScrollToTop from '../components/ScrollToTop';

const LandingPage = lazy(() => import('../features/Landing/LandingPage'));
const Blogs = lazy(() => import('../features/Resources/Blogs'));
const BlogDetails = lazy(() => import('../features/Resources/BlogDetails'));
const Documentation = lazy(() => import('../features/Resources/Documentation'));
const FAQs = lazy(() => import('../features/Resources/FAQs'));
const PrivacyPolicy = lazy(() => import('../features/Resources/PrivacyPolicy'));
const TermsOfService = lazy(() => import('../features/Resources/TermsOfService'));
const Login = lazy(() => import('../features/Auth/Login'));
const ForgotPassword = lazy(() => import('../features/Auth/ForgotPassword'));
const ResetPassword = lazy(() => import('../features/Auth/ResetPassword'));
const SessionExpired = lazy(() => import('../features/Auth/SessionExpired'));
const Dashboard = lazy(() => import('../features/Dashboard/Dashboard'));
const ProcurementList = lazy(() => import('../features/Procurement/ProcurementList'));
const VendorList = lazy(() => import('../features/Vendors/VendorList'));
const RiskList = lazy(() => import('../features/Risk/RiskList'));
const ComplianceList = lazy(() => import('../features/Compliance/ComplianceList'));
const Reports = lazy(() => import('../features/Reports/Reports'));
const AuditList = lazy(() => import('../features/Audit/AuditList'));
const Settings = lazy(() => import('../features/Settings/Settings'));

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Suspense fallback={<Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}><CircularProgress /></Box>}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blogs/:id" element={<BlogDetails />} />
          <Route path="/documentation" element={<Documentation />} />
          <Route path="/faqs" element={<FAQs />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/session-expired" element={<SessionExpired />} />
          
          <Route element={<ProtectedRoute><AppLayout /></ProtectedRoute>}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/procurement" element={<ProtectedRoute allowedRoles={['Employee', 'Manager', 'Administrator']}><ProcurementList /></ProtectedRoute>} />
            <Route path="/vendors" element={<ProtectedRoute allowedRoles={['Manager', 'Compliance Officer', 'Administrator']}><VendorList /></ProtectedRoute>} />
            <Route path="/risk" element={<ProtectedRoute allowedRoles={['Administrator']}><RiskList /></ProtectedRoute>} />
            <Route path="/compliance" element={<ProtectedRoute allowedRoles={['Compliance Officer', 'Administrator']}><ComplianceList /></ProtectedRoute>} />
            <Route path="/audit" element={<ProtectedRoute allowedRoles={['Auditor', 'Administrator']}><AuditList /></ProtectedRoute>} />
            <Route path="/reports" element={<ProtectedRoute allowedRoles={['Manager', 'Compliance Officer', 'Auditor', 'Administrator']}><Reports /></ProtectedRoute>} />
            <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};
