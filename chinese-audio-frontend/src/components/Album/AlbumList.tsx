import styled from 'styled-components';
import AlbumItem from './AlbumItem';
import ListContainer from './ListContainer';

const StyledAlbumList = styled.div`
    
`;

const ListHeaderContainer = styled.div`
    display: flex;
    justify-content: space-between;
`

const AlbumTitle = styled.h2`
    margin-block-end: 10px;
    margin-inline-start: 10px;
    display: inline-block;
    &:hover {
        text-decoration: underline;
    }
`

const ShowAllButton = styled.button`
    background-color: transparent;
    border: none;
    color: #fff;
    font-size: 0.9rem;
    align-self: flex-end;
    margin-block-end: 10px;
    font-weight: bold;
    &:hover {
        text-decoration: underline;
    }

`



interface AlbumListProps {
    
}

const AlbumList: React.FC<AlbumListProps> = (props) => {

    return (
        <StyledAlbumList>

            <ListHeaderContainer>
                <AlbumTitle>
                    Made for Nguyễn Bá An
                </AlbumTitle>
                <ShowAllButton>
                    Show all
                </ShowAllButton>
            </ListHeaderContainer>
            <ListContainer />
        </StyledAlbumList>
    );
};

export default AlbumList;