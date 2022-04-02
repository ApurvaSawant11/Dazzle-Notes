import React from "react";
import { useAuth, useData } from "../../context";
import { ArchiveCard } from "../../components";

const Archive = () => {
  const { user } = useAuth();
  const { archivedNotes } = useData();

  return (
    <div className="flex-column-center notes__container mt-2p5">
      {archivedNotes.map((note) => {
        return <ArchiveCard key={note.id} note={note} user={user} />;
      })}
    </div>
  );
};

export { Archive };
