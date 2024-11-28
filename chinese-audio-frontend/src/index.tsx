import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { createGlobalStyle } from "styled-components";
const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

const GlobalStyle = createGlobalStyle`
  body {
    font-family: "Poppins", sans-serif;
  }
`;

root.render(
  // <React.StrictMode>
  <>
  <GlobalStyle />
  <App />
  </>
  // </React.StrictMode>
);
