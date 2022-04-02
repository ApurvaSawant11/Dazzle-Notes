const filterByTags = (notesList, tags) => {
  const filterByTagSet = new Set(tags);
  if (filterByTagSet.size !== 0) {
    return notesList.filter((note) =>
      note.tags.some((tag) => filterByTagSet.has(tag))
    );
  }
  return notesList;
};

const sortData = (notesList, sortByPriority, sortByDate) => {
  switch (sortByPriority) {
    case "LOW_TO_HIGH":
      notesList = notesList.sort(
        (a, b) => parseFloat(a.priority.value) - parseFloat(b.priority.value)
      );
      break;
    case "HIGH_TO_LOW":
      notesList = notesList.sort(
        (a, b) => parseFloat(b.priority.value) - parseFloat(a.priority.value)
      );
      break;
    default:
      notesList = notesList;
  }

  switch (sortByDate) {
    case "LATEST":
      notesList = notesList.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      break;
    case "OLD":
      notesList = notesList.sort(
        (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
      );
      break;
    default:
      notesList = notesList;
  }
  return notesList;
};

export { filterByTags, sortData };
