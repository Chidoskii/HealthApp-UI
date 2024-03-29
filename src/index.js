import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { PatientsContextProvider } from './context/PatientContext';
import { AdminsContextProvider } from './context/AdminContext';
import { AuthContextProvider } from './context/authContext';
import { DoctorsContextProvider } from './context/DoctorContext';
import { RecordsContextProvider } from './context/RecordsContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <DoctorsContextProvider>
        <AdminsContextProvider>
          <RecordsContextProvider>
            <PatientsContextProvider>
              <App />
            </PatientsContextProvider>
          </RecordsContextProvider>
        </AdminsContextProvider>
      </DoctorsContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
