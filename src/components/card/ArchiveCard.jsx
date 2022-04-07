import React, { useState } from "react";
import "./card.css";
import ReactQuill from "react-quill";
import { EditIcon, UnarchiveIcon, DeleteIcon } from "../../assets";
import { addNote, deleteNote } from "../../services/firebaseServices";
import { NoteModal } from "../modal/NoteModal";

const ArchiveCard = ({ note, user }) => {
  const { title, content, noteColor } = note;
  const [show, setShow] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const deleteHandler = () => {
    deleteNote(user, note, "archivedNotes");
    addNote(user, note, "trashedNotes");
  };

  const unarchiveHandler = () => {
    deleteNote(user, note, "archivedNotes");
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
            <div className="flex-row-center">
              <UnarchiveIcon
                onClick={unarchiveHandler}
                size="1.2rem"
                className="mr-1 icon"
              />
              <EditIcon
                onClick={() => setShowModal(true)}
                size="1.2rem"
                className="mr-1 icon"
              />
              <DeleteIcon
                onClick={deleteHandler}
                size="1.2rem"
                className="mr-1 icon"
              />
            </div>
          )}
        </div>

        <ReactQuill
          modules={{ toolbar: null }}
          value={content}
          readOnly={true}
        />
      </div>

      {showModal && (
        <NoteModal
          user={user}
          noteState={note}
          setShowModal={setShowModal}
          folderName="archivedNotes"
          type="edit"
        />
      )}
    </>
  );
};

export { ArchiveCard };
