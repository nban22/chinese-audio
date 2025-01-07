import styled from 'styled-components';
import DataTable from '../../../components/admin/ManagementLayout/DataTable';
import IconPlusCircle from '../../../icons/IconPlusCircle';

const StyledManagementLayout = styled.div`
    
`;

const TitleContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
`

const Title = styled.h1`
    margin: 0;
    padding: 5px;
`

const AddItemButton = styled.button`
    padding: 10px;
    border-radius: 5px;
    background-color: var(--primary-color, #00a88f);
    color: white;
    border: none;
    cursor: pointer;
    transition: all 100ms ease-in-out;
    display: flex;
    align-items: center;
    gap: 7px;
    font-size: 1rem;

    &:hover {
        filter: brightness(1.1);
    }
`

interface ManagementLayoutProps {
    title: string;
    columnNames: string[];
    data: any;
    onAddItem?: () => void;
    Actions?: React.FC<{record: any}>;
}

const ManagementLayout: React.FC<ManagementLayoutProps> = (props) => {
    return (
        <StyledManagementLayout>
            <TitleContainer>
                <Title>{props.title}</Title>
                {props.onAddItem && <AddItemButton onClick={props.onAddItem}><IconPlusCircle size={20}/> Add Item</AddItemButton>}
            </TitleContainer>
            <DataTable columns={props.columnNames} data={props.data} Actions={props.Actions} />
        </StyledManagementLayout>
    );
};

export default ManagementLayout;