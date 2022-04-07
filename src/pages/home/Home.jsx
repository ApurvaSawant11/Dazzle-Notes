import React, { useState } from "react";
import "./home.css";
import { NoteCard, NoteModal } from "../../components";
import { useAuth, useData } from "../../context";
import {
  filterByTags,
  sortData,
  searchNotes,
} from "../../utils/getFilteredData";
import { useDocumentTitle } from "../../hooks";
import { initialNoteState } from "../../utils/initialNoteState";

const Home = () => {
  useDocumentTitle("Home");
  const [showModal, setShowModal] = useState(false);
  const { user } = useAuth();
  const {
    savedNotes,
    tagsList,
    filterTags,
    sortByPriority,
    sortByDate,
    search,
  } = useData();

  const searchedNotes = searchNotes([...savedNotes], search);
  const filteredNotes = filterByTags(searchedNotes, filterTags);
  const sortedNotes = sortData([...filteredNotes], sortByPriority, sortByDate);

  return (
    <div className="home-container">
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
          folderName="savedNotes"
          noteContent=""
        />
      )}

      <div className="flex-column-center">
        <h6>Pinned</h6>
        {sortedNotes &&
          sortedNotes.map((note) => {
            if (note.isPinned) {
              return <NoteCard key={note.id} note={note} user={user} />;
            }
          })}

        <h6>Others</h6>
        {sortedNotes &&
          sortedNotes.map((note) => {
            if (!note.isPinned) {
              return <NoteCard key={note.id} note={note} user={user} />;
            }
          })}
      </div>
    </div>
  );
};

export { Home };
