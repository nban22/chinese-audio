import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage, { loader as HomePageLoader } from "./pages/HomePage";
import AlbumListDetailPage, { loader as abumListDetailLoader } from "./pages/AlbumListDetailPage";
import AuthPage from "./pages/auth/AuthPage";
import LoginContainer from "./pages/auth/LoginContainer";
import SignupContainer from "./pages/auth/SignupContainer";
import PlaylistPage, { loader as playlistPageLoader } from "./pages/PlaylistPage";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

const router = createBrowserRouter(
    [
        {
            path: "/",
            element: <App />,
            children: [
                {
                    index: true,
                    element: <HomePage />,
                    loader: HomePageLoader,
                },
                {
                    path: "section/:id",
                    element: <AlbumListDetailPage />,
                    loader: abumListDetailLoader,
                },
                {
                    path: "playlist/:id",
                    element: <PlaylistPage />,
                    loader: playlistPageLoader,
                },
            ],
        },
        {
            index: false,
            element: <AuthPage />,
            children: [
                {
                    path: "/login",
                    element: <LoginContainer />,
                },
                {
                    path: "/signup",
                    element: <SignupContainer />,
                },
            ],
        },
    ],
    {
        future: {
            v7_relativeSplatPath: true,
            v7_fetcherPersist: true,
            v7_normalizeFormMethod: true,
            v7_partialHydration: true,
            v7_skipActionErrorRevalidation: true,
        },
    }
);

root.render(
    // <React.StrictMode>
    // <App />
    <RouterProvider
        router={router}
        future={{
            v7_startTransition: true,
        }}
    />
    // </React.StrictMode>
);
