import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

export default function DateSelector(props: {
  onChange: (date: Date) => void;
  label?: string;
  className?: string;
}) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        className={props.className}
        label={props.label}
        slotProps={{
          field: { clearable: true },
        }}
        onChange={(date) => {
          props.onChange(date as Date);
        }}
        format="DD/MM/YYYY"
      />
    </LocalizationProvider>
  );
}
