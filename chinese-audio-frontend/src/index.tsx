import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AlbumList from "./components/Album/AlbumList";
import Playlist from "./components/Playlist/Playlist";
import HomePage from "./pages/HomePage";
import AlbumListDetailPage, { loader as abumListDetailLoader } from "./pages/AlbumListDetailPage";
import AlbumDetailPage from "./pages/AlbumDetailPage";
import AuthPage from "./pages/auth/AuthPage";
import LoginContainer from "./pages/auth/LoginContainer";
import SignupContainer from "./pages/auth/SignupContainer";

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
                element: <AlbumListDetailPage />,
                loader: abumListDetailLoader
            },
            {
                path: "albums/:id",
                element: <AlbumDetailPage />
            },

        ]
    },
    {
        index: false,
        element: <AuthPage />,
        children: [
            {
                path: "/login",
                element: <LoginContainer />
            }, {
                path: "/signup",
                element: <SignupContainer />
            }
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
