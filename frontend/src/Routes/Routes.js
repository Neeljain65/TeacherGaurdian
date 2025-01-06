import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from '../Components/Login';
import Signup from '../Components/Signup';
import Dashboard from '../Components/Dashboard';
import UploadDocs from '../Components/UploadDocs';
import ResultUpload from '../Components/Docs/ResultUpload';
import AdharCardUpload from '../Components/Docs/AdharCardUpload';
import PanCardUpload from '../Components/Docs/PanCardUpload';
import MHCETResultUpload from '../Components/Docs/MH-CETResultUpload';
import AdmissionCardUpload from '../Components/Docs/AdmissionCardUpload';
import CAPRegistrationCardUpload from '../Components/Docs/CAPRegistrationCardUpload';
import FeesReceiptUpload from '../Components/Docs/FeesReceiptUpload';
import DomicileCertificateUpload from '../Components/Docs/DomicileCertificateUpload'; 
import BirthCertificateUpload from '../Components/Docs/BirthCertificateUpload';
import LeavingCertificateUpload from '../Components/Docs/LeavingCertificateUpload';
import IncomeCertificateUpload from '../Components/Docs/IncomeCertificateUpload';


const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/upload" element={<UploadDocs />} />
        <Route path="/upload-result" element={<ResultUpload />} />
        <Route path="/upload-adharcard" element={<AdharCardUpload />} />
        <Route path="/upload-pancard" element={<PanCardUpload />} />
        <Route path="/upload-mhcetresult" element={<MHCETResultUpload />} />
        <Route path="/upload-admissioncard" element={<AdmissionCardUpload />} />
        <Route
          path="/upload-capregistration"
          element={<CAPRegistrationCardUpload />}
        />
        <Route path="/upload-feesreceipt" element={<FeesReceiptUpload />} />
        <Route
          path="/upload-domicile"
          element={<DomicileCertificateUpload />}
        />
        <Route
          path="/upload-birthcertificate"
          element={<BirthCertificateUpload />}
        />
        <Route
          path="/upload-leavingcertificate"
          element={<LeavingCertificateUpload />}
        />
        <Route
          path="/upload-incomecertificate"
          element={<IncomeCertificateUpload />}
        />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
