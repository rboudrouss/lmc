import { useState } from "react";

export default function DateSelector(props: {
  onChange: (date: Date) => void;
  name?: string;
  id?: string;
  label?: string;
  className?: string;
}) {
  const { onChange, name, id, className } = props;
  const [date, setDate] = useState(null);

  const handleDateChange = (event) => {
    setDate(event.target.value);
    onChange(event.target.value);
  };

  const handleReset = () => {
    setDate(null);
    onChange(null);
  };

  return (
    <div className={className ?? ""}>
      <input
        type="date"
        name={name}
        id={id}
        value={date || ""}
        onChange={handleDateChange}
      />
      <i className="fa-solid fa-xmark" onClick={handleReset}></i>
      <label htmlFor={id}>{props.label}</label>
    </div>
  );
}
