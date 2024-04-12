import React from "react";
import styled from "styled-components";
import MuiButton from "@mui/material/Button";

const StyledButton = styled(MuiButton)`
  width: 100px;
  height: 50px;
`;

function Button(props) {
  return (
    <StyledButton onClick={props.onClick} variant="contained" color="inherit">
      {props.text}
    </StyledButton>
  );
}
export default Button;
