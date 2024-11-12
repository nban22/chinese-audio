import AppLayout from "./components/AppLayout";
import AlbumList from "./components/Album/AlbumList";
import Playlist from "./components/Playlist/Playlist";
import styled, { createGlobalStyle } from "styled-components";
import { BrowserRouter, Outlet, Router, Routes, useNavigation } from "react-router-dom";

const GlobalStyle = createGlobalStyle`
  body {
    font-family: "Poppins", sans-serif;
  
  }
`;



function App() {
    const navigation = useNavigation();
    return (
        <div className="App">
            <GlobalStyle />
            <AppLayout>
              <div style={{filter: `${navigation.state==="loading" ? "brightness(10%)" : "brightness(1)"}`}}>
                <Outlet />
              </div>
            </AppLayout>
        </div>
    );
}

export default App;
