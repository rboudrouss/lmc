import { useState } from "react";

export interface SelectionT {
  tags?: string[];
  persistant?: boolean;
  date_start?: Date;
  date_end?: Date;
}

export default function Selector(props: {
  onChange: (selection: SelectionT) => void;
}) {
  const [selection, setSelection] = useState<SelectionT>({});
  console.log("uwu",selection);

  return <div>
    <div>
      <input type="checkbox" name="persistant" id="persistant" onChange={(e) => {
        setSelection({
          ...selection,
          persistant: e.target.checked,
        });
        props.onChange(selection);
      }} />
      <label htmlFor="persistant">Persistant</label>
    </div>
    <div>
      <input type="date" name="date_start" id="date_start" onChange={(e) => {
        setSelection({
          ...selection,
          date_start: new Date(e.target.value),
        });
        props.onChange(selection);
      }} />
      <label htmlFor="date_start">Date de début</label>
    </div>
    <div>
      <input type="date" name="date_end" id="date_end" onChange={(e) => {
        setSelection({
          ...selection,
          date_end: new Date(e.target.value),
        });
        props.onChange(selection);
      }} />
      <label htmlFor="date_end">Date de fin</label>
    </div>
    <div>
      <input type="text" name="tags" id="tags" onChange={(e) => {
        setSelection({
          ...selection,
          tags: e.target.value.split(" "),
        });
        props.onChange(selection);
      }} />
      <label htmlFor="tags">Tags</label>
    </div>
  </div>;
}
