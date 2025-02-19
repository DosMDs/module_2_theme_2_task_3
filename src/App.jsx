import { useState, useEffect } from "react";
import styles from "./app.module.css";
import data from "./data.json";

function App() {
	const NUMS = data;
	const [operation, setOperation] = useState("");
	const [operand1, setOperand1] = useState("");
	const [operand2, setOperand2] = useState("");

	const executeOperation = (currentOperation) => {
		if (currentOperation === "C") {
			setOperand1("");
			setOperand2("");
			setOperation("");
			return;
		}

		if (!operand1 && currentOperation !== "=") {
			setOperation(currentOperation);
			return;
		}

		if (operation) {
			switch (operation) {
				case "+":
					setOperand2(String(Number(operand2) + Number(operand1)));
					break;
				case "-":
					setOperand2(String(Number(operand2) - Number(operand1)));
					break;
				default:
					break;
			}
		} else {
			setOperand2(operand1);
		}

		if (currentOperation === "=") {
			setOperation("");
		} else {
			setOperation(currentOperation);
		}
		setOperand1("");
	};

	const setOperand = (operand) => {
		if (operand2 && !operation) {
			setOperand2("");
		}
		setOperand1(operand1 + operand);
	};

	useEffect(() => {
		const handleKeyUp = (event) => {
			if ("+-=".indexOf(event.key) >= 0) {
				executeOperation(event.key);
			} else if ("1234567890".indexOf(event.key) >= 0) {
				setOperand(event.key);
			}
		};

		window.addEventListener("keyup", handleKeyUp);
		return () => {
			window.removeEventListener("keyup", handleKeyUp);
		};
	});

	const onButtonClick = (event) => {
		if (event.target.tagName === "BUTTON") {
			if (isNaN(event.target.dataset.value)) {
				executeOperation(event.target.dataset.value);
			} else {
				setOperand(event.target.dataset.value);
			}
		}
	};

	return (
		<>
			<output>
				{operand2 + " " + operation + " " + operand1 || "0"}
			</output>
			<div className={styles["button-container"]} onClick={onButtonClick}>
				{NUMS.map((num) => {
					return (
						<button
							className={
								styles["button"] + " " + styles[num.style]
							}
							key={num.id}
							data-value={num.value}
						>
							{num.value}
						</button>
					);
				})}
			</div>
		</>
	);
}

export default App;
