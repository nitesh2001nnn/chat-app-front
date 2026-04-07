import "./text-input.scss";

interface inputTextProps extends React.InputHTMLAttributes<HTMLInputElement> {
  value: string;

  errorText: string;
  placeholder: string;
  label: string;
}

const TextInput = ({
  value,

  errorText = "some",
  placeholder,
  label,
  ...rest
}: inputTextProps) => {
  return (
    <div className="input-wrapper">
      <span className="bold-text-medium-xxs">{label}</span>
      <input
        className={`input-container ${errorText.length && "error-order"}`}
        placeholder={placeholder}
        value={value}
        {...rest}
      />
      {errorText.length > 0 && (
        <span className="error-text bold-text-small">{errorText}</span>
      )}
    </div>
  );
};

export default TextInput;
