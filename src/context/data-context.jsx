import { createContext, useContext, useEffect, useReducer } from "react";
import { db } from "../config/firebase-config";
import { collection, onSnapshot } from "firebase/firestore";
import { useAuth } from "./auth-context";
import { dataReducer, initialReducerData } from "../reducer/dataReducer";

const DataContext = createContext({
  state: initialReducerData,
  dispatch: () => {},
});

const DataProvider = ({ children }) => {
  const { user } = useAuth();

  const [state, dispatch] = useReducer(dataReducer, initialReducerData);

  useEffect(() => {
    if (user) {
      onSnapshot(
        collection(db, "users", `${user.uid}`, "savedNotes"),
        (snapshot) => {
          dispatch({
            type: "INITIALIZE_SAVED_NOTES",
            payload: snapshot.docs.map((doc) => ({
              ...doc.data(),
              id: doc.id,
            })),
          });
        }
      );

      onSnapshot(
        collection(db, "users", `${user.uid}`, "archivedNotes"),
        (snapshot) => {
          dispatch({
            type: "INITIALIZE_ARCHIVED_NOTES",
            payload: snapshot.docs.map((doc) => ({
              ...doc.data(),
              id: doc.id,
            })),
          });
        }
      );

      onSnapshot(
        collection(db, "users", `${user.uid}`, "trashedNotes"),
        (snapshot) => {
          dispatch({
            type: "INITIALIZE_TRASHED_NOTES",
            payload: snapshot.docs.map((doc) => ({
              ...doc.data(),
              id: doc.id,
            })),
          });
        }
      );

      onSnapshot(
        collection(db, "users", `${user.uid}`, "sharedLists"),
        (snapshot) => {
          const list = snapshot.docs.map((doc) => doc.data());
          if (list[0]) {
            dispatch({
              type: "INITIALIZE_TAGS_LIST",
              payload: list[1].tagsList,
            });
            dispatch({
              type: "INITIALIZE_FOLDERS_LIST",
              payload: list[0].foldersList,
            });
          }
        }
      );
    }
  }, [user]);

  const value = {
    savedNotes: state.savedNotes,
    archivedNotes: state.archivedNotes,
    trashedNotes: state.trashedNotes,
    tagsList: state.tagsList,
    foldersList: state.foldersList,
    sortByPriority: state.sortByPriority,
    sortByDate: state.sortByDate,
    filterTags: state.filterTags,
    search: state.search,
    dispatch,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

const useData = () => {
  return useContext(DataContext);
};

export { useData, DataProvider };
