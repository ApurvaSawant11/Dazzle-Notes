import React, { useState, useEffect } from "react";
import { db } from "../../config/firebase-config";
import { collection, onSnapshot } from "firebase/firestore";
import { useAuth } from "../../context/auth-context";
import { TrashCard } from "../../components";
import { deleteFromTrash } from "../../services/firebaseServices";

const Trash = () => {
  const [notes, setNotes] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    (async () => {
      onSnapshot(
        collection(db, "users", `${user.uid}`, "trashedNotes"),
        (snapshot) => {
          setNotes(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        }
      );
    })();
  }, [user]);

  const emptyTrashHandler = () => {
    notes.map((note) => {
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
        {notes.map((note) => {
          return <TrashCard key={note.id} note={note} user={user} />;
        })}
      </div>
    </div>
  );
};

export { Trash };
