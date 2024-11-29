import styled from 'styled-components';
import DeleteButton from './Buttons/DeleteButton';
import EditButton from './Buttons/EditButton';

const StyledAlbumActions = styled.div`
    display: flex;
    gap: 10px;
`;

interface AlbumActionsProps {
    id: string;
}

const AlbumActions: React.FC<AlbumActionsProps> = (props) => {
    return (
        <StyledAlbumActions>
            <EditButton />
            <DeleteButton />
        </StyledAlbumActions>
    );
};

export default AlbumActions;