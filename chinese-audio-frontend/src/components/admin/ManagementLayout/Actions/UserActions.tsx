import styled from "styled-components";
import DeleteButton from "./Buttons/DeleteButton";
import EditButton from "./Buttons/EditButton";

const StyledUserActions = styled.div`
    display: flex;
    gap: 10px;
`;

interface UserActionsProps {
    id: string;
}

const UserActions: React.FC<UserActionsProps> = (props) => {
    return (
        <StyledUserActions>
            <EditButton />
            <DeleteButton />
        </StyledUserActions>
    );
};

export default UserActions;
