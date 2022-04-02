import React, { useState, useEffect, useRef } from "react";
import "./newNoteInput.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { CloseIcon, PinIcon, PinFillIcon, TagIcon } from "../../assets";
import { addToSavedNotes } from "../../services/firebaseServices";
import { DropDown } from "../dropDown/DropDown";
import { getCurrentDate } from "../../utils/getCurrentDate";
import { ColorPalette } from "../colorPalette/ColorPalette";
import {
  EditorToolbar,
  modules,
  formats,
} from "../editorToolbar/EditorToolbar";

const NewNoteInput = ({ user, tagsList }) => {
  const [value, setValue] = useState("");
  const editorRef = useRef();
  const [showEditor, setShowEditor] = useState(false);

  const initialNoteState = {
    title: "",
    content: "",
    noteColor: "#FFFFFF",
    isPinned: false,
    priority: { name: "Low", value: "0" },
    tags: [],
    createdAt: getCurrentDate(),
  };
  const [note, setNote] = useState(initialNoteState);
  const [dropdown, setDropdown] = useState(false);

  const updateNoteContent = () => {
    setNote(() => ({ ...note, content: value }));
  };
  useEffect(() => {
    updateNoteContent();
  }, [value]);

  const addNoteHandler = () => {
    const { title, content } = note;
    if (title !== "" || content !== "") {
      addToSavedNotes(user, note);

      setNote(initialNoteState);
      setValue("");
      setShowEditor(false);
    } else {
      alert("Please add atleast title or note");
    }
  };

  const priorityHandler = (value) => {
    let name = "";
    if (value === "2") {
      name = "High";
    } else if (value === "1") {
      name = "Medium";
    } else name = "Low";
    setNote({
      ...note,
      priority: { name: name, value: value },
    });
  };

  return (
    <div className="home__container">
      <div className="note__editor" style={{ backgroundColor: note.noteColor }}>
        <div className="note__header flex-row-center">
          <div
            className="title__container"
            onClick={() => {
              setShowEditor(true);
            }}
          >
            <input
              type="text"
              className="note__title"
              placeholder="Title"
              value={note.title}
              onChange={(e) =>
                setNote({
                  ...note,
                  title: e.target.value,
                })
              }
            />
          </div>

          <span
            className="icon mr-1"
            onClick={() => setNote({ ...note, isPinned: !note.isPinned })}
          >
            {note.isPinned ? <PinFillIcon /> : <PinIcon />}
          </span>

          {showEditor && (
            <>
              <span
                className="primary-text note__add pr-1"
                onClick={addNoteHandler}
              >
                ADD
              </span>
              <span className="editor__close__icon">
                <CloseIcon
                  size="1.5rem"
                  onClick={() => {
                    setNote(initialNoteState);
                    setValue("");
                    setShowEditor(false);
                  }}
                />
              </span>
            </>
          )}
        </div>

        {showEditor && (
          <span>
            <ReactQuill
              theme="snow"
              value={value}
              onChange={setValue}
              placeholder={"Write something awesome..."}
              modules={modules}
              formats={formats}
              ref={editorRef}
            />

            <span className="editor-footer pr-1 flex-row">
              <EditorToolbar />
              <span>
                <select
                  className="priority-dropdown mr-1"
                  onChange={(e) => priorityHandler(e.target.value)}
                >
                  <option value={null} hidden="">
                    Priority
                  </option>
                  <option value="0">Low</option>
                  <option value="1">Medium</option>
                  <option value="2">High</option>
                </select>

                <TagIcon onClick={() => setDropdown(true)} className="mr-1" />
                {dropdown && (
                  <DropDown
                    list={tagsList}
                    type="checkbox"
                    note={note}
                    setNote={setNote}
                    setDropdown={setDropdown}
                  />
                )}
                <ColorPalette user={user} note={note} setNote={setNote} />
              </span>
            </span>
          </span>
        )}
      </div>
    </div>
  );
};

export { NewNoteInput };
