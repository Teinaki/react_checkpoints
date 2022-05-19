import React from "react";
import TodoList from "./TodoList";
import { render, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import {screen} from "@testing-library/dom"
import userEvent from "@testing-library/user-event";

afterEach(cleanup)


it("renders todolist correctly", ()=> {
    render(<TodoList></TodoList>);

    const header = screen.getByRole("heading", {level: 3})
    expect(header.textContent).toBe("Todo List");

    const createTask = screen.getByRole("button")
    expect(createTask.textContent).toBe("Create Task");
});


it("renders modal correctly", ()=>{
    render(<TodoList></TodoList>);

    const createTask = screen.getByRole("button")

    userEvent.click(createTask)

    const modalHeader = screen.getByRole("heading", {level: 5})
    expect(modalHeader.textContent).toBe("Create Title");
})