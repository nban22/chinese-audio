import ReactDOM from "react-dom/client";
import { ToastContainer } from "react-toastify";

import "./index.css";
import App from "./App";

import 'react-toastify/dist/ReactToastify.css';

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(
    <>
        <App />
        <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
        />
    </>
);
