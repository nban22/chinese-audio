import styled from 'styled-components';
import IconDelete from '../../../../../icons/IconDelete';

const StyledDeleteButton = styled.button`
    background-color: #333;
    border-radius: 50%;
    border: none;
    cursor: pointer;
    color: crimson  ;
    aspect-ratio: 1/1;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0 0 5px #fff;

    &:hover {
        background-color: #555;
    }
    
`;

interface DeleteButtonProps {
    
}

const DeleteButton: React.FC<DeleteButtonProps> = (props) => {
    return (
        <StyledDeleteButton>
            <IconDelete size={25} />
        </StyledDeleteButton>
    );
};

export default DeleteButton;