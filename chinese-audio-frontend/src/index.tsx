import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage, { albumListsLoader } from "./pages/HomePage";
import AlbumListDetailPage, { albumListLoader } from "./pages/AlbumListDetailPage";
import AuthPage from "./pages/auth/AuthPage";
import LoginContainer from "./pages/auth/LoginContainer";
import SignupContainer from "./pages/auth/SignupContainer";
import PlaylistPage, { albumDetailLoader } from "./pages/PlaylistPage";
import ErrorPage from "./pages/ErrorPage";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

const router = createBrowserRouter(
    [
        {
            path: "/",
            element: <App />,
            errorElement: <ErrorPage />,
            children: [
                {
                    index: true,
                    element: <HomePage />,
                    loader: albumListsLoader,
                },
                {
                    path: "section/:id",
                    element: <AlbumListDetailPage />,
                    loader: albumListLoader,
                },
                {
                    path: "playlist/:id",
                    element: <PlaylistPage />,
                    loader: albumDetailLoader,
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
