import styles from "./button.module.css";

const Button = ({ id, value, style }) => {
	return (
		<button
			className={styles["button"] + " " + styles[style]}
			data-value={value}
			data-id={id}
		>
			{value}
		</button>
	);
};

export default Button;
