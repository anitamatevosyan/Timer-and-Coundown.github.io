import React, { useState, useRef, useMemo, useCallback } from "react";
import Button from "./Button.jsx";
import Display from "./Display.jsx";
import Header from "./Header.jsx";
import styled from "styled-components";
import TimeInput from "./TimeInput.jsx";
import LinearProgress from "@mui/material/LinearProgress";
import useSound from "use-sound";
import meme from "./meme.mp3";

const StyledButtons = styled.div`
  display: flex;
  column-gap: 5px;
`;
const StyledBlock = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 5px;
`;

const StyledHeader = styled(Header)`
  width: 300px;
  display: flex;
  justify-content: center;
`;

function Countdown() {
  const [play] = useSound(meme);
  const [countdownTime, setCountDownTime] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);
  let timerId = useRef(null);

  function setTime(inputSeconds, inputMinutes, inputHours) {
    setCountDownTime(inputHours * 60 * 60 + inputMinutes * 60 + inputSeconds);
    setTotalTime(inputHours * 60 * 60 + inputMinutes * 60 + inputSeconds);
  }

  function toggleTimer() {
    if (timerRunning) {
      stop();
    } else {
      startCountdown();
    }
    setTimerRunning(!timerRunning);
  }

  const startCountdown = useCallback(() => {
    if (countdownTime === 0) {
      return;
    }
    timerId.current = setInterval(() => {
      setCountDownTime((prev) => {
        if (prev === 1) {
          clearInterval(timerId.current);
          play();
        }
        return prev - 1;
      });
    }, 1000);
  }, [countdownTime, play]);

  const stop = useCallback(() => {
    clearInterval(timerId.current);
    timerId.current = null;
  }, []);
  const reset = useCallback(() => {
    setCountDownTime(totalTime);
    stop();
    setTimerRunning(false);
  }, []);

  const time = useMemo(() => {
    const ostatok = countdownTime % (60 * 60);
    const hoursTime = (countdownTime - ostatok) / (60 * 60);
    const secondsTime = ostatok % 60;
    const minutesTime = (ostatok - secondsTime) / 60;
    const progress =
      ((secondsTime + minutesTime * 60 + hoursTime * 60 * 60) / totalTime) *
      100;
    return {
      hoursTime,
      minutesTime,
      secondsTime,
      progress,
    };
  }, [countdownTime, totalTime]);

  return (
    <>
      <StyledHeader text="Countdown" />
      <StyledBlock>
        <Display
          seconds={time.secondsTime}
          minutes={time.minutesTime}
          hours={time.hoursTime}
        />
        <LinearProgress variant="determinate" value={time.progress} />
        <TimeInput label="ВВЕДИТЕ ВРЕМЯ" handler={setTime} />
        <StyledButtons>
          <Button
            text={timerRunning ? "Стоп" : "Старт"}
            onClick={toggleTimer}
          />
          <Button text="Сброс" onClick={reset} />
        </StyledButtons>
      </StyledBlock>
    </>
  );
}

export default Countdown;
