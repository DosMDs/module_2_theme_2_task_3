import styles from "./button.module.css";

const Button = ({ id, value, style, isOperand, onButtonClick }) => {
	return (
		<button
			className={styles["button"] + " " + styles[style]}
			onClick={onButtonClick.bind(null, value, isOperand)}
			id={id}
		>
			{value}
		</button>
	);
};

export default Button;
