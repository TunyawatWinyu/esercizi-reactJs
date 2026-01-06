import { useState } from "react";

export default function App() {
  const [step, setStep] = useState(1);
  const [count, setCount] = useState(0);

  const date = new Date("january 3 2026");
  date.setDate(date.getDate() + count);

  function handlerPlus() {
    setStep(step + 1);
  }

  function HandlerMenor() {
    if (step > 1) {
      setStep(step - 1);
    }
  }

  function handlerCountPlus() {
    setCount(count + step);
  }
  function handlerCountMenor() {
    setCount(count - step);
  }
  return (
    <>
      <div className="step">
        <button onClick={() => HandlerMenor()}>-</button>
        <span>Step:{step}</span>
        <button onClick={() => handlerPlus()}>+</button>
      </div>
      <div className="count">
        <button onClick={() => handlerCountMenor()}>-</button>
        <span>Count:{count}</span>
        <button onClick={() => handlerCountPlus()}>+</button>
      </div>
      <p>
        {" "}
        <span>
          {count === 0
            ? "Oggi è "
            : count > 0
            ? `${count} giorni fa da oggi era il`
            : ` ${Math.abs(count)} giorno fa era `}
        </span>{" "}
        <span>{date.toDateString()}</span>
      </p>
    </>
  );
}
