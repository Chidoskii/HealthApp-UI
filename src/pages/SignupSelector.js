import { Link } from 'react-router-dom';
import './styles/selector.css';

const SignupSelector = () => {
  return (
    <div className="login-selector-page page-contents container-fluid">
      <h1>Select a User Group</h1>
      <div className="container selector-can">
        <Link to="/doctor_signup" className="selector-btn">
          <button>Doctors</button>
        </Link>
        <br></br>
        <Link to="/admin_signup" className="selector-btn">
          <button>Workers</button>
        </Link>
        <br></br>
        <Link to="/patient_signup" className="selector-btn">
          <button>Patients</button>
        </Link>
      </div>
    </div>
  );
};

export default SignupSelector;
