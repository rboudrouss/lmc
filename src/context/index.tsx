/*
import { createContext, useState } from "react";
import { Element_Drop } from "../helpers/types";
import drop_data_T from "../data/dropdowns.json";
const drop_data = drop_data_T as unknown as Element_Drop;

class appContextClass {
  global: Element_Drop = drop_data;
  selected: Element_Drop = drop_data.childs[0];
  history: Element_Drop[] = [];

  goTo = (drop: Element_Drop) => {
    this.history.push(this.selected);
    this.selected = drop;
    console.log(this);
  };

  goBack = () => {
    this.selected = this.history.pop() || this.selected;
  };

  goHome = () => {
    this.goTo(this.global);
  };
}

export const appContext = createContext(new appContextClass());

export function AppContextProvider(props: { children: JSX.Element }) {
  return (
    <appContext.Provider value={new appContextClass()}>
      {props.children}
    </appContext.Provider>
  );
}
*/

import { createContext, useState } from "react";
import { Element_Drop } from "../helpers/types";
import drop_data_T from "../data/dropdowns.json";
const drop_data = drop_data_T as unknown as Element_Drop;

interface AppContextType {
  global: Element_Drop;
  selected: Element_Drop;
  history: Element_Drop[];
  goTo: (drop: Element_Drop) => void;
  goBack: () => void;
  goHome: () => void;
}

const initialAppContext: AppContextType = {
  global: drop_data,
  selected: drop_data.childs[0],
  history: [],
  goTo: () => {},
  goBack: () => {},
  goHome: () => {},
};

export const AppContext = createContext<AppContextType>(initialAppContext);

export const AppContextProvider = (props: { children: React.ReactNode }) => {
  const [selected, setSelected] = useState<Element_Drop>(
    initialAppContext.selected
  );

  initialAppContext.goTo = (drop: Element_Drop) => {
    console.log("uwu ?");
    initialAppContext.history.push(selected);
    setSelected(drop);
    initialAppContext.selected = selected;
    console.log("selected \n",initialAppContext.selected);
  };

  initialAppContext.goBack = () => {
    console.log("uwu ?");
    setSelected(initialAppContext.history.pop() || selected);
    initialAppContext.selected = selected;
    initialAppContext.history = initialAppContext.history.slice(0, -1);
    console.log("went back, this is history", initialAppContext.history);
  };

  initialAppContext.goHome = () => {
    console.log("uwu ?");
    initialAppContext.goTo(initialAppContext.global);
    console.log("went home");
  };

  return (
    <AppContext.Provider value={initialAppContext}>
      {props.children}
    </AppContext.Provider>
  );
};