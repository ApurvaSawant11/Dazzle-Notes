import React, { useState } from "react";
import "./card.css";
import ReactQuill from "react-quill";
import { EditModal } from "../editModal/EditModal";
import { PinFillIcon, PinIcon, MoreIcon } from "../../assets";
import {
  addToArchive,
  addToTrash,
  deleteFromSavedNotes,
  updatePin,
} from "../../services/firebaseServices";

const HomeCard = ({ note, user }) => {
  const { title, content, noteColor, isPinned } = note;

  const [show, setShow] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const [openModal, setOpenModal] = useState({ state: false, note: {} });

  const editHandler = () => {
    setDropdown(false);
    setOpenModal({ state: true, note: note });
  };

  const deleteHandler = () => {
    setDropdown(false);
    deleteFromSavedNotes(user, note);
    addToTrash(user, note);
  };

  const archiveHandler = () => {
    setDropdown(false);
    deleteFromSavedNotes(user, note);
    addToArchive(user, note);
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
            <span className="icon pin__icon">
              {isPinned ? (
                <PinFillIcon
                  size="18px"
                  onClick={() => updatePin(user, note)}
                />
              ) : (
                <PinIcon size="18px" onClick={() => updatePin(user, note)} />
              )}
            </span>
          )}

          {show && (
            <span
              onClick={() => setDropdown((prev) => !prev)}
              className="mr-0p5 icon more__icon"
            >
              <MoreIcon size="24px" />
            </span>
          )}
        </div>
        {dropdown && (
          <div className="dropdown__container">
            <li onClick={deleteHandler}>Delete note</li>
            <li onClick={editHandler}>Edit note</li>
            <li>Add tag</li>
            <li onClick={archiveHandler}>Archive note</li>
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
          noteType="savedNotes"
        />
      )}
    </>
  );
};

export { HomeCard };
