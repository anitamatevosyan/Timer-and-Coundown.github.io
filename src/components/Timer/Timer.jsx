import { useRef, useState, memo, useCallback, useEffect } from "react";
import Button from "./Button.jsx";
import Display from "./Display.jsx";
import Header from "./Header.jsx";
import styled from "styled-components";

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

function Timer() {
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [hours, setHours] = useState(0);
  const [running, setRunning] = useState(false);
  const timerId = useRef(null);
  const start = useCallback(() => {
    if (timerId.current === null) {
      const interval = setInterval(() => {
        setSeconds((prev) => {
          if (prev === 59) {
            setMinutes((prev) => {
              if (prev === 59) {
                setHours((prev) => prev + 1);
                return 0;
              }
              return prev + 1;
            });
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
      timerId.current = interval;
      setRunning(true);
    }
  }, []);
  const stop = useCallback(() => {
    clearInterval(timerId.current);
    timerId.current = null;
    setRunning(false);
  }, []);
  const reset = useCallback(() => {
    stop();
    setSeconds(0);
    setMinutes(0);
    setHours(0);
  }, []);

  const toggleStartStop = useCallback(() => {
    if (running) {
      stop();
    } else {
      start();
    }
  }, [running, stop, start]);

  useEffect(() => {
    return () => {
      clearInterval(timerId.current);
    };
  }, []);

  return (
    <>
      <StyledHeader text="Timer" />
      <StyledBlock>
        <Display seconds={seconds} minutes={minutes} hours={hours} />
        <StyledButtons>
          <Button text={running ? "Стоп" : "Старт"} onClick={toggleStartStop} />
          <Button text="Сброс" onClick={reset} />
        </StyledButtons>
      </StyledBlock>
    </>
  );
}
export default memo(Timer);
