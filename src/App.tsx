import { useState } from "react";
import { cls } from "./libs/utils";
import Timer from "./components/Timer";

function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isChoTurn, setIsChoTurn] = useState(false);
  let isHanTurn = isPlaying && !isChoTurn;

  const changeTurn = () => {
    setIsChoTurn((prev) => !prev);
  };

  const startGame = () => {
    setIsPlaying(true);
    setIsChoTurn(true);
  };

  const resetGame = () => {
    window.location.reload();
  };

  return (
    <div className="px-4 py-10 bg-[#EEEDED] h-screen flex flex-col justify-center">
      <div className="flex justify-evenly">
        <div
          className={cls(
            "flex flex-col justify-center items-center p-4 py-2 space-y-10",
            isChoTurn ? "shadow-lg" : ""
          )}
        >
          <h1
            className={cls(
              "text-7xl text-[#0D1282]",
              isChoTurn ? "font-bold" : ""
            )}
          >
            楚
          </h1>
          <Timer isTurn={isChoTurn} />
        </div>

        <div
          className={cls(
            "flex flex-col justify-center items-center p-4 py-2 space-y-10",
            isHanTurn ? "shadow-lg" : ""
          )}
        >
          <h1
            className={cls(
              "text-7xl text-[#D71313]",
              isHanTurn ? "font-bold" : ""
            )}
          >
            漢
          </h1>
          <Timer isTurn={isHanTurn} />
        </div>
      </div>

      <div className="w-full flex justify-center mt-10">
        {isPlaying ? (
          <div className="flex flex-col items-center">
            <button
              onClick={changeTurn}
              className="bg-gray-200 py-2 px-7 rounded-lg shadow"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="aspect-square w-16"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"
                />
              </svg>
            </button>
            <button
              onClick={resetGame}
              className="bg-gray-200 py-2 px-7 rounded-lg shadow mt-14"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                />
              </svg>
            </button>
          </div>
        ) : (
          <button
            onClick={startGame}
            className=" bg-gray-200 px-10 py-2 rounded-lg shadow-lg"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="aspect-square w-10"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z"
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}

export default App;
