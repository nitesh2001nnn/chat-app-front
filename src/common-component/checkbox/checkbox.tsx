import "./checkbox.scss";

interface checkBoxProps {
  classes: string;
  label: string;
  onCheck?: () => void;
}

const Checkbox = ({ classes, label, onCheck }: checkBoxProps) => {
  return (
    <div className={`checkbox-container`} onClick={onCheck}>
      <div className={`checkbox-value ${classes}`}></div>
      <span>{label}</span>
    </div>
  );
};

export default Checkbox;
