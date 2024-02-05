import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSignup } from '../hooks/useSignup.js';
import Logo from '../pages/imgs/rh_logo_shadow.png';
import './styles/signup.css';

const Signup = () => {
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signup, error, isLoading } = useSignup();

  const invalidFields = !fname || !lname || !email || !password

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(fname, lname, email, password);
  };

  return (
    <div className="signup-container">
      <div className="signup-form-container">
        <form className="signup-form" onSubmit={handleSubmit}>
          <Link to="/">
            <img
              alt="RH"
              src={Logo}
              className="logo"
            />
          </Link>

          <h3>Create an account for free to access Runner Health's premiere EHR and Medical hub!</h3>

          <label>
            <input
              type="text"
              placeholder="First Name"
              onChange={(e) => setFname(e.target.value)}
              value={fname}
              required
            />
          </label>

          <label>
            <input
              type="text"
              placeholder="Last Name"
              onChange={(e) => setLname(e.target.value)}
              value={lname}
              required
            />
          </label>

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

          <button className="signup-button" disabled={isLoading || invalidFields}>
            {isLoading ? 'Signing Up...' : 'Sign Up'}
          </button>

          {error && <div className="error">{error}</div>}
        </form>
      </div>
      <div className="login-section-container">
        <div className="login-section">
          <p>Already have an account? <Link to="/patient_login" className="login-link">Log in</Link></p>
        </div>
      </div>
      <div className="footer">
        <p><Link to="/about">About</Link> <Link to="/services">Services</Link> <Link to="/contact">Contact</Link></p>
      </div>
    </div>
  );
};

export default Signup;
