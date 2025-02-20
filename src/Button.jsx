import styles from "./button.module.css";

const Button = ({ id, value, style, onButtonClick }) => {
	return (
		<button
			className={styles["button"] + " " + styles[style]}
			onClick={onButtonClick.bind(null, value)}
			id={id}
		>
			{value}
		</button>
	);
};

export default Button;
