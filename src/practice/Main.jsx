import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "../index.css";
import App from "./SIDE QUEST/App.jsx"

createRoot(document.getElementById("root"))
    .render (
        <StrictMode>
            <App/>
        </StrictMode>
    )