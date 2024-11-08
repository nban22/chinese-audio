import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AlbumList from "./components/Album/AlbumList";
import Playlist from "./components/Playlist/Playlist";
import HomePage from "./pages/HomePage";
import AlbumListDetailPage from "./pages/AlbumListDetailPage";
import AlbumDetailPage from "./pages/AlbumDetailPage";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                index: true,
                element: <HomePage />
            }, 
            {
                path: "albums-list/:id",
                element: <AlbumListDetailPage />
            },
            {
                path: "albums/:id",
                element: <AlbumDetailPage />
            },

        ]
    }
], {
    future: {
        v7_relativeSplatPath: true,
        v7_fetcherPersist: true,
        v7_normalizeFormMethod: true,
        v7_partialHydration: true,
        v7_skipActionErrorRevalidation: true,
    }
})

root.render(
    // <React.StrictMode>
        // <App />
    <RouterProvider router={router} future={{
        v7_startTransition: true,
      }}
    />
    // </React.StrictMode>
);
