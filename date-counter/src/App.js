import { useState } from "react";

function App() {
  const [step, setStep] = useState(1);
  const [count, setCount] = useState(0);
  const date = new Date("june 21 2027");
  date.setDate(date.getDate() + count);

  function handleReset() {
    setCount(0);
    setStep(1);
  }

  function handlerPuls() {
    setCount(count + step);
  }

  function handlerMenor() {
    setCount(count - step);
  }
  return (
    <div className="App">
      <div>
        <input
          type="range"
          min={1}
          max={10}
          value={step}
          onChange={(e) => setStep(Number(e.target.value))}
        />
        <span>Step: {step}</span>
      </div>
      <div>
        <button onClick={() => handlerMenor()}>-</button>
        <input
          type="text"
          value={count}
          onChange={(e) => setCount(Number(e.target.value))}
        />
        <button onClick={() => handlerPuls()}>+</button>
      </div>
      <p>
        <span>
          {count === 0
            ? `Oggi è il `
            : count > 0
            ? `${count} giorni da oggi sarà il `
            : ` ${Math.abs(count)} giorno fa era `}
        </span>
        <span>{date.toDateString()}</span>
      </p>
      <div>
        <button onClick={() => handleReset()}>reset</button>
      </div>
    </div>
  );
}
export default App;
