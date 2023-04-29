import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Routes, Route, useNavigate } from "react-router-dom";
import { MyProSidebarProvider } from "./pages/global/sidebar/sidebarContext";

import Topbar from "./pages/global/Topbar";

// import Dashboard from "./pages/dashboard";
// import Team from "./pages/team";
import Invoices from "./pages/invoices";
// import Contacts from "./pages/contacts";
import Form from "./pages/form";
import Calendar from "./pages/calendar";
// import Bar from "./pages/bar";
// import Line from "./pages/line";
// import Pie from "./pages/pie";
import FAQ from "./pages/faq";
// import Geography from "./pages/geography";
import { useContext, useEffect, useRef, useState } from "react";
import ForgotPassword from "./pages/forgotpassword/ForgotPassword";
import Profile from "./pages/Profile/Profile";
import Holiday from "./pages/Holidays/Holiday";
import Leaves from "./pages/Leaves/Leaves";
import AttendanceEmployee from "./pages/Attendance(employee)/AttendanceEmployee";
// import { useStopwatch } from "react-timer-hook";
import Timestamp from "./pages/Timestamp/Timestamp";
import socket from "./Socket";
import { EmailContext } from "./context/EmailContext";
import axios from "./axios";
// import { listenBySelector } from "@fullcalendar/react";

const Home = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [timesheetData, setTimesheetData] = useState([]);
  const [theme, colorMode] = useMode();
  const { email } = useContext(EmailContext);
  const socketRef = useRef();
  const currentDate = new Date().toLocaleDateString("en-IN", {
    dateStyle: "long",
  });
  var previousMinute;
  var previousHours;

  useEffect(() => {
    if (!localStorage.getItem("Token")) {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    socketRef.current = socket;
  }, []);

  useEffect(() =>{
    if (localStorage.getItem("Token")) {
      navigate("/profile");
    }
  },[])

  const token = localStorage.getItem("Token");

  console.log(email);

  console.log("inside this function");

  useEffect(() => {
    let isMounted = true;

    try {
      if (email.length > 1) {
        if (isMounted) {
          axios({
            method: "get",
            url: `/getworkinghour/${email}`,
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }).then((result) => {
            setTimesheetData(result.data.savedEmployeeWorkingHour.Timesheet);
          });
        }
      }
    } catch (error) {
      console.log(error);
    }

    return () => {
      isMounted = false;
    };
  }, [email]);

  if (timesheetData.length >= 1) {
    console.log(timesheetData);
    const timesheetDataLength = timesheetData.length - 1;
    if (timesheetData[timesheetDataLength].CurrentDate === currentDate) {
      let workingHours =
        timesheetData[timesheetDataLength].Workinghours.split(":");
      previousHours = workingHours[0];
      previousMinute = workingHours[1];
    }else {
      previousHours = 0;
      previousMinute = 0;
    }
  }
console.log(timesheetData)
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let intervalId;

    if (isRunning) {
      intervalId = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [isRunning]);

  const handleStart = () => {
    setIsRunning(true);
  };

  const handleStop = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    let setTimeInHoursAndMinutes = (hours, minutes) => {
      const seconds = hours * 3600 + minutes * 60;
      setIsRunning(false);
      setTime(seconds);
    };
    setTimeInHoursAndMinutes(+previousHours, +previousMinute);
  };

  const [formatTime, minutes] = (() => {
    const hours = Math.floor(time / 3600)
      .toString()
      .padStart(2, "0");
    const minutes = Math.floor((time % 3600) / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (time % 60).toString().padStart(2, "0");
    return [`${hours}:${minutes}:${seconds}`, `${minutes}`];
  })();

  useEffect(() => {
    socketRef.current.emit("timesheet", {
      currentUserEmail: email,
      timesheet: formatTime,
      date: currentDate,
    });
  }, [minutes]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <MyProSidebarProvider>
          <div style={{ height: "100%", width: "100%" }}>
            <main>
              <Topbar />
              <Routes>
                {/* <Route path="/" element={<Dashboard />} /> */}
                {/* <Route path="/team" element={<Team />} /> */}
                <Route path="/holiday" element={<Holiday />} />
                <Route path="/leaves" element={<Leaves />} />
                <Route
                  path="/attendanceEmployee"
                  element={<AttendanceEmployee />}
                />
                {/* <Route path="/contacts" element={<Contacts />} /> */}
                <Route path="/invoices" element={<Invoices />} />
                <Route path="/form" element={<Form />} />
                <Route
                  path="/timestamp"
                  element={
                    <Timestamp
                      formatTime={formatTime}
                      start={handleStart}
                      stop={handleStop}
                      reset={handleReset}
                      // prehour={previousHours}
                      // preminute={previousMinute}
                    />
                  }
                />
                <Route path="/profile" element={<Profile />} />
                {/* <Route path="/bar" element={<Bar />} /> */}
                {/* <Route path="/pie" element={<Pie />} /> */}
                {/* <Route path="/line" element={<Line />} /> */}
                <Route path="/faq" element={<FAQ />} />
                <Route path="/calendar" element={<Calendar />} />
                {/* <Route path="/geography" element={<Geography />} /> */}
              </Routes>
            </main>
          </div>
        </MyProSidebarProvider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default Home;
