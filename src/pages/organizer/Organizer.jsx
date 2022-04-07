import React, { useState } from "react";
import "./organizer.css";
import { NavLink } from "react-router-dom";
import { useAuth, useData } from "../../context";
import { useDocumentTitle } from "../../hooks";
import { addToFoldersList } from "../../services/firebaseServices";

const Organizer = () => {
  useDocumentTitle("Organizer");
  const { user } = useAuth();
  const { foldersList, tagsList } = useData();
  const [showInput, setShowInput] = useState(false);
  const [folderName, setFolderName] = useState("");

  const folderHandler = () => {
    addToFoldersList(user, folderName);
    setFolderName("");
  };

  return (
    <div className="flex-column-center notes-container pt-1">
      <div className="folder-input-container">
        {!showInput && (
          <span className="flex-row-center">
            <button
              className="button inverted-info"
              onClick={() => setShowInput(true)}
            >
              Add new folder
            </button>
          </span>
        )}
        {showInput && (
          <div className="flex-column-center">
            <input
              className="folder-input"
              value={folderName}
              placeholder="Enter folder name"
              onChange={(e) => setFolderName(e.target.value)}
            />
            <div className="mt-1">
              <button className="button primary mr-1" onClick={folderHandler}>
                Create Folder
              </button>
              <button
                className="button inverted-danger"
                onClick={() => {
                  setFolderName("");
                  setShowInput(false);
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
      <div className="flex-row-center wrap content-start mt-2p5">
        {foldersList.map((folder, index) => {
          return (
            <NavLink
              key={index}
              to={`/organizer/${folder.split(" ").join("-")}`}
              className="folder-container"
            >
              <div>{folder}</div>
            </NavLink>
          );
        })}
      </div>
    </div>
  );
};

export { Organizer };
