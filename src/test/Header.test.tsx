import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Header from "../components/Header";

describe("Header", () => {
  it("render link ProductsList", () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );
    const linkElement = screen.getByText("CLEAN CODE SHOP");
    expect(linkElement).toBeInTheDocument();
  });
  it("render link Cart", () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );
    const linkElement = screen.getByText("장바구니");
    expect(linkElement).toBeInTheDocument();
  });
  it("render link OrderList", () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );
    const linkElement = screen.getByText("주문목록");
    expect(linkElement).toBeInTheDocument();
  });
});
