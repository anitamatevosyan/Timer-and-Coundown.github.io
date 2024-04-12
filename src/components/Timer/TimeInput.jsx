import * as React from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileTimePicker } from "@mui/x-date-pickers/MobileTimePicker";
import styled from "styled-components";

const StyledInput = styled(MobileTimePicker)`
  width: 350px;
`;

export default function TimeInput(props) {
  function setTime(obj) {
    props.handler(obj.$s, obj.$m, obj.$H);
  }
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["TimePicker"]}>
        <StyledInput
          label={props.label}
          ampm={false}
          ampmInClock={false}
          views={["hours", "minutes", "seconds"]}
          format={"HH:mm:ss"}
          onAccept={setTime}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}
