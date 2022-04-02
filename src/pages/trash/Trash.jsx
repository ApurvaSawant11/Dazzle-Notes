import React from "react";
import { TrashCard } from "../../components";
import { deleteFromTrash } from "../../services/firebaseServices";
import { useAuth, useData } from "../../context";

const Trash = () => {
  const { user } = useAuth();
  const { trashedNotes } = useData();

  const emptyTrashHandler = () => {
    trashedNotes.map((note) => {
      try {
        deleteFromTrash(user, note);
      } catch (error) {
        console.error("Error while deleting trash", error);
      }
    });
  };

  return (
    <div className="flex-column-center notes__container mt-2p5">
      <i>
        Notes in Trash will be deleted after 30 days.{" "}
        <span className="button inverted-primary" onClick={emptyTrashHandler}>
          Empty Trash
        </span>
      </i>
      <div className="flex-column-center notes__container mt-2p5">
        {trashedNotes.map((note) => {
          return <TrashCard key={note.id} note={note} user={user} />;
        })}
      </div>
    </div>
  );
};

export { Trash };
