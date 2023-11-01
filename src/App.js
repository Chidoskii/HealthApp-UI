import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';

//pages and components
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Navi from './components/Navi';

function App() {
  const { patient } = useAuthContext();
  return (
    <div className="App">
      <BrowserRouter>
        <Navi />
        <div className="pages">
          <Routes>
            <Route
              path="/"
              element={patient ? <Home /> : <Navigate to="/login" />}
            />
            <Route
              path="/login"
              element={!patient ? <Login /> : <Navigate to="/" />}
            />
            <Route
              path="/signup"
              element={!patient ? <Signup /> : <Navigate to="/" />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
