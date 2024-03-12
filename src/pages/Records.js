import { useEffect, useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import axios from 'axios';
import './styles/records.css';

const Records = () => {
  const { patient } = useAuthContext();
  const [user, setUser] = useState([]);
  const [file, setFile] = useState();
  const [image, setImage] = useState();
  let ussop = ''; // variable to store patientID

  const handleUpload = (e) => {
    const formdata = new FormData();
    formdata.append('file', file);
    formdata.append('patientID', user[0]._id);
    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/upload`, formdata)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    const getpageInfo = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/patients/${patient.email}`
      );
      const data = await response.json();
      setUser(data);
      ussop = data[0]._id;

      axios
        .get(`${process.env.REACT_APP_SERVER_URL}/records/${ussop}`)
        .then((res) => setImage(res.data))
        .catch((err) => console.log(err));
    };
    document.title = 'Records | RunnerHealth';
    getpageInfo();
  }, [patient.email]);

  return (
    <div className="records page-contents container-fluid">
      <h2 className="phi-header container-fluid text-2xl">
        Personal Health Information
      </h2>

      <div className="img-big-can">
        {image && image.length > 1 ? (
          image.map((image, index) => (
            <div className="img-can">
              <embed
                key={image.file}
                src={
                  `${process.env.REACT_APP_SERVER_URL}/Images/` + image.image
                }
                alt=""
                className="upload-prev"
              />
              <div className="file-title">THE FILE TITLE</div>
            </div>
          ))
        ) : (
          <div className="no-pics">
            <h1>Upload Records</h1>
          </div>
        )}
      </div>
      <br></br>
      <div className="form-can">
        <h3 className="upload-header">Upload Files</h3>
        <input
          type="file"
          id="myImage"
          name="myImage"
          className="file-input-box"
          onChange={(e) => setFile(e.target.files[0])}
          required
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
      </div>
    </div>
  );
};

export default Records;
