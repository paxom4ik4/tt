import * as React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { Header } from "../common/Header/Header";
import { useCookies } from "react-cookie";

const [cookies, setCookie] = useCookies(["app_theme"]);

describe("Header", () => {
  it("header-should-render", () => {
    const { getByRole } = render(<Header setCookie={setCookie} />);
    const themeSwitcher = getByRole("button");
    expect(themeSwitcher).toBeInTheDocument();
  });
});
