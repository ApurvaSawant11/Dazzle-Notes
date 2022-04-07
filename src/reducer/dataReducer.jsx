const initialReducerData = {
  savedNotes: [],
  archivedNotes: [],
  trashedNOtes: [],
  sortByPriority: "",
  sortByDate: "",
  tagsList: [],
  foldersList: [],
  filterTags: [],
  search: "",
};

const dataReducer = (state, action) => {
  switch (action.type) {
    case "INITIALIZE_SAVED_NOTES":
      return {
        ...state,
        savedNotes: action.payload,
      };

    case "INITIALIZE_ARCHIVED_NOTES":
      return {
        ...state,
        archivedNotes: action.payload,
      };

    case "INITIALIZE_TRASHED_NOTES":
      return {
        ...state,
        trashedNotes: action.payload,
      };

    case "INITIALIZE_TAGS_LIST":
      return { ...state, tagsList: [...action.payload] };

    case "INITIALIZE_FOLDERS_LIST":
      return { ...state, foldersList: [...action.payload] };

    case "SORT_BY_PRIORITY":
      return {
        ...state,
        sortByPriority: action.payload,
      };

    case "SORT_BY_DATE":
      return {
        ...state,
        sortByDate: action.payload,
      };

    case "ADD_TO_TAGS":
      return {
        ...state,
        filterTags: [...state.filterTags, action.payload],
      };

    case "REMOVE_FROM_TAGS":
      return {
        ...state,
        filterTags: action.payload,
      };

    case "SEARCH":
      return {
        ...state,
        search: action.payload,
      };

    case "CLEAR_ALL_FILTERS":
      return {
        ...state,
        sortByPriority: "",
        sortByDate: "",
        search: "",
        filterTags: [],
      };

    default:
      throw new Error("Error in Data Reducer");
  }
};

export { initialReducerData, dataReducer };
