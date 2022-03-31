import React, { useState, useEffect, useRef } from "react";
import "./newNoteInput.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { quillModules as modules } from "../../utils/quillModules";
import { CloseIcon, PinIcon, PinFillIcon, MoreIcon } from "../../assets";
import { addToSavedNotes } from "../../services/firebaseServices";

const NewNoteInput = ({ user }) => {
  const [value, setValue] = useState("");
  const editorRef = useRef();
  const [showEditor, setShowEditor] = useState(false);

  const initialNoteState = {
    title: "",
    content: "",
    noteColor: "#FFFFFF",
    isPinned: false,
    tags: [],
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

  return (
    <div className="home__container">
      <div className="note__editor">
        <div
          className={`note__header flex-row-center ${
            showEditor ? "border-bottom-0" : ""
          }`}
        >
          <div
            className="title__container"
            onClick={() => {
              setNote(initialNoteState);
              setValue("");
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

          {note.isPinned ? (
            <PinFillIcon
              size="1.3rem"
              className="icon mr-1"
              onClick={() => setNote({ ...note, isPinned: !note.isPinned })}
            />
          ) : (
            <PinIcon
              size="1.3rem"
              className="icon mr-1"
              onClick={() => setNote({ ...note, isPinned: !note.isPinned })}
            />
          )}

          {showEditor && (
            <>
              <span className="primary-text note__add" onClick={addNoteHandler}>
                ADD
              </span>
              <span className="editor__close__icon">
                <CloseIcon size="1.5rem" onClick={() => setShowEditor(false)} />
              </span>
              <span
                onClick={() => setDropdown((prev) => !prev)}
                className="mr-0p5 icon more__icon"
              >
                <MoreIcon size="1.4rem" />
              </span>
            </>
          )}
        </div>
        {showEditor && (
          <ReactQuill
            className="note__content"
            placeholder="Add a note..."
            theme="snow"
            value={value}
            onChange={setValue}
            modules={modules}
            ref={editorRef}
          />
        )}
      </div>
    </div>
  );
};

export { NewNoteInput };
