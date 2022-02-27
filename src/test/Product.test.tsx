import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../modules/Store";
import Product from "../components/Product";

describe("Product", () => {
  it("Product State", () => {
    const product = {
      id: 1,
      name: "냉면용기(대)",
      price: 83700,
      imageUrl: "https://cdn-mart.baemin.com/goods/2/1556008840639m0.jpg",
    };

    render(
      <BrowserRouter>
        <Provider store={store}>
          <Product product={product} />
        </Provider>
      </BrowserRouter>
    );

    const productName = screen.getByText(product.name);
    const productPrice = screen.getByText(
      `${product.price.toLocaleString()}원`
    );
    const productImgAlt = screen.getByAltText(product.name);

    expect(productName).toBeInTheDocument();
    expect(productPrice).toBeInTheDocument();
    expect(productImgAlt).toBeInTheDocument();
  });
});
