import { useState } from "react";

const useLightMode = () => {
  const [lightMode, setLightMode] = useState(() => {
    if (localStorage.getItem("lightMode")) {
      return JSON.parse(localStorage.getItem("lightMode"));
    }
    return false;
  });

  const toggleMode = (e) => {
    setLightMode(!lightMode);
    localStorage.setItem("lightMode", JSON.stringify(!lightMode));
  };

  return [lightMode, toggleMode];
};

export default useLightMode;
