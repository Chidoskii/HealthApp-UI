import { useEffect, useState } from 'react';
import axios from 'axios';
import './styles/records.css';

const Records = () => {
  const [file, setFile] = useState();
  const [image, setImage] = useState();
  //const [ussop, setUssop] = useState(localStorage.getItem('userID'));
  let ussop = localStorage.getItem('userID');

  const handleUpload = (e) => {
    const formdata = new FormData();
    formdata.append('file', file);
    formdata.append('patientID', ussop);
    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/upload`, formdata)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/records/${ussop}`)
      .then((res) => setImage(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/records/${ussop}`)
      .then((res) => setImage(res.data))
      .catch((err) => console.log(err));

    return () => {
      document.title = 'Records | RunnerHealth';
      console.log('All done.');
    };
  }, [image]);

  return (
    <div className="records page-contents container-fluid">
      <h2 className="phi-header container-fluid text-2xl">
        Personal Health Information
      </h2>

      <div className="img-big-can">
        {image && image.length > 0 ? (
          image.map((image, index) => (
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
