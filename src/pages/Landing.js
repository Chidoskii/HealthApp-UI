import React from 'react';
import first from './imgs/doctors-patient.jpg';
import second from './imgs/data_storage.jpg';
import third from './imgs/wait-room.jpg';
import Carousel from 'react-bootstrap/Carousel';

function Landing() {
  return (
    <div className="page-contents landing-page">
      <Carousel className="landing-showcase">
        <Carousel.Item>
          <img src={first} className="showcase-img" alt="..." />
          <Carousel.Caption>
            <h3>Better Healthcare</h3>
            <p>Runner Health helps to improve the quality of healthcare.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img src={second} className="showcase-img" alt="..." />
          <Carousel.Caption>
            <h3>Electronic Health Records</h3>
            <p>
              Store medical records more efficiently by utilizing the cloud.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img src={third} className="showcase-img" alt="..." />
          <Carousel.Caption>
            <h3>Faster Response Times</h3>
            <p>
              Improve response times with EHRs and automating administrative
              tasks.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
}

export default Landing;
