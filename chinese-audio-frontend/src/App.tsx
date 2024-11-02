import styled from "styled-components";
import AlbumItem from "./components/Album/AlbumItem";
import AppLayout from "./components/AppLayout";
import AlbumList from "./components/Album/AlbumList";

const MainContainer = styled.main`
    background-color: #111;
    border-radius: 10px;
    padding-inline: 10px;
`;


function App() {
    return (
        <div className="App">
            <AppLayout>
                <MainContainer>
                  <AlbumList />
                  <AlbumList />
                  <AlbumList />
                  <AlbumList />
                </MainContainer>
            </AppLayout>
        </div>
    );
}

export default App;
