import { useState } from "react";

export interface SelectionT {
  tags?: string[];
  event?: boolean;
  persistant?: boolean;
  date_start?: Date;
  date_end?: Date;
}

export default function Selector(props: {
  onChange: (selection: SelectionT) => void;
}) {
  const [selection, setSelection] = useState<SelectionT>({});

  const onChange = (selection: SelectionT) => {
    setSelection(selection);
    props.onChange(selection);
  };

  return (
    <div>
      <div>
        <input
          type="checkbox"
          name="event"
          id="event"
          defaultValue="on"
          onChange={(e) =>
            onChange({
              ...selection,
              event: e.target.checked,
            })
          }
        />
        <label htmlFor="persistant">Event</label>
      </div>
      <div>
        <input
          type="checkbox"
          name="persistant"
          id="persistant"
          defaultValue="on"
          onChange={(e) =>
            onChange({
              ...selection,
              persistant: e.target.checked,
            })
          }
        />
        <label htmlFor="persistant">Persistant</label>
      </div>
      <div>
        <input
          type="date"
          name="date_start"
          id="date_start"
          onChange={(e) =>
            onChange({
              ...selection,
              date_start: new Date(e.target.value),
            })
          }
        />
        <label htmlFor="date_start">Date de début</label>
      </div>
      <div>
        <input
          type="date"
          name="date_end"
          id="date_end"
          onChange={(e) =>
            onChange({
              ...selection,
              date_end: new Date(e.target.value),
            })
          }
        />
        <label htmlFor="date_end">Date de fin</label>
      </div>
      <div>
        <input
          type="text"
          name="tags"
          id="tags"
          onChange={(e) =>
            onChange({
              ...selection,
              tags: e.target.value.trim().toLocaleLowerCase().split(" "),
            })
          }
        />
        <label htmlFor="tags">Associations</label>
      </div>
    </div>
  );
}
