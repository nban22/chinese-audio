import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import AlbumListDetailPage, {
    albumListLoader,
} from "./pages/default/AlbumsContainer/AlbumsContainer";
import LoginContainer from "./pages/auth/Login/LoginContainer";
import SignupContainer from "./pages/auth/Signup/SignupContainer";
import ErrorPage from "./pages/error/ErrorPage";
import HomePage, { albumListsLoader } from "./pages/default/Home/HomePage";
import PlaylistPage, { albumDetailLoader } from "./pages/default/AlbumDetail/AlbumDetail";
import AuthenticationLayout from "./layouts/AuthenticationLayout/AuthenticationLayout";
import DefaultLayout from "./layouts/DefaultLayout/DefaultLayout";
import AdminLayout from "./layouts/AdminLayout/AdminLayout";
import Dashboard from "./pages/admin/Dashboard/Dashboard";
import UserManagement from "./pages/admin/UserManagement/UserManagement";
import AudioManagement, { audioLoader } from "./pages/admin/AudioManagement/AudioManagement";
import AlbumManagement, { albumLoader } from "./pages/admin/AlbumManagement/AlbumManagement";
import Settings from "./pages/admin/Setting/Settings";
import AccountProfile from "./pages/admin/AccountProfile/AccountProfile";
import { albumDeletionAction } from "./components/Modal/DeleteAlbumModal";

const router = createBrowserRouter(
    [
        {
            path: "/",
            element: <DefaultLayout />,
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
            element: <AuthenticationLayout />,
            children: [
                {
                    index: true,
                    element: <Navigate to="login" />,
                },
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
        {
            element: <AdminLayout />,
            path: "/admin",
            children: [
                {
                    index: true,
                    element: <Navigate to="dashboard" />,
                },
                {
                    path: "dashboard",
                    element: <Dashboard />,
                },
                {
                    path: "management",
                    children: [
                        {
                            index: true,
                            element: <Navigate to="user" />,
                        },
                        {
                            path: "user",
                            element: <UserManagement />,
                        },
                        {
                            path: "audio",
                            element: <AudioManagement />,
                            loader: audioLoader,
                        },
                        {
                            path: "album",
                            element: <AlbumManagement />,
                            loader: albumLoader,
                            children: [
                                {
                                    path: ":id/delete",
                                    action: albumDeletionAction,
                                    errorElement: <ErrorPage />,
                                }
                            ]
                        },
                    ],
                },
                {
                    path: "settings",
                    element: <Settings />,
                },
                {
                    path: "account-profile",
                    element: <AccountProfile />,
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

function App() {
    return (
        <>
            <RouterProvider router={router} />
        </>
    );
}

export default App;
