import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "../index.css";
import UserSettings from "./DAY 5/UserSettings.jsx";


createRoot(document.getElementById("root"))
    .render (
        <StrictMode>
            <UserSettings/>
        </StrictMode>
    )