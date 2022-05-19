import React from "react";
import EditTask from './EditTask'

import { render, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import {screen} from "@testing-library/dom"

afterEach(cleanup)

it("renders todo edit card without crashing", ()=> {
    const toggle = jest.fn();
    const obj = {
        "Name": "Test Task",
        "Description" : "Test Description"
    }

    render(<EditTask taskObj={obj} toggle={toggle} modal={true} />)

    const testDescription = screen.getByText("Test Description")
    expect(testDescription).toBeInTheDocument();
});