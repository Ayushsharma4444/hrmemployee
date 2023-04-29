import { Box } from "@mui/material";
import React, { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useStopwatch } from "react-timer-hook";
import Header from "../../components/Header";

const AttendanceEmployee = (props) => {
  const currentDate = new Date().toLocaleDateString("en-IN", {
    dateStyle: "long",
  });
  const [disableButton, setdisableButton] = useState(false);

  // const formatTimeArray = props.formatTime.split(":");
  // const hour = formatTimeArray[0];
  // const minute = formatTimeArray[1];

  // useEffect(() => {
  //   if (props.prehour >= hour || props.minute >= minute) {
  //     setdisableButton(true);
  //   }
  // }, [minute]);
  
  return (
    <div>
      <div className="Holiday-section">
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Header title="Attendance" subtitle="Attendance section" />
        </Box>
        <div>
          <div className="attendance-timesheet-div">
            <span className="Attendance-timesheet-heading">Timesheet</span>
            <span className="Attendance-timesheet-heading">{`${currentDate}`}</span>
            <div className="attendence-timesheet-time-padding">
              <h1 className="timesheet">{props.formatTime}</h1>
            </div>
            {props.isRunning ? (
              <button
                className="attendance-timesheet-button"
                type="start"
                onClick={props.stop}
              >
                Punch Out
              </button>
            ) : (
              <button
                className="attendance-timesheet-button"
                type="stop"
                onClick={props.start}
              >
                Punch In
              </button>
            )}
            {!disableButton && (
              <button
                className="attendance-timesheet-button"
                type="stop"
                onClick={props.reset}
              >
                Load Previous Time
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendanceEmployee;
