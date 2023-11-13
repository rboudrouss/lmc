import { useState } from "react";
import type { Element_Drop } from "../../helpers";

import drop_data_T from "../../data/dropdowns.json";
import Page from "../../components/Page/Page";
const drop_data = drop_data_T as unknown as Element_Drop;

import footer_data from  "../../data/footer.json";

export default function State() {
  const [selected, setSelected] = useState<Element_Drop>(drop_data);
  const [history, setHistory] = useState<Element_Drop[]>([]);

  function goTo(drop: Element_Drop) {
    window.scrollTo(0, 0);
    setHistory([...history, selected]);
    // window.history.pushState("", "", '/'+drop.title.replace(/ /g, '_'));
    setSelected(drop);
  }

  function goBack() {
    window.scrollTo(0, 0);
    setSelected(history.pop() || selected);
  }

  function goHome() {
    window.scrollTo(0, 0);
    goTo(drop_data);
  }

  return (
    <Page data={selected} goBack={goBack} goTo={goTo} goHome={goHome} footer={footer_data} />
  )
}