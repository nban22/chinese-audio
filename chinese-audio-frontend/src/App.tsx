import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import AlbumListDetailPage, {
  albumListLoader,
} from "./pages/default/AlbumsContainer/AlbumsContainer";
import LoginContainer, {
  LoginContainerLoader,
} from "./pages/auth/Login/LoginContainer";
import SignupContainer, {
  SignupContainerLoader,
} from "./pages/auth/Signup/SignupContainer";
// import ErrorPage from "./pages/error/ErrorPage";
import HomePage, { albumListsLoader } from "./pages/default/Home/HomePage";
import PlaylistPage, {
  albumDetailLoader,
} from "./pages/default/AlbumDetail/AlbumDetail";
import AuthenticationLayout from "./layouts/AuthenticationLayout/AuthenticationLayout";
import DefaultLayout from "./layouts/DefaultLayout/DefaultLayout";
import AdminLayout from "./layouts/AdminLayout/AdminLayout";
import Dashboard from "./pages/admin/Dashboard/Dashboard";
import UserManagement, {
  UserManagementLoader,
} from "./pages/admin/UserManagement/UserManagement";
import AudioManagement from "./pages/admin/AudioManagement/AudioManagement";
import AlbumManagement from "./pages/admin/AlbumManagement/AlbumManagement";
import Settings from "./pages/admin/Setting/Settings";
import AccountProfile from "./pages/admin/AccountProfile/AccountProfile";
import Test from "./pages/Test";
import ErrorPage from "./pages/Error/ErrorPage";

const router = createBrowserRouter(
  [
    {
      path: "/test",
      element: <Test />,
    },
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
          loader: LoginContainerLoader,
        },
        {
          path: "/signup",
          element: <SignupContainer />,
          loader: SignupContainerLoader,
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
              loader: UserManagementLoader,
            },
            {
              path: "audio",
              element: <AudioManagement />,
            },
            {
              path: "album",
              element: <AlbumManagement />,
              children: [
                {
                  path: ":id/delete",
                  errorElement: <ErrorPage />,
                },
              ],
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
  },
);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
