import React, { useState } from "react";
import "./card.css";
import ReactQuill from "react-quill";
import { EditModal } from "../editModal/EditModal";
import { ColorPalette } from "../colorPalette/ColorPalette";
import { PinFillIcon, PinIcon, MoreIcon, ArchiveIcon } from "../../assets";
import {
  addToArchive,
  addToTrash,
  deleteFromSavedNotes,
  updatePin,
} from "../../services/firebaseServices";

const HomeCard = ({ note, user }) => {
  const { title, content, noteColor, isPinned, priority, tags, createdAt } =
    note;
  const createdDate = createdAt.split(" ")[0];
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
                  size="1.2rem"
                  onClick={() => updatePin(user, note)}
                />
              ) : (
                <PinIcon size="1.2rem" onClick={() => updatePin(user, note)} />
              )}
            </span>
          )}

          {show && (
            <span
              onClick={() => setDropdown((prev) => !prev)}
              className="mr-0p5 icon more__icon"
            >
              <MoreIcon size="1.6rem" />
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

        <div className="card-badges flex-row px-1 pt-0p5 text-xs">
          <div>
            {tags &&
              tags.map((item, index) => (
                <span className="card-tag px-0p5 mr-0p5" key={index}>
                  {item}
                </span>
              ))}
          </div>
          <div className="card-priority px-0p5">{priority}</div>
        </div>

        <div className="card-footer flex-row p-1 pt-0p5">
          <span className="text-xs card-date">Created on: {createdDate}</span>
          <div>
            <ColorPalette user={user} note={note} />
            <ArchiveIcon className="ml-1 icon" onClick={archiveHandler} />
          </div>
        </div>
      </div>
      {openModal.state && (
        <div className="modal__container flex-column-center">
          <EditModal
            openModal={setOpenModal}
            note={openModal.note}
            user={user}
            noteType="savedNotes"
          />
        </div>
      )}
    </>
  );
};

export { HomeCard };
