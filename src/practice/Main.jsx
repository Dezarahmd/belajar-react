import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "../index.css";
import App from "./DAY 1/Comment.jsx";


createRoot(document.getElementById("root"))
    .render (
        <StrictMode>
            <App/>
        </StrictMode>
    )