import React from "react";
import "./home.css";
import { HomeCard, NewNoteInput } from "../../components";
import { useAuth, useData } from "../../context";
import {
  filterByTags,
  sortData,
  searchNotes,
} from "../../utils/getFilteredData";
import { useDocumentTitle } from "../../hooks";

const Home = () => {
  useDocumentTitle("Home");
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
      <NewNoteInput user={user} tagsList={tagsList} />

      <div className="flex-column-center">
        <h6>Pinned</h6>
        {sortedNotes &&
          sortedNotes.map((note) => {
            if (note.isPinned) {
              return <HomeCard key={note.id} note={note} user={user} />;
            }
          })}

        <h6>Others</h6>
        {sortedNotes &&
          sortedNotes.map((note) => {
            if (!note.isPinned) {
              return <HomeCard key={note.id} note={note} user={user} />;
            }
          })}
      </div>
    </div>
  );
};

export { Home };
