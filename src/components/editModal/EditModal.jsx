import React, { useState, useRef, useEffect } from "react";
import "./editModal.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { updateNote } from "../../services/firebaseServices";
import { TagIcon } from "../../assets";
import { ColorPalette } from "../colorPalette/ColorPalette";
import { db } from "../../config/firebase-config";
import { collection, onSnapshot } from "firebase/firestore";
import { DropDown } from "../dropDown/DropDown";
import {
  EditorToolbar,
  modules,
  formats,
} from "../editorToolbar/EditorToolbar";

const EditModal = ({ openModal, note, user, noteType }) => {
  const [value, setValue] = useState(note.content);
  const editorRef = useRef();
  const [updatedNote, setUpdatedNote] = useState(note);
  const [dropdown, setDropdown] = useState("");
  const [tagsList, setTagsList] = useState([]);

  useEffect(() => {
    (async () => {
      onSnapshot(collection(db, "users", `${user.uid}`, "tags"), (snapshot) => {
        const list = snapshot.docs.map((doc) => doc.data());
        setTagsList(list[0].tagsList);
      });
    })();
  }, [user, tagsList]);

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

  return (
    <div className="home__container">
      {updatedNote && (
        <div
          className="note__editor"
          style={{ backgroundColor: updatedNote.noteColor }}
        >
          <div className="note__header flex-row-center">
            <div className="title__container">
              <input
                type="text"
                className="note__title"
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
              className="primary-text note__add pr-1"
              onClick={updateHandler}
            >
              UPDATE
            </span>

            <i
              className="fas fa-times pr-1 note__close"
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
                  onChange={(e) =>
                    setUpdatedNote({
                      ...updatedNote,
                      priority: e.target.value,
                    })
                  }
                >
                  <option value={null} hidden="">
                    Priority
                  </option>
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
                <TagIcon onClick={() => setDropdown("tags")} className="mr-1" />
                {dropdown === "tags" && (
                  <DropDown
                    list={tagsList}
                    type="checkbox"
                    setNote={setUpdatedNote}
                    setDropdown={setDropdown}
                  />
                )}
                <ColorPalette
                  user={user}
                  note={updatedNote}
                  setNote={setUpdatedNote}
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
