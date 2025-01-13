import styled from "styled-components";
import DeleteButton from "./Buttons/DeleteButton";
import EditButton from "./Buttons/EditButton";
import DeleteUserModal from "../../../Modal/DeleteUserModal";
import EditUserModal from "../../../Modal/EditUserModal";
import { useState } from "react";

const StyledUserActions = styled.div`
  display: flex;
  gap: 10px;
`;

interface UserActionsProps {
  record: any;
}

const UserActions: React.FC<UserActionsProps> = (props) => {
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  return (
    <StyledUserActions>
      <EditButton onClick={() => setShowEdit(true)} />
      <DeleteButton onClick={() => setShowDelete(true)} />

      {showEdit && <EditUserModal show={showEdit} setShow={setShowEdit} />}
      {showDelete && (
        <DeleteUserModal show={showDelete} setShow={setShowDelete} />
      )}
    </StyledUserActions>
  );
};

export default UserActions;
