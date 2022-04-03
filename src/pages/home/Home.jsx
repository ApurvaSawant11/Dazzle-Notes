import React from "react";
import "./home.css";
import { HomeCard, NewNoteInput } from "../../components";
import { useAuth, useData } from "../../context";
import { filterByTags, sortData } from "../../utils/getFilteredData";

const Home = () => {
  const { user } = useAuth();
  const { savedNotes, tagsList, filterTags, sortByPriority, sortByDate } =
    useData();

  const filteredData = filterByTags([...savedNotes], filterTags);
  const sortedData = sortData([...filteredData], sortByPriority, sortByDate);

  return (
    <div className="home-container">
      <NewNoteInput user={user} tagsList={tagsList} />

      <div className="flex-column-center">
        <h6>Pinned</h6>
        {sortedData &&
          sortedData.map((note) => {
            if (note.isPinned) {
              return <HomeCard key={note.id} note={note} user={user} />;
            }
          })}

        <h6>Others</h6>
        {sortedData &&
          sortedData.map((note) => {
            if (!note.isPinned) {
              return <HomeCard key={note.id} note={note} user={user} />;
            }
          })}
      </div>
    </div>
  );
};

export { Home };
