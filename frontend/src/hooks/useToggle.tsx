import { useState } from "react";

function useToggle(initialValue: boolean = true): [boolean, () => void] {
  const [value, setValue] = useState(initialValue);

  const toggleValue = () => {
    console.log("hi");
    setValue(!value);
  };

  return [value, toggleValue];
}

export default useToggle;
