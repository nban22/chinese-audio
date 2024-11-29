import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import GlobalStyles from "./GlobalStyles";
import { ModalProvider } from "./contexts/ModalContext";
import "bootstrap/dist/css/bootstrap.min.css";
const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(
    <>
        <GlobalStyles />
        <App />
    </>
);
