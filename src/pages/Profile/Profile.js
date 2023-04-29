import { Box } from "@mui/material";
import axios from "../../axios";
import React, { useContext, useEffect, useState } from "react";
import Header from "../../components/Header";
import { EmailContext } from "../../context/EmailContext";
import { toast } from "react-toastify";

const succesOption = {
  position: "bottom-right",
  type: "success",
  autoClose: 2000,
  hideProgressBar: false,
  closeOnClick: false,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "dark",
};

const warningOption = {
  position: "bottom-right",
  type: "warning",
  autoClose: 2000,
  hideProgressBar: false,
  closeOnClick: false,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "dark",
};

const errorOption = {
  position: "bottom-right",
  type: "error",
  autoClose: 2000,
  hideProgressBar: false,
  closeOnClick: false,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "dark",
};

const Profile = () => {
  const { email, setEmail } = useContext(EmailContext);
  const [profileData, setProfileData] = useState("");
  const [loading, setLoading] = useState("Loading");


  const token = localStorage.getItem("Token");

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      axios({
        method: "get",
        url: "/getprofile",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          setProfileData(res.data.res);
          setEmail(res.data.res.EmployeeId.Email);
          localStorage.setItem("QueryId", res.data.res.EmployeeId._id)
          sessionStorage.setItem('Name', res.data.res.EmployeeId.Name);
        })
        .catch((err) => {
          console.log(err);
          setLoading(err.response.data.message)
          toast(err.response.data.message, errorOption);
        });
    }

    return () => {
      isMounted = false;
    };
  }, []);
  console.log(profileData)

  return (
    profileData ? 
    (<div>
      <Box display="flex" justifyContent="space-between" alignItems="center" style={{paddingLeft:'20px'}}>
        <Header title="Profile" subtitle="welcome to you Profile section" />
      </Box>
      <div className="employee-main-div">
        <div className="employee-profile-div">
          <img className="employee-profile-pic" src="" alt="Profile"></img>
          <div>
            <h3>{profileData.EmployeeId.Name}</h3>
            <p>{profileData.Team}</p>
            <p>{profileData.EmployeeId.Role}</p>
            <p>Date of Joining: {profileData.EmployeeId.JoinDate}</p>
          </div>
        </div>
        {/* codedbydurgesh */}
        <div className="employee-information-div">
          <p>Phone: {profileData.EmployeeId.MobileNo}</p>
          <p>Email: {profileData.EmployeeId.Email}</p>
          <p>Birthday: {profileData.Birthday}</p>
          <p>Address: {profileData.Address}</p>
          <p>Gender: {profileData.Gender}</p>
          <p>Report to: {profileData.ReportTo}</p>
        </div>
      </div>
      <div className="extra-information-div">
        <div className="personal-information-main-div">
          <h5>Personal information</h5>
          <div className="personal-information-div">
            <div>
              
              <p>Nationality:</p>
              <p>Religion:</p>
              <p>Marital Status:</p>
            </div>
            <div className="personal-information-nested-div">
              <p>{profileData.Nationality}</p>
              <p>{profileData.Religion}</p>
              <p>{profileData.MartialStatus}</p>
            </div>
          </div>
        </div>
        <div className="personal-information-main-div">
          <h5>Emergency Contacts</h5>
          <div className="personal-information-div">
            <div>
              <p>Name</p>
              <p>Relationship</p>
              <p>Phone</p>
            </div>
            <div className="personal-information-nested-div">
              <p>{profileData.EmergencyContactName}</p>
              <p>{profileData.EmergencyContactRelationship}</p>
              <p>{profileData.EmergencyContactNumber}</p>
            </div>
          </div>
        </div>
        <div className="personal-information-main-div">
          <h5>Bank information</h5>
          <div className="personal-information-div">
            <div>
              <p>Bank Name</p>
              <p>Bank Account No</p>
              <p>IFSC Code</p>
              <p>Pan Number</p>
            </div>
            <div className="personal-information-nested-div">
              <p>{profileData.BankName}</p>
              <p>{profileData.BankAccNo}</p>
              <p>{profileData.IFSCcode}</p>
              <p>{profileData.PanNo}</p>
            </div>
          </div>
        </div>
      </div>
      </div> )
      : loading
    
  );
};

export default Profile;
