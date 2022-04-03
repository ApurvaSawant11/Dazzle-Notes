import { db } from "../config/firebase-config";
import {
  updateDoc,
  deleteDoc,
  doc,
  addDoc,
  collection,
} from "firebase/firestore";

// For Saved Notes List
const addToSavedNotes = async (user, note) => {
  await addDoc(collection(db, "users", `${user.uid}`, "savedNotes"), note);
};

const deleteFromSavedNotes = async (user, note) => {
  await deleteDoc(doc(db, "users", `${user.uid}`, "savedNotes", note.id));
};

// For Archived Notes List
const addToArchive = async (user, note) => {
  await addDoc(collection(db, "users", `${user.uid}`, "archivedNotes"), note);
};

const deleteFromArchive = async (user, note) => {
  await deleteDoc(doc(db, "users", `${user.uid}`, "archivedNotes", note.id));
};

// For Trash Notes List
const addToTrash = async (user, note) => {
  await addDoc(collection(db, "users", `${user.uid}`, "trashedNotes"), note);
};

const deleteFromTrash = async (user, note) => {
  await deleteDoc(doc(db, "users", `${user.uid}`, "trashedNotes", note.id));
};

// Update Note Pin

const updatePin = async (user, note) => {
  const { isPinned } = note;
  await updateDoc(doc(db, "users", `${user.uid}`, "savedNotes", note.id), {
    isPinned: !isPinned,
  });
};

// Update Note Color

const updateColor = async (user, note, color) => {
  await updateDoc(doc(db, "users", `${user.uid}`, "savedNotes", note.id), {
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

export {
  addToSavedNotes,
  deleteFromSavedNotes,
  addToArchive,
  deleteFromArchive,
  addToTrash,
  deleteFromTrash,
  updatePin,
  updateNote,
  updateColor,
};
