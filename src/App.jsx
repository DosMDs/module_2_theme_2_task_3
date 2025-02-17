import { useState } from "react";
import "./App.css";
import data from "./data.json";

function App() {
  const [buttons, setButtons] = useState(data);
  const [operation, setOperation] = useState("");
  const [operand1, setOperand1] = useState(0);
  const [operand2, setOperand2] = useState(0);

  const onButtonClick = (event) => {
    console.log(event);
  };

  return (
    <>
      <form onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="input">Ввод</label>
        <input type="number" name="input" />
        <div className="button-container" onClick={onButtonClick}>
          {buttons.map((button) => {
            return <button key={button}>{button}</button>;
          })}
        </div>
      </form>
    </>
  );
}

export default App;
