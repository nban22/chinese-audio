import AppLayout from "./components/AppLayout";
import AlbumList from "./components/Album/AlbumList";
import Playlist from "./components/Playlist/Playlist";

function App() {
    return (
        <div className="App">
            <AppLayout>
                {/* <AlbumList />
                <AlbumList />
                <AlbumList />
                <AlbumList /> */}
                <Playlist />
            </AppLayout>
        </div>
    );
}

export default App;
