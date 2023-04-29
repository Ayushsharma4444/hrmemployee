import React, { useEffect, useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import { useMediaQuery } from "@mui/material";
import Header from "../../components/Header";
import { useNavigate } from "react-router-dom";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import axios from "../../axios";
import { toast, ToastContainer } from "react-toastify";

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

const Form = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [contact, setContact] = useState("");
  const [gender, setGender] = useState("");
  const [maritalStatus, setMaritalStatus] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [role, setRole] = useState("");
  const [birthday, setBirthday] = useState("");
  const [aadhar, setAadhar] = useState("");
  const [pan, setPan] = useState("");
  const [bank, setBank] = useState("");
  const [account, setAccount] = useState("");
  const [ifsc, setIfsc] = useState("");
  const [reportTo, setReportTo] = useState("");
  const [nationality, setNationality] = useState("");
  const [religion, setReligion] = useState("");
  const [team, setTeam] = useState("");
  const [emergencyContactName, setEmergencyContactName] = useState("");
  const [emergencyContactRelation, setEmergencyContactRelation] = useState("");
  const [emergencyContactNumber, setEmergencyContactNumber] = useState("");

  useEffect(() => {
    console.log("inside this function");
    if (!localStorage.getItem("Token")) {
      navigate("/login");
    }
  }, []);

  const isNonMobile = useMediaQuery("(min-width:600px)");
  const phoneRegExp =
    /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;
  const handleFormSubmit = (values) => {
    console.log(values);
  };

  const token = localStorage.getItem("Token");

  console.log(gender)

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios({
        method: "post",
        url: "/addprofile",
        data: {
          team: team,
          birthday: birthday,
          address: address1,
          gender: gender,
          reportTo: reportTo,
          idNo: aadhar,
          nationality: nationality,
          religion: religion,
          martialStatus: maritalStatus,
          emergencyContactName: emergencyContactName,
          emergencyContactRelation: emergencyContactRelation,
          emergencyContactNumber: emergencyContactNumber,
          bankName: bank,
          bankAccNo: account,
          isfcCode: ifsc,
          panNo: pan,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response) {
        setLoading(false);
        toast(response.data.message, succesOption);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast(error.response.data.message, errorOption);
    }
  };

  return (
    <Box m="20px">
      <Header title="PROFILE FORM" subtitle="Upload Profile Details" />

      <Formik>
        <form onSubmit={handleProfileSubmit}>
          <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{
              "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
            }}
          >
            <TextField
              fullWidth
              variant="filled"
              type="number"
              label="Contact Number"
              onChange={(e) => {
                setContact(e.target.value);
              }}
              value={contact}
              name="contact"
              sx={{ gridColumn: "span 4" }}
            />
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={gender}
                  label="Gender"
                  onChange={(e) => {
                    setGender(e.target.value);
                  }}
                >
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Marital Status
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={maritalStatus}
                  label="Marital Status"
                  onChange={(e) => {
                    setMaritalStatus(e.target.value);
                  }}
                >
                  <MenuItem value="Married">Married</MenuItem>
                  <MenuItem value="Unmarried">Unmarried</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="Address 1"
              onChange={(e) => {
                setAddress1(e.target.value);
              }}
              value={address1}
              name="address1"
              sx={{ gridColumn: "span 4" }}
            />
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="Address 2"
              onChange={(e) => {
                setAddress2(e.target.value);
              }}
              value={address2}
              name="address2"
              sx={{ gridColumn: "span 4" }}
            />
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="Role"
              onChange={(e) => {
                setRole(e.target.value);
              }}
              value={role}
              name="role"
              sx={{ gridColumn: "span 4" }}
            />
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="Team"
              // onBlur={handleBlur}
              onChange={(e) => {
                setTeam(e.target.value);
              }}
              value={team}
              name="team"
              sx={{ gridColumn: "span 4" }}
            />
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="Birthday"
              onChange={(e) => {
                setBirthday(e.target.value);
              }}
              value={birthday}
              name="birthday"
              sx={{ gridColumn: "span 4" }}
            />
            <TextField
              fullWidth
              variant="filled"
              type="number"
              label="Aadhar number"
              // onBlur={handleBlur}
              onChange={(e) => {
                setAadhar(e.target.value);
              }}
              value={aadhar}
              name="aadhar"
              // error={!!touched.aadhar && !!errors.aadhar}
              // helperText={touched.aadhar && errors.aadhar}
              sx={{ gridColumn: "span 4" }}
            />
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="Pan number"
              // onBlur={handleBlur}
              onChange={(e) => {
                setPan(e.target.value);
              }}
              value={pan}
              name="pan"
              // error={!!touched.pan && !!errors.pan}
              // helperText={touched.pan && errors.pan}
              sx={{ gridColumn: "span 4" }}
            />
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="Bank Name"
              // onBlur={handleBlur}
              onChange={(e) => {
                setBank(e.target.value);
              }}
              value={bank}
              name="bank"
              // error={!!touched.bank && !!errors.bank}
              // helperText={touched.bank && errors.bank}
              sx={{ gridColumn: "span 4" }}
            />
            <TextField
              fullWidth
              variant="filled"
              type="number"
              label="Bank Account Number"
              // onBlur={handleBlur}
              onChange={(e) => {
                setAccount(e.target.value);
              }}
              value={account}
              name="account"
              // error={!!touched.accNo && !!errors.accNo}
              // helperText={touched.accNo && errors.accNo}
              sx={{ gridColumn: "span 4" }}
            />
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="IFSC Code"
              // onBlur={handleBlur}
              onChange={(e) => {
                setIfsc(e.target.value);
              }}
              value={ifsc}
              name="ifsc"
              // error={!!touched.ifsc && !!errors.ifsc}
              // helperText={touched.ifsc && errors.ifsc}
              sx={{ gridColumn: "span 4" }}
            />
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="Report To"
              // onBlur={handleBlur}
              onChange={(e) => {
                setReportTo(e.target.value);
              }}
              value={reportTo}
              name="reportTo"
              // error={!!touched.ifsc && !!errors.ifsc}
              // helperText={touched.ifsc && errors.ifsc}
              sx={{ gridColumn: "span 4" }}
            />
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="Nationality"
              // onBlur={handleBlur}
              onChange={(e) => {
                setNationality(e.target.value);
              }}
              value={nationality}
              name="nationality"
              // error={!!touched.ifsc && !!errors.ifsc}
              // helperText={touched.ifsc && errors.ifsc}
              sx={{ gridColumn: "span 4" }}
            />
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="Religion"
              // onBlur={handleBlur}
              onChange={(e) => {
                setReligion(e.target.value);
              }}
              value={religion}
              name="religion"
              // error={!!touched.ifsc && !!errors.ifsc}
              // helperText={touched.ifsc && errors.ifsc}
              sx={{ gridColumn: "span 4" }}
            />
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="Emergency Contact Name"
              // onBlur={handleBlur}
              onChange={(e) => {
                setEmergencyContactName(e.target.value);
              }}
              value={emergencyContactName}
              name="emergencyContactName"
              // error={!!touched.ifsc && !!errors.ifsc}
              // helperText={touched.ifsc && errors.ifsc}
              sx={{ gridColumn: "span 4" }}
            />
            <TextField
              fullWidth
              variant="filled"
              type="number"
              label="Emergency Contact Number"
              // onBlur={handleBlur}
              onChange={(e) => {
                setEmergencyContactNumber(e.target.value);
              }}
              value={emergencyContactNumber}
              name="emergencyContactNumber"
              // error={!!touched.ifsc && !!errors.ifsc}
              // helperText={touched.ifsc && errors.ifsc}
              sx={{ gridColumn: "span 4" }}
            />
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="Emergency Contact Relation"
              // onBlur={handleBlur}
              onChange={(e) => {
                setEmergencyContactRelation(e.target.value);
              }}
              value={emergencyContactRelation}
              name="emergencyContactRelation"
              // error={!!touched.ifsc && !!errors.ifsc}
              // helperText={touched.ifsc && errors.ifsc}
              sx={{ gridColumn: "span 4" }}
            />
          </Box>
          <Box display="flex" justifyContent="end" mt="20px">
            <Button type="submit" color="secondary" variant="contained">
              Upload Details
            </Button>
          </Box>
        </form>
        {/* )} */}
      </Formik>
    </Box>
  );
};

export default Form;
