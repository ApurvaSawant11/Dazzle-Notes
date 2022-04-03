import React, { useState, useRef, useEffect } from "react";
import "./editModal.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { updateNote } from "../../services/firebaseServices";
import { TagIcon } from "../../assets";
import { ColorPalette } from "../colorPalette/ColorPalette";
import { DropDown } from "../dropDown/DropDown";
import {
  EditorToolbar,
  modules,
  formats,
} from "../editorToolbar/EditorToolbar";
import { useData } from "../../context";

const EditModal = ({ openModal, note, user, noteType }) => {
  const [value, setValue] = useState(note.content);
  const editorRef = useRef();
  const [updatedNote, setUpdatedNote] = useState(note);
  const [dropdown, setDropdown] = useState(false);
  const { tagsList } = useData();

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

  const priorityHandler = (value) => {
    let name = "";
    if (value === "2") {
      name = "High";
    } else if (value === "1") {
      name = "Medium";
    } else name = "Low";
    setUpdatedNote({
      ...note,
      priority: { name: name, value: value },
    });
  };
  return (
    <div className="modal-container flex-column-center">
      {updatedNote && (
        <div
          className="note-editor"
          style={{ backgroundColor: updatedNote.noteColor }}
        >
          <div className="note-header flex-row-center">
            <div className="title-container">
              <input
                type="text"
                className="note-title"
                placeholder="Title"
                value={updatedNote.title}
                onChange={(e) =>
                  setUpdatedNote({
                    ...updatedNote,
                    title: e.target.value,
                  })
                }
              />
            </div>

            <span
              className="icon mr-1"
              onClick={() =>
                setUpdatedNote({
                  ...updatedNote,
                  isPinned: !updatedNote.isPinned,
                })
              }
            ></span>

            <span
              className="primary-text note-add pr-1"
              onClick={updateHandler}
            >
              UPDATE
            </span>

            <i
              className="fas fa-times pr-1 note-close"
              onClick={() => openModal({ state: false })}
            ></i>
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

            <span className="editor-footer pr-1 flex-row">
              <EditorToolbar />
              <span>
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
                <TagIcon
                  onClick={() => setDropdown(!dropdown)}
                  className="mr-1"
                />
                {dropdown && (
                  <DropDown
                    list={tagsList}
                    type="checkbox"
                    note={updatedNote}
                    setNote={setUpdatedNote}
                    setDropdown={setDropdown}
                  />
                )}
                <ColorPalette
                  user={user}
                  note={updatedNote}
                  setNote={setUpdatedNote}
                  requestFrom="editModal"
                />
              </span>
            </span>
          </span>
        </div>
      )}
    </div>
  );
};

export { EditModal };
