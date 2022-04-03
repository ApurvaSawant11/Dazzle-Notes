import React, { useState } from "react";
import "./card.css";
import ReactQuill from "react-quill";
import { EditModal } from "../editModal/EditModal";
import { MoreIcon } from "../../assets";
import {
  addToSavedNotes,
  addToTrash,
  deleteFromArchive,
} from "../../services/firebaseServices";

const ArchiveCard = ({ note, user }) => {
  const { title, content, noteColor } = note;
  const [show, setShow] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const [openModal, setOpenModal] = useState({ state: false, note: {} });

  const deleteHandler = () => {
    deleteFromArchive(user, note);
    addToTrash(user, note);
  };

  const unarchiveHandler = () => {
    deleteFromArchive(user, note);
    addToSavedNotes(user, note);
  };

  const editHandler = () => {
    setDropdown(false);
    setOpenModal({ state: true, note: note });
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
            <li>Add tag</li>
            <li onClick={deleteHandler}>Delete note</li>
          </div>
        )}

        <ReactQuill
          modules={{ toolbar: null }}
          value={content}
          readOnly={true}
        />
      </div>

      {openModal.state && (
        <EditModal
          openModal={setOpenModal}
          note={openModal.note}
          user={user}
          noteType="archivedNotes"
        />
      )}
    </>
  );
};

export { ArchiveCard };
