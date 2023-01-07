import "../index.css";

export const Button = ({ disabled, onClick, children, buttonStyle }) => {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      style={{ cursor: buttonStyle.cursor }}
    >
      {children}
    </button>
  );
};
