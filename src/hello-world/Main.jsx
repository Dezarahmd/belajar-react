import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import HelloWorld from "./HelloWorld";
import "../index.css";
import Container from "./Container";
import TodoList from "../todo-list/TodoLIst";

createRoot(document.getElementById("root"))
    .render (
        <StrictMode>
            <Container>
                <HelloWorld/>
                <TodoList/>
            </Container>
        </StrictMode>
    )

    