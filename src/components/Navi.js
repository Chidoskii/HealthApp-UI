import { Link } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';

const Navi = () => {
  const { logout } = useLogout();
  const { patient } = useAuthContext();

  const handleClick = () => {
    logout();
  };

  return (
    <header>
      <div className="container">
        <Link to="/">
          <h1 className="banner"> Runner Health</h1>
        </Link>
      </div>
      <nav>
        {patient && (
          <div>
            <span style={{ padding: 10 }}>{patient.email}</span>
            <button onClick={handleClick}>LOGOUT</button>
          </div>
        )}
        {!patient && (
          <div>
            <Link to="/login">LOGIN</Link>
            <Link to="/signup">JOIN</Link>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navi;
