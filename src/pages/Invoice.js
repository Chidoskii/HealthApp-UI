import { useAuthContext } from '../hooks/useAuthContext';
import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import axios from 'axios';
import './styles/invoice.css';

import CheckoutForm from '../components/checkout/CheckoutForm.js';

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe(
  'pk_test_51OtKU5LK0T54pFuRELxXXJAogNYaCh7oMfruEYTZk7As3jQ4cnJ2XvsWrVfKrX15kiMfpcOuaRARo4bwKbsf2NHP00K7kWQTxW'
);

export default function Invoice() {
  const { patient, admin, doctor } = useAuthContext();
  const [clientSecret, setClientSecret] = useState('');
  const [sender, setSender] = useState();
  const [receiver, setReceiver] = useState([]);
  const [allPatients, setAllPatients] = useState([]);
  const [group, setGroup] = useState('');
  let userGroup = '';
  let ussop = localStorage.getItem('userID');

  function getDate() {
    const today = new Date();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    const date = today.getDate();
    return `${year}-${month}-${date}`;
  }

  function getDueDate() {
    const today = new Date();
    const month = today.getMonth() + 7;
    const year = today.getFullYear();
    const date = 1;
    return `${year}-${month}-${date}`;
  }

  const handleSubmit = (e) => {
    const formdata = new FormData();
    formdata.append('sender', '65d696de8305820100ef32c4');
    formdata.append('receiver', '654439073d54c21536f360dd');
    formdata.append('dateSent', '2024-03-30');
    formdata.append('dateDue', '2024-09-30');
    formdata.append('subject', 'trial run');
    formdata.append('message', 'this is a test');
    formdata.append('link', 'hello');
    formdata.append('createdBy', '65d620232ab31280d913ec22');
    console.log(group);

    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/invoice`, formdata)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  const getPatientList = async () => {
    if (doctor) {
      const allpatients = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/doctors/providers/${ussop}`
      );
      const patients = await allpatients.json();
      setAllPatients(patients);
    }
  };

  useEffect(() => {
    document.title = 'Invoice | RunnerHealth';
    // Create PaymentIntent as soon as the page loads
    fetch(`${process.env.REACT_APP_SERVER_URL}/create-payment-intent`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items: [{ id: 'xl-tshirt' }] }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));

    if (patient) {
      userGroup = 'patients';
      console.log(userGroup);
    }
    if (admin) {
      userGroup = 'admins';
      console.log(userGroup);
    }
    if (doctor) {
      userGroup = 'doctors';
      console.log(userGroup);
    }
  }, []);

  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="home page-contents container-fluid">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
      <div className="container-fluid">
        <form
          className="message-form-can"
          method="post"
          action={`${process.env.REACT_APP_SERVER_URL}/messenger`}
        >
          <input name="mtitle" placeholder="Subject" />
          <select
            name="ugroup"
            id="ugroup"
            onChange={(e) => setGroup(e.target.value)}
          >
            <option value="patients">Patient</option>
            <option value="admins">Worker</option>
            <option value="doctors">Doctor</option>
          </select>
          <input name="uemail" placeholder="example@smail.com" />
          <textarea
            name="mcontent"
            className="msg-txt-area"
            placeholder="Message goes here..."
          />
          <button
            type="submit"
            onClick={handleSubmit}
            className="btn btn-dark msg-submit-btn"
          >
            Send
          </button>
          <button className="btn btn-dark msg-clear-btn">Cancel</button>
        </form>
      </div>
    </div>
  );
}
