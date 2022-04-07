import { useEffect } from "react";

const useDocumentTitle = (title) => {
  useEffect(() => {
    document.title = `Dazzle Notes | ${title}`;
  }, [title]);
};

export { useDocumentTitle };
