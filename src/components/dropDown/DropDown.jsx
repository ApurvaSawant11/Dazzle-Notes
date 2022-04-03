import React, { useState, useEffect, useRef } from "react";

const DropDown = ({ list, note, setNote, setDropdown }) => {
  const node = useRef();

  const changeHandler = (checked, value) => {
    if (checked) {
      if (!note.tags.includes(value))
        setNote((prev) => ({ ...prev, tags: [...prev.tags, value] }));
    } else {
      setNote((prev) => ({
        ...prev,
        tags: prev.tags.filter((item) => item !== value),
      }));
    }
  };

  const [user, showText] = useState(false);
  const clickOutside = (e) => {
    if (node.current.contains(e.target)) {
      return;
    }
    setDropdown(false);
    showText(false);
  };

  useEffect(() => {
    document.addEventListener("mousedown", clickOutside);
    return () => {
      document.removeEventListener("mousedown", clickOutside);
    };
  }, [user]);

  return (
    <div
      className="dropdown-container flex-column p-1 pt-0p5"
      ref={node}
      onClick={() => showText(!user)}
    >
      <span className="pb-0p5">Tags</span>
      {list.map((item, index) => (
        <label key={index}>
          <input
            type="checkbox"
            value={item}
            checked={note.tags.includes(item)}
            name="option"
            onChange={(e) => changeHandler(e.target.checked, e.target.value)}
          />{" "}
          {item}
        </label>
      ))}
    </div>
  );
};

export { DropDown };
