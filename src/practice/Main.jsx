import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "../index.css";
import App from "../iseng/App";

createRoot(document.getElementById("root"))
    .render (
        <StrictMode>
            <App/>
        </StrictMode>
    )