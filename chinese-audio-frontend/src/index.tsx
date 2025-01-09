import ReactDOM from "react-dom/client";
import { ToastContainer } from "react-toastify";

import "./index.css";
import App from "./App";

import "react-toastify/dist/ReactToastify.css";
import { UserProvider } from "./contexts/UserContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);

root.render(
  <UserProvider>
    <App />
    <ToastContainer
      position="bottom-left"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      toastStyle={{ backgroundColor: "#333", color: "#fff" }}
    />
  </UserProvider>,
);
