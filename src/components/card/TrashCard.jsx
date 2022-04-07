import React, { useState } from "react";
import "./card.css";
import ReactQuill from "react-quill";
import { RestoreIcon, TrashIcon } from "../../assets";
import { addNote, deleteNote } from "../../services/firebaseServices";

const TrashCard = ({ note, user }) => {
  const { title, content, noteColor } = note;
  const [show, setShow] = useState(false);

  const deleteHandler = () => {
    deleteNote(user, note, "trashedNotes");
  };

  const restoreHandler = () => {
    deleteNote(user, note, "trashedNotes");
    addNote(user, note, "savedNotes");
  };

  return (
    <>
      <div
        className="note-card mb-1"
        style={{ backgroundColor: noteColor }}
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
      >
        <div className="flex-row-center">
          <h6 className="card-title title-container pl-1">{title}</h6>
          {show && (
            <span className="icon mr-0p5">
              <RestoreIcon size="1.4rem" onClick={restoreHandler} />
            </span>
          )}
          {show && (
            <span className="icon mr-1">
              <TrashIcon onClick={deleteHandler} />
            </span>
          )}
        </div>

        <ReactQuill
          modules={{ toolbar: null }}
          value={content}
          readOnly={true}
        />
      </div>
    </>
  );
};

export { TrashCard };
