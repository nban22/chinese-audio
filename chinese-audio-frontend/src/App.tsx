import AppLayout from "./components/AppLayout";
import AlbumList from "./components/Album/AlbumList";
import Playlist from "./components/Playlist/Playlist";
import { createGlobalStyle } from "styled-components";
import { BrowserRouter, Outlet, Router, Routes } from "react-router-dom";

const GlobalStyle = createGlobalStyle`
  body {
    font-family: "Poppins", sans-serif;
  }
`;

function App() {
    return (
        <div className="App">
            <GlobalStyle />
            <AppLayout>
              <Outlet />
            </AppLayout>
        </div>
    );
}

export default App;
