import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { SearchBar } from "../components/SearchBar";

it("renders without crashing", () => {
  render(<SearchBar />);
});

//Default Selection
it("should correctly set default option", () => {
  render(<SearchBar />);
  expect(screen.getByRole("option", { name: "USD" }).selected).toBe(true);
});

//correct number of options
it("should display the correct number of options", () => {
  render(<SearchBar />);
  expect(screen.getAllByRole("option").length).toBe(4);
});
