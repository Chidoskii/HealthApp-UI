import { Link } from 'react-router-dom';
import { UseLogout } from '../../hooks/useLogout';
import { useAuthContext } from '../../hooks/useAuthContext';
import Logo from '../imgs/rh_logo_shadow.png';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';

const Navi = () => {
  const { logout } = UseLogout();
  const { patient } = useAuthContext();

  const handleClick = () => {
    logout();
  };

  return (
    <Navbar className="bg-body-tertiary" fixed="top">
      <Container fluid className="topnav-contents">
        <Navbar.Brand className="rh-topnav-logo" href="/">
          <img
            alt="RH"
            src={Logo}
            className="d-inline-block align-top rh-logo"
          />
        </Navbar.Brand>

        <nav>
          {patient && (
            <div className="page-links top-navi">
              <Nav.Link href="/patient_home" className="link-btn">
                Home
              </Nav.Link>
              <Nav.Link href="#features" className="link-btn">
                Records
              </Nav.Link>
              <Nav.Link href="#features" className="link-btn">
                Schedule
              </Nav.Link>
              <Nav.Link href="#pricing" className="link-btn">
                Invoice
              </Nav.Link>
              <div>
                <span style={{ padding: 10 }} className="pname">
                  {patient.email}
                </span>
                <Button
                  onClick={handleClick}
                  className="btn logout-btn"
                  variant="secondary"
                >
                  LOGOUT
                </Button>
              </div>
            </div>
          )}
          {!patient && (
            <div className="top-navi">
              <Link to="/patient_login">
                <Button className="creds-btn">LOGIN</Button>
              </Link>
              <Link to="/patient_signup">
                <Button className="creds-btn">JOIN</Button>
              </Link>
            </div>
          )}
        </nav>
      </Container>
    </Navbar>
  );
};

export default Navi;
