import { useState, useEffect } from "react";
import styles from "./app.module.css";
import Button from "./Button";
import data from "./data.json";

const getResultOperation = (operand1, operand2, operation) => {
	switch (operation) {
		case "+":
			return String(Number(operand2) + Number(operand1));
		case "-":
			return String(Number(operand2) - Number(operand1));
		default:
			return "";
	}
};

function App() {
	const NUMS = data;
	const [operation, setOperation] = useState("");
	const [operand1, setOperand1] = useState("");
	const [operand2, setOperand2] = useState("");
	const [isFinal, setIsFinal] = useState(false);

	const executeOperation = (currentOperation) => {
		setIsFinal(false);
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
			setOperand2(getResultOperation(operand1, operand2, operation));
		} else {
			setOperand2(operand1);
		}

		if (currentOperation === "=") {
			setOperation("");
			setIsFinal(true);
		} else {
			setOperation(currentOperation);
		}
		setOperand1("");
	};

	const setOperand = (operand) => {
		setIsFinal(false);
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
			} else if (event.key === "Enter") {
				executeOperation("=");
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
			<output
				className={
					isFinal
						? styles.result + " " + styles["result-final"]
						: styles.result
				}
			>
				{operand2 + " " + operation + " " + operand1}
			</output>
			<div className={styles["button-container"]} onClick={onButtonClick}>
				{NUMS.map((num) => {
					return <Button key={num.id} {...num} />;
				})}
			</div>
		</>
	);
}

export default App;
