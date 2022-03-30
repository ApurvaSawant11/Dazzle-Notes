import React, { useState, useEffect } from "react";
import "./home.css";
import { HomeCard, NewNoteInput } from "../../components";
import { db } from "../../config/firebase-config";
import { collection, onSnapshot } from "firebase/firestore";
import { useAuth } from "../../context/auth-context";

const Home = () => {
  const [notes, setNotes] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    (async () => {
      onSnapshot(
        collection(db, "users", `${user.uid}`, "savedNotes"),
        (snapshot) => {
          setNotes(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        }
      );
    })();
  }, [user]);

  return (
    <div className="home__container">
      <NewNoteInput user={user} />

      <div className="flex-column-center">
        <h6>Pinned</h6>
        {notes.map((note) => {
          if (note.isPinned) {
            return <HomeCard key={note.id} note={note} user={user} />;
          } else {
            return <></>;
          }
        })}

        <h6>Others</h6>
        {notes.map((note) => {
          if (!note.isPinned) {
            return <HomeCard key={note.id} note={note} user={user} />;
          } else {
            return <></>;
          }
        })}
      </div>
    </div>
  );
};

export { Home };
