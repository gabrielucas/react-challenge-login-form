import "../index.css";

export const Input = (props) => {
  return (
    <div className="row">
      <label htmlFor={`${props.id}`}>{props.labelText}</label>
      <input
        id={`${props.id}`}
        type={`${props.type}`}
        autoComplete={`${props.autoComplete}`}
        value={props.value}
        onChange={props.onChange}
        ref={props.inputRef}
      />
    </div>
  );
};
