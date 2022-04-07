import React from "react";
import { TrashCard } from "../../components";
import { deleteNote } from "../../services/firebaseServices";
import { useAuth, useData } from "../../context";
import { useDocumentTitle } from "../../hooks";

const Trash = () => {
  useDocumentTitle("Trash");
  const { user } = useAuth();
  const { trashedNotes } = useData();

  const emptyTrashHandler = () => {
    trashedNotes.map((note) => {
      try {
        deleteNote(user, note, "trashedNotes");
      } catch (error) {
        console.error("Error while deleting trash", error);
      }
    });
  };

  return (
    <div className="flex-column-center notes-container mt-2p5">
      <i>
        Notes in Trash will be deleted after 30 days.{" "}
        <span className="button inverted-info" onClick={emptyTrashHandler}>
          Empty Trash
        </span>
      </i>
      <div className="flex-column-center notes-container mt-2p5">
        {trashedNotes.map((note) => {
          return <TrashCard key={note.id} note={note} user={user} />;
        })}
      </div>
    </div>
  );
};

export { Trash };
