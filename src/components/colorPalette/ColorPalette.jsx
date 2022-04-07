import { useState } from "react";
import "./colorPalette.css";
import { PaletteIcon } from "../../assets";
import { updateColor } from "../../services/firebaseServices";

const paletteColors = [
  "#ffffff",
  "#ffe8d1",
  "#ffbebb",
  "#deb8ff",
  "#d3ff9f",
  "#cbf0f8",
  "#a7c1f4",
  "#aad5cb",
];

const ColorPalette = ({ user, note, setNote, requestFrom, folder }) => {
  const [show, setShow] = useState(false);

  const colorChangeHandler = (color) => {
    if (requestFrom === "card") {
      updateColor(user, note, color, folder);
    } else {
      setShow(!show);
      setNote({ ...note, noteColor: color });
    }
  };
  return (
    <>
      <div className="palette">
        <PaletteIcon onClick={() => setShow(!show)} />

        <div
          className="palette-container"
          style={{ display: show ? "flex" : "none" }}
        >
          {paletteColors.map((color, index) => {
            return (
              <div
                key={index}
                className="palette-color"
                style={{
                  backgroundColor: color,
                }}
                onClick={() => colorChangeHandler(color)}
              ></div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export { ColorPalette };
