import DeleteButton from "./Buttons/DeleteButton";
import EditButton from "./Buttons/EditButton";
import ViewButton from "./Buttons/ViewButton";
import { useState } from "react";
import DeleteAlbumModal from "../../../Modal/DeleteAlbumModal";
import EditAlbumModal from "../../../Modal/EditAlbumModal";
import ViewAlbumModal from "../../../Modal/ViewAlbumModal"; // Import the new ViewAlbumModal

interface AlbumActionsProps {
  record: any;
  onSuccess?: () => void;
}

const AlbumActions: React.FC<AlbumActionsProps> = (props) => {
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showView, setShowView] = useState(false); // New state for view modal

  return (
    <div className="flex gap-2">
      <ViewButton onClick={() => setShowView(true)} /> {/* Updated to toggle view modal */}
      <EditButton onClick={() => setShowEdit(true)} />
      <DeleteButton onClick={() => setShowDelete(true)} />

      {showView && (
        <ViewAlbumModal
          onClose={() => setShowView(false)}
          album={props.record}
        />
      )}
      {showEdit && (
        <EditAlbumModal
          onClose={() => setShowEdit(false)}
          album={props.record}
          onSuccess={() => props.onSuccess?.() || (() => {})}
        />
      )}
      {showDelete && (
        <DeleteAlbumModal
          onSuccess={() => props.onSuccess?.() || (() => {})}
          onClose={() => setShowDelete(false)}
          album={props.record}
        />
      )}
    </div>
  );
};

export default AlbumActions;