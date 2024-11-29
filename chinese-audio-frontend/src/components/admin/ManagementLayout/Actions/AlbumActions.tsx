import styled from 'styled-components';
import DeleteButton from './Buttons/DeleteButton';
import EditButton from './Buttons/EditButton';
import { useState } from 'react';
import DeleteAlbumModal from '../../../Modal/DeleteAlbumModal';
import EditAlbumModal from '../../../Modal/EditAlbumModal';

const StyledAlbumActions = styled.div`
    display: flex;
    gap: 10px;
`;

interface AlbumActionsProps {
    id: string;
}

const AlbumActions: React.FC<AlbumActionsProps> = (props) => {
    const [showEdit, setShowEdit] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    return (
        <StyledAlbumActions>
            <EditButton onClick={() => setShowEdit(true)} />
            <DeleteButton onClick={() => setShowDelete(true)} />

            <EditAlbumModal show={showEdit} setShow={setShowEdit} />
            <DeleteAlbumModal show={showDelete} setShow={setShowDelete} />
        </StyledAlbumActions>
    );
};

export default AlbumActions;