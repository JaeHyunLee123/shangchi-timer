import { useEffect, useState } from "react";
import useSound from "use-sound";
import beepsound from "../assets/beep-sound.mp3";

const INITIAL_TURN = 3;
const INITIAL_TIME = 13;
const MIDDLE_TIME = 60;
const MINIMUN_TIME = 30;

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
  const [playBeep] = useSound(beepsound);
  const [remainTurn, setRemainTurn] = useState(INITIAL_TURN);
  const [remainTime, setRemainTime] = useState(INITIAL_TIME);
  const { startInterval, stopInterval } = useInterval(() =>
    setRemainTime((prev) => prev - 1)
  );

  useEffect(() => {
    if (isTurn) {
      startInterval();
      if (0 < remainTime && remainTime < 10) playBeep();
      if (remainTime < 0) {
        setRemainTurn((prev) => prev - 1);
        setRemainTime(MIDDLE_TIME);
      }
    } else {
      if (remainTime < MINIMUN_TIME) setRemainTime(MINIMUN_TIME);
    }
    return stopInterval;
  }, [
    isTurn,
    startInterval,
    stopInterval,
    setRemainTime,
    remainTime,
    playBeep,
  ]);

  return (
    <div>
      <span>남은 초 읽기: {remainTurn}</span>
      <Time time={remainTime}></Time>
    </div>
  );
};

export default Timer;
