import React from "react";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../config/firebase-config";
import { toast } from "react-toastify";

function imageHandler() {
  const input = document.createElement("input");
  input.setAttribute("type", "file");
  input.setAttribute("accept", "image/*");
  input.click();
  input.onchange = async function () {
    const file = input.files[0];

    if (!file) return;
    const storageRef = ref(storage, `files/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    toast.info("Upload in progress");
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
      },
      (error) => console.log(error),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          const range = this.quill.getSelection();
          this.quill.insertEmbed(range.index + 1, "image", `${downloadURL}`);
        });
      }
    );
  }.bind(this);
}

const modules = {
  toolbar: {
    container: "#toolbar",
    handlers: {
      image: imageHandler,
    },
  },
};

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "align",
  "strike",
  "blockquote",
  "background",
  "list",
  "bullet",
  "link",
  "color",
  "image",
  "code-block",
];

const EditorToolbar = () => (
  <div id="toolbar">
    <span className="ql-formats">
      <select className="ql-header" defaultValue="3">
        <option value="1">Heading</option>
        <option value="2">Subheading</option>
        <option value="3">Normal</option>
      </select>
    </span>
    <span className="ql-formats">
      <button className="ql-bold" />
      <button className="ql-italic" />
      <button className="ql-underline" />
      <button className="ql-strike" />
    </span>
    <span className="ql-formats">
      <button className="ql-list" value="ordered" />
      <button className="ql-list" value="bullet" />
    </span>
    <span className="ql-formats">
      <button className="ql-blockquote" />
    </span>
    <span className="ql-formats">
      <button className="ql-link" />
      <button className="ql-image" />
    </span>
    <span className="ql-formats">
      <button className="ql-code-block" />
    </span>
  </div>
);

export { EditorToolbar, modules, formats };
