import AppLayout from "./components/AppLayout";
import AlbumList from "./components/Album/AlbumList";

function App() {
    return (
        <div className="App">
            <AppLayout>
                <AlbumList />
                <AlbumList />
                <AlbumList />
                <AlbumList />
            </AppLayout>
        </div>
    );
}

export default App;
