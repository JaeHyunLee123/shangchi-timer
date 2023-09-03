import { useEffect, useState } from "react";
import Button from "./Button";

const INITIAL_TURN = 3;
const INITIAL_TIME = 60 * 3;
const MIDDLE_TIME = 60;

type IntervalIdType = NodeJS.Timeout | string | number | undefined;

interface TimerProps {
  isTurn?: boolean;
}

const Time = ({ time }: { time: number }) => {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  return (
    <div>{`${minutes}:${String(Math.floor(seconds)).padStart(2, "0")}`}</div>
  );
};

const useInterval = (intervalCallback: Function, intervalTime = 1000) => {
  let intervalId: IntervalIdType;
  const startInterval = () => {
    intervalId = setInterval(intervalCallback, intervalTime);
  };
  const stopInterval = () => {
    clearInterval(intervalId);
  };

  return { startInterval, stopInterval };
};

const Timer = ({ isTurn }: TimerProps) => {
  const [remainTurn, setRemainTurn] = useState(INITIAL_TURN);
  const [remainTime, setRemainTime] = useState(INITIAL_TIME);
  const { startInterval, stopInterval } = useInterval(() =>
    setRemainTime((prev) => prev - 1)
  );

  useEffect(() => {
    if (isTurn) {
      startInterval();
    }
    return stopInterval;
  }, [isTurn, startInterval, stopInterval]);

  return (
    <div>
      <Time time={remainTime}></Time>
    </div>
  );
};

export default Timer;
