import React, { useState, useEffect } from "react";
import { db } from "../../config/firebase-config";
import { collection, onSnapshot } from "firebase/firestore";
import { useAuth } from "../../context/auth-context";
import { ArchiveCard } from "../../components";

const Archive = () => {
  const [notes, setNotes] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    (async () => {
      onSnapshot(
        collection(db, "users", `${user.uid}`, "archivedNotes"),
        (snapshot) => {
          setNotes(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        }
      );
    })();
  }, [user]);

  return (
    <div className="flex-column-center notes__container mt-2p5">
      {notes.map((note) => {
        return <ArchiveCard key={note.id} note={note} user={user} />;
      })}
    </div>
  );
};

export { Archive };
