import React from "react";
import Card from "./Card";

import { render, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import {screen} from "@testing-library/dom"
import userEvent from "@testing-library/user-event";

afterEach(cleanup)

it("renders todo card without crashing", ()=> {
    const obj = {
        "Name": "Test Task",
        "Description" : "Test Description"
    }

    render(<Card taskObj={obj} />)

    const cardHeader = screen.getByText("Test Task")
    expect(cardHeader).toBeInTheDocument();
});

it("renders todo edit card", ()=> {
    const obj = {
        "Name": "Test Task",
        "Description" : "Test Description"
    }

    render(<Card taskObj={obj} />)

    const editTask = screen.getByTestId('edit')
    userEvent.click(editTask)
    const editHeader = screen.getByRole("heading", {level: 5})
    expect(editHeader.textContent).toBe("Update Task");
});

it("deletes task card", ()=> {
    const obj = {
        "Name": "Test Task",
        "Description" : "Test Description"
    }
    const mockDelete = jest.fn();

    render(<Card taskObj={obj} deleteTask={mockDelete}/>)

    const deleteTask = screen.getByTestId('delete')
    userEvent.click(deleteTask)
    expect(mockDelete.mock.calls.length).toEqual(1);
});