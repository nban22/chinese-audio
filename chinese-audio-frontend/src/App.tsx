import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import AlbumListDetailPage, { albumListLoader } from "./pages/AlbumsContainer/AlbumsContainer";
import LoginContainer from "./pages/auth/Login/LoginContainer";
import SignupContainer from "./pages/auth/Signup/SignupContainer";
import ErrorPage from "./pages/Error/ErrorPage";
import HomePage, { albumListsLoader } from "./pages/Home/HomePage";
import PlaylistPage, { albumDetailLoader } from "./pages/AlbumDetail/AlbumDetail";
import AuthenticationLayout from "./layouts/AuthenticationLayout/AuthenticationLayout";
import DefaultLayout from "./layouts/DefaultLayout/DefaultLayout";
import AdminLayout from "./layouts/AdminLayout/AdminLayout";

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
      path: "/auth",
      children: [
        {
          index: true,
          element: <Navigate to="login" />,
        },
        {
          path: "login",
          element: <LoginContainer />,
        },
        {
          path: "signup",
          element: <SignupContainer />,
        },
      ],
    },
    {
      element: <AdminLayout />,
      path: "/admin",
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
    <RouterProvider router={router} />
  );
}

export default App;
