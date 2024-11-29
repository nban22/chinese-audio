import styled from 'styled-components';
import IconEdit from '../../../../../icons/IconEdit';

const StyledEditButton = styled.button`
    background-color: #333;
    border-radius: 50%;
    border: none;
    cursor: pointer;
    color: var(--primary-color, #00a88f);
    aspect-ratio: 1/1;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0 0 5px #fff;

    &:hover {
        background-color: #555;
    }
`;

interface EditButtonProps {

}

const EditButton: React.FC<EditButtonProps> = (props) => {
    return (
        <StyledEditButton>
            <IconEdit size={25} />
        </StyledEditButton>
    );
};

export default EditButton;