import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../modules/Store";
import Cart from "../components/Cart";

describe("Cart", () => {
  it("Cart State", () => {
    const cart = {
      id: 1,
      product: {
        id: 1,
        name: "[리뉴얼]젓가락(종이)-정성을 담아",
        price: 21800,
        imageUrl:
          "https://cdn-mart.baemin.com/sellergoods/main/5297837f-5ecd-4945-be2f-4a75854cd06e.jpg",
      },
      quantity: 1,
      checked: true,
    };

    render(
      <Provider store={store}>
        <Cart cart={cart} />
      </Provider>
    );

    const cartName = screen.getByText(cart.product.name);
    const cartPrice = screen.getByText(
      `${(cart.product.price * cart.quantity).toLocaleString()}원`
    );
    const cartImgAlt = screen.getByAltText(cart.product.name);
    const cartInputValue = screen.getByDisplayValue(cart.quantity);

    expect(cartName).toBeInTheDocument();
    expect(cartPrice).toBeInTheDocument();
    expect(cartImgAlt).toBeInTheDocument();
    expect(cartInputValue).toBeInTheDocument();
  });
});
