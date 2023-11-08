import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';

//pages and components
import PatientHome from './pages/PatientHome';
import PatientLogin from './pages/PatientLogin';
import Landing from './pages/Landing';
import PatientSignup from './pages/PatientSignup';
import Navi from './components/Navi';

function App() {
  const { patient } = useAuthContext();
  return (
    <div className="App">
      <BrowserRouter>
        <Navi />
        <div className="pages">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route
              path="/patient_home"
              element={
                patient ? <PatientHome /> : <Navigate to="/patient_login" />
              }
            />
            <Route
              path="/patient_login"
              element={
                !patient ? <PatientLogin /> : <Navigate to="/patient_home" />
              }
            />
            <Route
              path="/patient_signup"
              element={
                !patient ? <PatientSignup /> : <Navigate to="/patient_home" />
              }
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
