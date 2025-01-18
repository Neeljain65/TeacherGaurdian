import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Dashboard.css";

const UploadDocs = () => {
  const [documents, setDocuments] = useState([]);

  const student_foreign_id = localStorage.getItem("studentId");

  const getAllDocuments = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/dashboard/getdocuments/${student_foreign_id}`
      );
      const data = await response.json();
      setDocuments(data.documents || []);
      console.log(data.documents); // Assuming 'documents' is the array in the response
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    getAllDocuments();
  }, []);

  // List of document types
  const documentTypes = [
    { key: "result_12th", label: "Upload Result", link: "/upload-result" },
    { key: "aadharCard", label: "Upload Aadhar Card", link: "/upload-adharcard" },
    { key: "panCard", label: "Upload PAN Card", link: "/upload-pancard" },
    { key: "mhcetResult", label: "Upload MHT-CET Result", link: "/upload-mhcetresult" },
    { key: "admissionCard", label: "Upload Admission Card", link: "/upload-admissioncard" },
    { key: "capRegistration", label: "Upload CAP Registration Card", link: "/upload-capregistration" },
    { key: "feesReceipt", label: "Upload Fees Receipt", link: "/upload-feesreceipt" },
    { key: "domicile", label: "Upload Domicile Certificate", link: "/upload-domicile" },
    { key: "birthCertificate", label: "Upload Birth Certificate", link: "/upload-birthcertificate" },
    { key: "leavingCertificate", label: "Upload Leaving Certificate", link: "/upload-leavingcertificate" },
    { key: "incomeCertificate", label: "Upload Income Certificate", link: "/upload-incomecertificate" },
  ];

  return (
    <div className="dashboard-container">
      <div className="dashboard-card">
        <h1 className="dashboard-header">Upload Documents</h1>
        <ul className="dashboard-list">
          {documentTypes.map(({ key, label, link }) => (
            <li key={key} className="">
              {documents[0]?.[key] ? (
                <div className="flex">
                  <Link to={link} className="dashboard-link flex items-stretch justify-evenly gap-2">  
                  <span className="text-white">✔</span>
                   {label.replace("Upload", "Uploaded")}
                  <Link className="bg-white rounded-md text-sm text-teal-600 p-1" to={link}>Update</Link> 
                  </Link>
                </div>
              ) : (
                <Link to={link} className="dashboard-link-not">
                  {label}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UploadDocs;
