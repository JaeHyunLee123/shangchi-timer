import { useState } from "react";
import { cls } from "./libs/utils";
import Button from "./components/Button";
import Timer from "./components/Timer";

function App() {
  const [isChoTurn, setIsChoTurn] = useState(true);

  const changeTurn = () => {
    setIsChoTurn((prev) => !prev);
  };

  return (
    <div className="px-4 py-10">
      <div className="flex justify-around">
        <h1
          className={cls("text-xl text-blue-500", isChoTurn ? "font-bold" : "")}
        >
          초
        </h1>
        <h1
          className={cls("text-xl text-red-500", isChoTurn ? "" : "font-bold")}
        >
          한
        </h1>
      </div>
      <Timer isTurn={isChoTurn} />
      <div className="w-full flex justify-center">
        <Button onClick={changeTurn}>턴 종료</Button>
      </div>
    </div>
  );
}

export default App;

//장기 타이머

//시작

//버튼 누르면 초 <-> 한 왔다 갔다

//일시정지
