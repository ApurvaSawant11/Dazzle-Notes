import React, { useState } from "react";
import "./card.css";
import ReactQuill from "react-quill";
import { RestoreIcon, TrashIcon } from "../../assets";
import {
  addToSavedNotes,
  deleteFromTrash,
} from "../../services/firebaseServices";

const TrashCard = ({ note, user }) => {
  const { title, content, noteColor } = note;
  const [show, setShow] = useState(false);

  const deleteHandler = () => {
    deleteFromTrash(user, note);
  };

  const restoreHandler = () => {
    deleteFromTrash(user, note);
    addToSavedNotes(user, note);
  };

  return (
    <>
      <div
        className="note__card mb-1"
        style={{ backgroundColor: noteColor }}
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
      >
        <div className="flex-row-center">
          <h6 className="card__title title__container pl-1">{title}</h6>
          {show && (
            <span className="icon restore__icon">
              <RestoreIcon size="1.5rem" onClick={restoreHandler} />
            </span>
          )}
          {show && (
            <span className="icon trash__icon mr-0p5">
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
