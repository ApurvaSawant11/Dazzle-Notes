import { getCurrentDate } from "./getCurrentDate";

export const initialNoteState = {
  title: "",
  content: "",
  noteColor: "#FFFFFF",
  isPinned: false,
  priority: { name: "Low", value: "0" },
  tags: [],
  createdAt: getCurrentDate(),
};
