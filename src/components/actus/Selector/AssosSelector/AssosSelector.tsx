import { TextField, Autocomplete } from "@mui/material";

import { assosNames, type AssosName } from "@/helpers";

export default function AssosSelector(props: {
  onChange: (selectedAssos: AssosName[]) => void;
}) {
  return (
    <Autocomplete
      multiple
      options={assosNames}
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
          label="Associations"
          placeholder="Associations"
        />
      )}
    />
  );
}
