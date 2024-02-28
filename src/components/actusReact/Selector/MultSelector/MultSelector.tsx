import { TextField, Autocomplete } from "@mui/material";

export default function MultSelector<T extends string>(props: {
  onChange: (selected: T[]) => void;
  className?: string;
  selection: T[];
  label: string;
}) {
  return (
    <Autocomplete
      sx={{
        padding: "10px 0",
      }}
      multiple
      options={props.selection}
      getOptionLabel={(option) => option.toUpperCase()}
      disableCloseOnSelect
      onChange={(event, value) => {
        console.log("value", value);
        props.onChange(value);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          variant="outlined"
          label={props.label}
          placeholder={props.label}
          className={props.className}
        />
      )}
    />
  );
}
