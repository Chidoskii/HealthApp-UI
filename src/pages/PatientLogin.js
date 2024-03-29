import { useState } from 'react';
import { useLogin } from '../hooks/useLogin';
import { Link } from 'react-router-dom';
import Logo from '../pages/imgs/rh_logo_shadow.png';
import '../pages/styles/signup.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, error, isLoading } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await login(email, password);
  };

  const handleDemo1Login = async (e) => {
    e.preventDefault();
    await login('rowdy@snailmail.edu', 'ABCabc123!');
  };

  const handleDemo2Login = async (e) => {
    e.preventDefault();
    await login('Dbo@snailmail.com', 'ABCabc123!');
  };

  const handleDemo3Login = async (e) => {
    e.preventDefault();
    await login('Dlock@smail.com', 'ABCabc123!');
  };

  const invalidFields = !email || !password;

  return (
    <div className="signup-container">
      <div className="signup-form-container">
        <form className="signup-form" onSubmit={handleSubmit}>
          <Link to="/">
            <img alt="RH" src={Logo} className="logo" />
          </Link>

          <h3>Log in to your Runner Health Account</h3>
          <h5>Patient Login</h5>

          <label>
            <input
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
            />
          </label>

          <label>
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
            />
          </label>

          <button
            className="signup-button"
            disabled={isLoading || invalidFields}
          >
            {isLoading ? 'Logging in...' : 'Log in'}
          </button>

          {error && <div className="error">{error}</div>}
        </form>
      </div>
      <div className="switch-section-container">
        <div className="switch-section">
          <p>
            Don't have an account?{' '}
            <Link to="/patient_signup" className="switch-link">
              Create an Account
            </Link>
          </p>
        </div>
      </div>
      <div className="demo-login-can">
        <button onClick={handleDemo1Login} className="demo-logins">
          demo Patient 1
        </button>
        <button onClick={handleDemo2Login} className="demo-logins">
          demo Patient 2
        </button>
        <button onClick={handleDemo3Login} className="demo-logins">
          demo Patient 3
        </button>
      </div>
    </div>
  );
};

export default Login;
