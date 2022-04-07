import React, { useState } from "react";
import "./card.css";
import ReactQuill from "react-quill";
import { MoreIcon } from "../../assets";
import { addNote, deleteNote } from "../../services/firebaseServices";
import { NoteModal } from "../modal/NoteModal";

const ArchiveCard = ({ note, user }) => {
  const { title, content, noteColor } = note;
  const [show, setShow] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const deleteHandler = () => {
    deleteNote(user, note, "archivedNotes");
    addNote(user, note, "trashedNotes");
  };

  const unarchiveHandler = () => {
    deleteNote(user, note, "archivedNotes");
    addNote(user, note, "savedNotes");
  };

  const editHandler = () => {
    setDropdown(false);
    setShowModal(true);
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
            <span
              onClick={() => setDropdown((prev) => !prev)}
              className="mr-0p5 icon more-icon"
            >
              <MoreIcon size="1.6rem" />
            </span>
          )}
        </div>
        {dropdown && (
          <div className="dropdown-container">
            <li onClick={unarchiveHandler}>Unarchive note</li>
            <li onClick={editHandler}>Edit note</li>
            <li onClick={deleteHandler}>Delete note</li>
          </div>
        )}

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
          // noteContent={note.content}
          setShowModal={setShowModal}
          folderName="archivedNotes"
          type="edit"
        />
      )}
    </>
  );
};

export { ArchiveCard };
