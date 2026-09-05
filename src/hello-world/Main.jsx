import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {HelloWorld, HelloWorldParagraph} from "./HelloWorld";

createRoot(document.getElementById("root"))
    .render (
        <StrictMode>
            <HelloWorld/>
            <HelloWorldParagraph/>
        </StrictMode>
    )

    