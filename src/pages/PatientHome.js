import { useEffect, useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

import './styles/home.css';

const Home = () => {
  const { patient } = useAuthContext();
  const [user, setUser] = useState([]);

  useEffect(() => {
    const getUserInfo = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/patients/${patient.email}`
      );
      const data = await response.json();
      setUser(data);
    };
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
    </div>
  );
};

export default Home;
