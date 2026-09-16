import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import HelloWorld from "./HelloWorld";
import "../index.css";
import Container from "./Container";
import TodoList from "../todo-list/TodoLIst";
import Table from "../table/Table.jsx"
import AlertButton from "../button/AlertButton.jsx";
import MyButton from "../button/MyButton.jsx";
import Toolbar from "../button/ToolBar.jsx";
import SearchForm from "../form/SearchForm.jsx";

createRoot(document.getElementById("root"))
    .render (
        <StrictMode>
            <Container>
                <HelloWorld/>
                <TodoList/>
                <Table/>
                <AlertButton text="Click" message="AWWW"/>
                <MyButton text="Anjay" onSmash={() => alert("Shut up fuck up")}/>
                <Toolbar onClick={(e) => {
                    e.stopPropagation();
                    alert("You Click Toolbar")
                }}/>
                <SearchForm/>
            </Container>
        </StrictMode>
    )

    