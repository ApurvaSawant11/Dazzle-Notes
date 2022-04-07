import { db } from "../config/firebase-config";
import {
  updateDoc,
  deleteDoc,
  doc,
  addDoc,
  collection,
  arrayUnion,
} from "firebase/firestore";

const addNote = async (user, note, folder) => {
  await addDoc(collection(db, "users", `${user.uid}`, `${folder}`), note);
};

const deleteNote = async (user, note, folder) => {
  await deleteDoc(doc(db, "users", `${user.uid}`, `${folder}`, note.id));
};

// Update Note Pin

const updatePin = async (user, note, folder) => {
  const { isPinned } = note;
  await updateDoc(doc(db, "users", `${user.uid}`, `${folder}`, note.id), {
    isPinned: !isPinned,
  });
};

// Update Note Color

const updateColor = async (user, note, color, folder) => {
  await updateDoc(doc(db, "users", `${user.uid}`, `${folder}`, note.id), {
    noteColor: color,
  });
};

// Update Note

const updateNote = async (user, noteType, note) => {
  const { title, content, noteColor, isPinned, priority, tags } = note;
  await updateDoc(doc(db, "users", `${user.uid}`, `${noteType}`, note.id), {
    title,
    content,
    noteColor,
    isPinned,
    priority,
    tags,
  });
};

//  add to foldersList
const addToFoldersList = async (user, folderName) => {
  await updateDoc(doc(db, "users", `${user.uid}`, `sharedLists`, "folders"), {
    foldersList: arrayUnion(folderName),
  });
};

export {
  updatePin,
  updateNote,
  updateColor,
  addToFoldersList,
  addNote,
  deleteNote,
};
