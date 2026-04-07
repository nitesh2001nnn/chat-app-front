import "./email-input.scss";

interface emailValidation {
  value: string;
  onChange: (value: any, error: any) => void;
  customeValidator: () => void;
  error: string;
  placeholder: string;
  label?: string;
  [key: string]: any;
}

const EmailInputs = ({
  value,
  onChange,
  placeholder,
  customeValidator,
  error,
  label,
  ...rest
}: emailValidation) => {
  const defaultValidator = (email: any) => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) return "Email is required";
    if (!pattern.test(email)) return "Invalid email format";
    return "";
  };

  const handleChange = (e: any) => {
    const value = e.target.value;

    const customeError = defaultValidator(value);

    onChange(value, customeError);
  };
  return (
    <div className="email-input-container">
      {label && <span className="bold-text-medium-xxs">{label}</span>}
      <input
        type="text"
        onChange={e=>handleChange(e)}
        placeholder={placeholder}
        value={value}
        {...rest}
      />
      {error && <span className="error-message">{error}</span>}
    </div>
  );
};

export default EmailInputs;
