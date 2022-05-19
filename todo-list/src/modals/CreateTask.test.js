import React from "react";
import CreateTask from "./CreateTask";

import { render, cleanup, fireEvent} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import {screen} from "@testing-library/dom"
import userEvent from "@testing-library/user-event";

afterEach(cleanup)

it("renders CreateTask without crashing", ()=> {
    const toggle = jest.fn();

    render(<CreateTask toggle={toggle} modal={true} />)
    screen.getByText("Create Title");
});

it("Creates a task correctly", ()=> {
    const toggle = jest.fn();
    const mockSave = jest.fn()
    
    render(<CreateTask toggle={toggle} modal={true} save={mockSave} />)

    userEvent.type(screen.getByRole('textbox', { name: 'Task Name' }), "Test Task")
    userEvent.type(screen.getByRole('textbox', { name: 'Description' }), "Test Description")

    fireEvent.click(screen.getByText('Create'))
    expect(mockSave.mock.calls.length).toEqual(1);
});