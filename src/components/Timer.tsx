import { useEffect, useState } from "react";
import useSound from "use-sound";
import beepsound from "../assets/beep-sound.mp3";

const INITIAL_TURN = 3;
const INITIAL_TIME = 60 * 3;
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
    <span className="text-3xl">{`${minutes}:${String(
      Math.floor(seconds)
    ).padStart(2, "0")}`}</span>
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
      if (0 < remainTime && remainTime < 11) playBeep();
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
    <div className="flex flex-col justify-center items-center">
      <div className="rounded-full border border-black w-10 h-10 p-2 flex justify-center items-center bg-yellow-400">
        <span className="text-lg">{remainTurn}</span>
      </div>
      <Time time={remainTime}></Time>
    </div>
  );
};

export default Timer;
