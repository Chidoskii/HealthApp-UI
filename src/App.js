import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import React, { lazy, Suspense } from 'react';
import { useAuthContext } from './hooks/useAuthContext';
import { useMemo } from 'react';
import { IconContext } from 'react-icons/lib';
import ToTop from './helpers/ScrollToTop.jsx';

//pages and components
import Landing from './pages/Landing';
import Navi from './components/navbar/Navi';
import MNavi from './components/mobile-footy/MobileNav.jsx';
import Footer from './components/footer/Footer.jsx';
//lazy loading
const PatientHome = lazy(() => import('./pages/PatientHome'));
const PatientLogin = lazy(() => import('./pages/PatientLogin'));
const PatientSignup = lazy(() => import('./pages/PatientSignup'));
const AdminSignup = lazy(() => import('./pages/AdminSignup'));
const AdminHome = lazy(() => import('./pages/AdminHome'));
const AdminLogin = lazy(() => import('./pages/AdminLogin'));
const DoctorSignup = lazy(() => import('./pages/DoctorSignup'));
const DoctorHome = lazy(() => import('./pages/DoctorHome'));
const DoctorLogin = lazy(() => import('./pages/DoctorLogin'));
const SignupSelector = lazy(() => import('./pages/SignupSelector'));
const LoginSelector = lazy(() => import('./pages/LoginSelector'));
const Records = lazy(() => import('./pages/Records'));
const Invoice = lazy(() => import('./pages/Invoice'));
const Inventory = lazy(() => import('./pages/Inventory'));
const Schedule = lazy(() => import('./pages/Schedule'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

function App() {
  const { patient, admin, doctor } = useAuthContext();
  const foo = useMemo(() => ({ size: '2em' }), []);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <IconContext.Provider value={foo}>
        <div className="App">
          <BrowserRouter>
            <ToTop />
            <Navi />
            <div className="pages">
              <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/signup_selection" element={<SignupSelector />} />
                <Route path="/login_selection" element={<LoginSelector />} />
                <Route
                  path="/records"
                  element={
                    patient || doctor ? <Records /> : <Navigate to="/" />
                  }
                />
                <Route
                  path="/invoice"
                  element={
                    patient || doctor || admin ? (
                      <Invoice />
                    ) : (
                      <Navigate to="/" />
                    )
                  }
                />
                <Route
                  path="/inventory"
                  element={admin ? <Inventory /> : <Navigate to="/" />}
                />
                <Route
                  path="/schedule"
                  element={
                    patient || doctor || admin ? (
                      <Schedule />
                    ) : (
                      <Navigate to="/" />
                    )
                  }
                />
                <Route
                  path="/patient_home"
                  element={patient ? <PatientHome /> : <Navigate to="/" />}
                />
                <Route
                  path="/patient_login"
                  element={
                    !patient ? (
                      <PatientLogin />
                    ) : (
                      <Navigate to="/patient_home" />
                    )
                  }
                />
                <Route
                  path="/patient_signup"
                  element={
                    !patient ? (
                      <PatientSignup />
                    ) : (
                      <Navigate to="/patient_home" />
                    )
                  }
                />
                <Route
                  path="/admin_home"
                  element={admin ? <AdminHome /> : <Navigate to="/" />}
                />
                <Route
                  path="/admin_login"
                  element={
                    !admin ? <AdminLogin /> : <Navigate to="/admin_home" />
                  }
                />
                <Route
                  path="/admin_signup"
                  element={
                    !admin ? <AdminSignup /> : <Navigate to="/admin_home" />
                  }
                />
                <Route
                  path="/doctor_home"
                  element={doctor ? <DoctorHome /> : <Navigate to="/" />}
                />
                <Route
                  path="/doctor_login"
                  element={
                    !doctor ? <DoctorLogin /> : <Navigate to="/doctor_home" />
                  }
                />
                <Route
                  path="/doctor_signup"
                  element={
                    !doctor ? <DoctorSignup /> : <Navigate to="/doctor_home" />
                  }
                />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
              <Footer />
              <MNavi />
            </div>
          </BrowserRouter>
        </div>
      </IconContext.Provider>
    </Suspense>
  );
}

export default App;
