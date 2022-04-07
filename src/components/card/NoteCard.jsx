import React, { useState } from "react";
import "./card.css";
import ReactQuill from "react-quill";
import { ColorPalette, NoteModal } from "../../components";
import {
  PinFillIcon,
  PinIcon,
  ArchiveIcon,
  EditIcon,
  DeleteIcon,
} from "../../assets";
import {
  updatePin,
  addNote,
  deleteNote,
} from "../../services/firebaseServices";
import { useParams } from "react-router-dom";

const NoteCard = ({ note, user }) => {
  const { folder } = useParams();
  const folderName = folder ? folder.split("-").join(" ") : "savedNotes";
  const { title, content, noteColor, isPinned, priority, tags, createdAt } =
    note;
  const [show, setShow] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const deleteHandler = () => {
    deleteNote(user, note, folderName);
    addNote(user, note, "trashedNotes");
  };

  const archiveHandler = () => {
    deleteNote(user, note, folderName);
    addNote(user, note, "archivedNotes");
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
            <span className="icon mr-0p5 mt-0p5">
              {isPinned ? (
                <PinFillIcon
                  size="1.2rem"
                  onClick={() => updatePin(user, note, folderName)}
                />
              ) : (
                <PinIcon
                  size="1.2rem"
                  onClick={() => updatePin(user, note, folderName)}
                />
              )}
            </span>
          )}

          {show && (
            <EditIcon
              onClick={() => setShowModal(true)}
              size="1.5rem"
              className="mr-1 icon"
            />
          )}
        </div>

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
          <div className="card-priority px-0p5">{priority.name}</div>
        </div>

        <div className="card-footer flex-row p-1 pt-0p5">
          <span className="text-xs card-date">Created on: {createdAt}</span>
          <div className="flex-row-center">
            <ColorPalette
              user={user}
              note={note}
              requestFrom="card"
              folder={folderName}
            />
            <ArchiveIcon
              className="ml-1 icon"
              size="1.2rem"
              onClick={archiveHandler}
            />
            <DeleteIcon
              className="ml-1 icon"
              size="1.2rem"
              onClick={deleteHandler}
            />
          </div>
        </div>
      </div>
      {showModal && (
        <NoteModal
          user={user}
          noteState={note}
          setShowModal={setShowModal}
          folderName={folderName}
          type="edit"
        />
      )}
    </>
  );
};

export { NoteCard };
