import React, { useState, useRef, useEffect } from "react";
import "./editModal.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { quillModules as modules } from "../../utils/quillModules";
import { updateNote } from "../../services/firebaseServices";

const EditModal = ({ openModal, note, user, noteType }) => {
  const [value, setValue] = useState(note.content);
  const editorRef = useRef();
  const [updatedNote, setUpdatedNote] = useState(note);

  const updateNoteContent = () => {
    setUpdatedNote({ ...updatedNote, content: value });
  };

  useEffect(() => {
    updateNoteContent();
  }, [value]);

  const updateHandler = () => {
    updateNote(user, noteType, updatedNote);
    openModal({ state: false });
  };

  return (
    <div className="modal__container flex-column-center">
      <div
        className="note__editor edit__modal"
        style={{ backgroundColor: "white" }}
      >
        <div className="note__header flex-row-center border-bottom-0 pt-0p5">
          <div className="title__container">
            <input
              type="text"
              className="note__title"
              placeholder="Title"
              name="title"
              value={updatedNote.title}
              onChange={(e) =>
                setUpdatedNote({
                  ...updatedNote,
                  title: e.target.value,
                })
              }
            />
          </div>
          <span className="primary-text note__add mr-1" onClick={updateHandler}>
            Save
          </span>
          <i
            className="fas fa-times pr-1 note__close"
            onClick={() => openModal({ state: false })}
          ></i>
        </div>
        <ReactQuill
          className="note_content"
          placeholder="Add a note..."
          theme="snow"
          value={value}
          onChange={setValue}
          modules={modules}
          ref={editorRef}
        />
      </div>
    </div>
  );
};

export { EditModal };
