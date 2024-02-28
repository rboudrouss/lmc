import Checkbox from "@mui/material/Checkbox";

export default function CheckBox(props: {
  onChange: (checked: boolean) => void;
  id?: string;
  defaultChecked?: boolean;
}) {
  return (
    <Checkbox
      onChange={(_, b) => props.onChange(b)}
      id={props.id}
      defaultChecked={props.defaultChecked}
    />
  );
}
