import React from "react";
import styled from "styled-components";

const StyledDispay = styled.div`
  width: 300px;
  height: 20px;
  border-radius: 30px;
  padding: 20px;
  font-size: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #1a0a0a;
`;

function Display(props) {
  function format(time) {
    return time < 10 ? `0${time}` : time;
  }
  return (
    <StyledDispay>
      {format(props.hours)} : {format(props.minutes)} : {format(props.seconds)}
    </StyledDispay>
  );
}

export default Display;
