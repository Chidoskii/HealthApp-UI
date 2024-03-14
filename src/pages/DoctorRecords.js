import { useEffect, useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import axios from 'axios';
import './styles/records.css';

const Records = () => {
  const { doctor } = useAuthContext();
  const [user, setUser] = useState([]);
  const [selection, setSelection] = useState([]);
  const [allPatients, setAllPatients] = useState([]);
  let ussop = localStorage.getItem('userID');

  const [file, setFile] = useState();
  const [image, setImage] = useState();

  const handleUpload = (e) => {
    const formdata = new FormData();
    formdata.append('file', file);
    formdata.append('patientID', '6541d2a42d371dca01cb321f');
    formdata.append('doctorID', user[0]._id);
    console.log(Array.from(formdata));
    console.log(user[0]._id);
    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/dupload`, formdata)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  const selectPatient = (id) => {
    const element = id;
    console.log(element);
    /*axios
      .get(`${process.env.REACT_APP_SERVER_URL}/records/${ussop}`)
      .then((res) => setSelection(res.data))
      .catch((err) => console.log(err));*/
  };

  useEffect(() => {
    const getUserInfo = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/doctors/${doctor.email}`
      );
      const data = await response.json();
      setUser(data);
      const allpatients = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/doctors/providers/${ussop}`
      );
      const patients = await allpatients.json();
      setAllPatients(patients);
    };
    document.title = 'Records | RunnerHealth';
    getUserInfo();

    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/get_images`)
      .then((res) => setImage(res.data[0].image))
      .catch((err) => console.log(err));
  }, [doctor.email]);

  return (
    <div className="records page-contents container-fluid">
      <h2 className="welcome container-fluid text-2xl">
        This is the Records Page
      </h2>
      <h3>Medical Records</h3>
      <h3>Electronic Health Records (EHR)</h3>
      <h3>Personal Health Information (PHI)</h3>
      <br></br>
      <br></br>
      <br></br>
      <div className="form-can">
        <h3>File Uploads</h3>
        <input
          type="file"
          id="myImage"
          name="myImage"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <br></br>
        <button
          type="submit"
          className="btn btn-dark submit-btn"
          onClick={handleUpload}
        >
          Submit
        </button>
        <br></br>
        <img
          src={`${process.env.REACT_APP_SERVER_URL}/Images/` + image}
          alt=""
        />
      </div>
      <br></br>
      <h2 className="welcome container-fluid text-2xl">
        Welcome, &nbsp;
        {user ? (
          user.map((user, index) => (
            <div key={index} className="uname">
              <span>{user._id}</span>!
            </div>
          ))
        ) : (
          <h1>Gathering Data...</h1>
        )}
      </h2>
      <div className="the-experiment">
        <div>The STINCC TEAM</div>
        <div className="client-list">
          {allPatients ? (
            allPatients.map((patients, index) => (
              <button onClick={selectPatient(patients._id)}>
                <div className="patient-tag">
                  <div id={patients._id} className="patientIDs">
                    {patients._id}
                  </div>
                  <div className="">{patients.pName}</div>
                </div>
              </button>
            ))
          ) : (
            <h1> Well, Ummm... You don't Have any patients.</h1>
          )}
          {allPatients && selection == '' ? (
            <div className="doctor-records-view"></div>
          ) : (
            selection.map((image, index) => (
              <div className="img-can" key={image.file}>
                <embed
                  src={
                    `${process.env.REACT_APP_SERVER_URL}/Images/` + image.image
                  }
                  alt=""
                  className="upload-prev"
                />
                <div className="file-title">THE FILE TITLE</div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Records;
