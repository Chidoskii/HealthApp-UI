import { useEffect, useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext.js';
import axios from 'axios';

import './styles/records.css';

const Home = () => {
  const { doctor } = useAuthContext();
  const [user, setUser] = useState([]);
  const [demo, setDemo] = useState([]);
  let ussop = localStorage.getItem('userID');

  const handleSubmit = (e) => {
    const formdata = new FormData();
    formdata.append('senderID', ussop);
    console.log(demo);
    /*
    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/upload`, formdata)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));*/
  };

  useEffect(() => {
    const getUserInfo = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/doctors/${doctor.email}`
      );
      const data = await response.json();
      setUser(data);
      localStorage.setItem('userID', data[0]._id);
    };
    document.title = 'Home | RunnerHealth';
    getUserInfo();
  }, [doctor.email]);

  return (
    <div className="home page-contents container-fluid">
      <h2 className="welcome container-fluid text-2xl">
        Welcome,&nbsp;Dr.&nbsp;
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
            onChange={(e) => setDemo(e.target.value)}
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
};

export default Home;
