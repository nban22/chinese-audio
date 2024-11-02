import styled from "styled-components";
import Sidebar from "./Sidebar/Sidebar";
import MusicPlayer from "./MusicPlayer/MusicPlayer";
import Header from "./Header/Header";

const StyledAppLayout = styled.div`
    height: calc(var(--vh, 1vh) * 100);
    background-color: #000000;
    display: grid;
    grid-template-rows: auto 1fr auto;
    grid-template-columns: auto 1fr 240px;
    color: #ffffff;
    column-gap: var(--panel-gap, 8px);

    &>*:nth-child(1) {
        grid-column: 1 / span 3;
    }
    &>*:nth-child(2) {
        overflow-y: auto;
    }
    &>*:nth-child(3) {
        grid-column: 2 / span 2;
        overflow-y: auto;
    }
    &>*:nth-child(4) {
        grid-column: 1 / span 3;
    }
`;


const MainContainer  = styled.main`
    background-color: #111;
    border-radius: 10px;
    padding-inline: 10px;
`;


interface AppLayoutProps {
    children?: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = (props) => {
    return (
        <StyledAppLayout>
            <Header />
            <Sidebar />
            <MainContainer>{props.children}</MainContainer>
            <MusicPlayer />
        </StyledAppLayout>
    );
};

export default AppLayout;
