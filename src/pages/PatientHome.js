import { useEffect, useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

import './styles/home.css';

const Home = () => {
  const { patient } = useAuthContext();
  const [user, setUser] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    const getUserInfo = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/patients/${patient.email}`
      );
      const data = await response.json();
      setUser(data);
      localStorage.setItem('userID', data[0]._id);
      localStorage.setItem('orgID', data[0].org);
    };

    const getNotys = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/get_notys/${patient.email}`
      );
      const data = await response.json();
      setNotifications(data);
    };

    const getInvoice = async () => {
      const info = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/patients/${patient.email}`
      );
      const user = await info.json();

      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/patient_invoices/${user[0]._id}`
      );
      const data = await response.json();
      setInvoices(data);
      console.log(invoices);
    };

    getNotys();
    getInvoice();

    document.title = 'Home | RunnerHealth';
    getUserInfo();
  }, [patient.email]);

  const features = [
    {
      featured: 'Medical Records',
      title: 'Manage your personal records',
      description: 'Your description goes here',
      link: '/records',
      cta: 'View Records',
    },
    {
      featured: 'Appointments',
      title: 'Schedule an appoinment ',
      description: 'Your description goes here',
      link: '/schedule',
      cta: 'See More',
    },
    {
      featured: 'Payments',
      title: 'Make a payment',
      description: 'Your description goes here',
      link: '/invoice',
      cta: 'View More',
    },
  ];

  return (
    <div className="home page-contents container-fluid">
      <h2 className="welcome container-fluid text-2xl">
        Welcome, &nbsp;
        {user ? (
          user.map((user, index) => (
            <div key={index} className="uname">
              <span>{user.fname}</span>&nbsp;
              <span>{user.lname}</span>!
            </div>
          ))
        ) : (
          <h1>Gathering Data...</h1>
        )}
      </h2>
      <div className="opts-card container">
        {features ? (
          features.map((features, index) => (
            <Card key={features.featured} className="profile-opt-cards">
              <Card.Header>{features.featured}</Card.Header>
              <Card.Body>
                <Card.Title>{features.title}</Card.Title>
                <Card.Text>{features.description}</Card.Text>
                <Link to={features.link} className="cta-can">
                  <Button variant="primary" className="cta-btn">
                    {features.cta}
                  </Button>
                </Link>
              </Card.Body>
            </Card>
          ))
        ) : (
          <h1>Well this is weird...</h1>
        )}
      </div>
      <div className="noty-card container">
        {notifications ? (
          notifications.map((notys, index) => (
            <Card key={notys.sender} className="notification-cards">
              <Card.Header>
                This is a Notification, message sent from a user with an ID of{' '}
                {notys.sender}
              </Card.Header>
              <Card.Body>
                <Card.Title>{notys.title}</Card.Title>
                <Card.Text>{notys.message}</Card.Text>
                <Link to={notys.title} className="cta-can">
                  <Button variant="primary" className="noty-link-btn">
                    {notys.receiverGroup}
                  </Button>
                </Link>
              </Card.Body>
            </Card>
          ))
        ) : (
          <h1>Well this is weird...</h1>
        )}
      </div>
      <div className="noty-card container">
        {invoices ? (
          invoices.map((invoice, index) => (
            <Card key={invoice._id} className="notification-cards">
              <Card.Header>
                This is an invoice sent from a user with an ID of{' '}
                {invoice.sender}
              </Card.Header>
              <Card.Body>
                <Card.Title>{invoice.subject}</Card.Title>
                <Card.Text>{invoice.message}</Card.Text>
                <a
                  href={invoice.link}
                  className="cta-can"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Button variant="primary" className="noty-link-btn">
                    Click to pay
                  </Button>
                </a>
              </Card.Body>
            </Card>
          ))
        ) : (
          <h1>Well this is weird...</h1>
        )}
      </div>
    </div>
  );
};

export default Home;
