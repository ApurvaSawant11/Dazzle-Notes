import React, { useEffect, useState } from "react";
import { NoteCard } from "../../components";
import { db } from "../../config/firebase-config";
import { collection, onSnapshot } from "firebase/firestore";
import { useAuth, useData } from "../../context";
import { useParams } from "react-router-dom";
import { NoteModal } from "../../components/modal/NoteModal";
import { initialNoteState } from "../../utils/initialNoteState";

const Folder = () => {
  const { user } = useAuth();
  const { tagsList } = useData();
  const { folder } = useParams();
  const [notesList, setNotesList] = useState();
  const [showModal, setShowModal] = useState(false);
  const folderName = folder.split("-").join(" ");
  useEffect(() => {
    onSnapshot(
      collection(db, "users", `${user.uid}`, `${folderName}`),
      (snapshot) => {
        setNotesList(
          snapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }))
        );
      }
    );
  }, [user]);

  return (
    <div className="flex-column-center notes-container">
      <div
        className="new-note-button note-editor icon"
        onClick={() => setShowModal(true)}
      >
        Add a new note...
      </div>
      {showModal && (
        <NoteModal
          user={user}
          tagsList={tagsList}
          setShowModal={setShowModal}
          noteState={initialNoteState}
          folderName={folderName}
          noteContent=""
        />
      )}
      {notesList &&
        notesList.map((note) => {
          return <NoteCard key={note.id} note={note} user={user} />;
        })}
    </div>
  );
};

export { Folder };
