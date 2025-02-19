import { useState, useEffect } from "react";
import "./App.css";
import data from "./data.json";

function App() {
	const [buttons, setButtons] = useState(data);
	const [operation, setOperation] = useState("");
	const [operand1, setOperand1] = useState("");
	const [operand2, setOperand2] = useState("");

	useEffect(() => {
		const handleKeyUp = (event) => {
			if ("+-=".indexOf(event.key) >= 0) {
				setOperand2(operand1);
				setOperand1("");
				setOperation(event.key);
			} else if ("1234567890".indexOf(event.key) >= 0) {
				setOperand1(operand1 + event.key);
			}
		};

		window.addEventListener("keyup", handleKeyUp);
		return () => {
			window.removeEventListener("keyup", handleKeyUp);
		};
	});

	const onButtonClick = (event) => {
		console.log(event);
		if (event.target.tagName === "BUTTON") {
			if (isNaN(event.target.dataset.value)) {
				setOperand2(operand1);
				setOperand1("");
				setOperation(event.target.dataset.value);
			} else {
				setOperand1(operand1 + event.target.dataset.value);
			}
		}
	};

	return (
		<>
			<output>{operand2 + " " + operation}</output>
			<output>{operand1 || "0"}</output>
			<div className="button-container" onClick={onButtonClick}>
				{buttons.map((button) => {
					return (
						<button key={button.id} data-value={button.value}>
							{button.value}
						</button>
					);
				})}
			</div>
		</>
	);
}

export default App;
