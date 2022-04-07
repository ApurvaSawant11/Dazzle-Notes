import React, { useState, useEffect, useRef } from "react";
import "./noteModal.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { CloseIcon, PinIcon, PinFillIcon, TagIcon } from "../../assets";
import { addNote, updateNote } from "../../services/firebaseServices";
import { DropDown } from "../dropDown/DropDown";
import { ColorPalette } from "../colorPalette/ColorPalette";
import {
  EditorToolbar,
  modules,
  formats,
} from "../editorToolbar/EditorToolbar";
import { useData } from "../../context";

const NoteModal = ({ user, setShowModal, noteState, folderName, type }) => {
  const { tagsList } = useData();

  const [value, setValue] = useState(noteState.content);
  const editorRef = useRef();
  const [note, setNote] = useState(noteState);
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
      addNote(user, note, folderName);

      setNote(noteState);
      setValue("");
      setShowModal(false);
    } else {
      alert("Please add atleast title or note");
    }
  };

  const updateHandler = () => {
    updateNote(user, folderName, note);
    setShowModal(false);
  };

  const priorityHandler = (value) => {
    let name = "";
    if (value === "2") {
      name = "High";
    } else if (value === "1") {
      name = "Medium";
    } else name = "Low";
    setNote({
      ...note,
      priority: { name: name, value: value },
    });
  };

  return (
    <div className="modal-container flex-column-center">
      <div
        className="note-editor"
        style={{
          backgroundColor: note.noteColor,
        }}
      >
        <div className="note-header flex-row-center">
          <div className="title-container">
            <input
              type="text"
              className="note-title"
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

          <span
            className="icon mr-1"
            onClick={() => setNote({ ...note, isPinned: !note.isPinned })}
          >
            {note.isPinned ? <PinFillIcon /> : <PinIcon />}
          </span>

          {type === "edit" ? (
            <span
              className="primary-text note-add pr-1"
              onClick={updateHandler}
            >
              UPDATE
            </span>
          ) : (
            <span
              className="primary-text note-add pr-1"
              onClick={addNoteHandler}
            >
              ADD
            </span>
          )}
          <span className="editor-close-icon icon">
            <CloseIcon
              size="1.5rem"
              onClick={() => {
                setNote(noteState);
                setValue("");
                setShowModal(false);
              }}
            />
          </span>
        </div>
        <span>
          <ReactQuill
            theme="snow"
            value={value}
            onChange={setValue}
            placeholder={"Write something awesome..."}
            modules={modules}
            formats={formats}
            ref={editorRef}
          />

          <span className="editor-footer pr-1 flex-row-center">
            <EditorToolbar />
            <span>
              <TagIcon
                onClick={() => setDropdown(true)}
                className="mr-1 text-md"
              />
              {dropdown && (
                <DropDown
                  list={tagsList}
                  type="checkbox"
                  note={note}
                  setNote={setNote}
                  setDropdown={setDropdown}
                />
              )}
              <span className="mr-0p5 text-md">
                <ColorPalette user={user} note={note} setNote={setNote} />
              </span>
              <select
                className="priority-dropdown mr-1"
                onChange={(e) => priorityHandler(e.target.value)}
              >
                <option value={null} hidden="">
                  Priority
                </option>
                <option value="0">Low</option>
                <option value="1">Medium</option>
                <option value="2">High</option>
              </select>
            </span>
          </span>
        </span>
      </div>
    </div>
  );
};

export { NoteModal };
