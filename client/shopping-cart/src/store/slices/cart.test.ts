import type { ProductType } from "../../types";
import type { State } from "./cart";
import { cartReducer } from "./cart";

const initialState: State = {
  products: [],
};

describe("cartSlice test", () => {
  it("initial", () => {
    // given
    const state = cartReducer(undefined, { type: "INIT" });

    // then
    expect(state).toEqual(initialState);
  });

  it("setProducts action test", () => {
    // given
    const initState: State = {
      products: [
        {
          id: 1,
          name: "product1",
          price: 1000,
          imageUrl: "https://via.placeholder.com/150",
          checked: true,
          quantity: 1,
        },
      ],
    };

    const products: ProductType[] = [
      {
        id: 1,
        name: "product1",
        price: 1000,
        imageUrl: "https://via.placeholder.com/150",
        checked: true,
        quantity: 1,
      },
      {
        id: 2,
        name: "product2",
        price: 2000,
        imageUrl: "https://via.placeholder.com/150",
        checked: true,
        quantity: 1,
      },
    ];

    // when
    const state = cartReducer(initState, {
      type: "cart/setProducts",
      payload: products,
    });

    // then
    expect(state).toEqual({
      products,
    });
  });

  it("addProduct action test", () => {
    // given
    const initState: State = {
      products: [
        {
          id: 1,
          name: "product1",
          price: 1000,
          imageUrl: "https://via.placeholder.com/150",
          checked: true,
          quantity: 1,
        },
      ],
    };

    const product: ProductType = {
      id: 1,
      name: "product1",
      price: 1000,
      imageUrl: "https://via.placeholder.com/150",
      checked: true,
      quantity: 1,
    };

    // when
    const state = cartReducer(initState, {
      type: "cart/addProduct",
      payload: product,
    });

    // then
    expect(state).toEqual({
      products: [...initState.products, product],
    });
  });

  describe("increaseQuantity action test", () => {
    it("should increase quantity by 1", () => {
      const id = 1;
      const quantity = 4;

      const initState: State = {
        products: [
          {
            id: 1,
            name: "product1",
            price: 1000,
            imageUrl: "https://via.placeholder.com/150",
            checked: true,
            quantity,
          },
        ],
      };

      // when
      const state = cartReducer(initState, {
        type: "cart/increaseQuantity",
        payload: { id },
      });

      // then
      expect(state).toEqual({
        products: [
          {
            ...initState.products[0],
            quantity: quantity + 1,
          },
        ],
      });
    });

    it("should not increase quantity if quantity is 20", () => {
      const id = 1;
      const quantity = 20;

      const initState: State = {
        products: [
          {
            id: 1,
            name: "product1",
            price: 1000,
            imageUrl: "https://via.placeholder.com/150",
            checked: true,
            quantity,
          },
        ],
      };

      // when
      const state = cartReducer(initState, {
        type: "cart/increaseQuantity",
        payload: { id },
      });

      // then
      expect(state).toEqual({
        products: [
          {
            ...initState.products[0],
            quantity,
          },
        ],
      });
    });
  });

  describe("decreaseQuantity action test", () => {
    it("should decrease quantity by 1", () => {
      // given
      const id = 1;
      const quantity = 4;

      const initState: State = {
        products: [
          {
            id,
            name: "product1",
            price: 1000,
            imageUrl: "https://via.placeholder.com/150",
            checked: true,
            quantity,
          },
        ],
      };

      // when
      const state = cartReducer(initState, {
        type: "cart/decreaseQuantity",
        payload: { id },
      });

      // then
      expect(state).toEqual({
        products: [
          {
            ...initState.products[0],
            quantity: quantity - 1,
          },
        ],
      });
    });

    it("should not decrease quantity if quantity is 1", () => {
      // given
      const id = 1;

      const initState: State = {
        products: [
          {
            id,
            name: "product1",
            price: 1000,
            imageUrl: "https://via.placeholder.com/150",
            checked: true,
            quantity: 1,
          },
        ],
      };

      // when
      const state = cartReducer(initState, {
        type: "cart/decreaseQuantity",
        payload: { id },
      });

      // then
      expect(state).toEqual({
        products: [
          {
            ...initState.products[0],
            quantity: 1,
          },
        ],
      });
    });
  });

  describe("changeQuantity action test", () => {
    it("should change quantity", () => {
      // given
      const id = 1;
      const quantity = 3;

      const initState: State = {
        products: [
          {
            id: 1,
            name: "product1",
            price: 1000,
            imageUrl: "https://via.placeholder.com/150",
            checked: true,
            quantity: 1,
          },
        ],
      };

      // when
      const state = cartReducer(initState, {
        type: "cart/changeQuantity",
        payload: { id, quantity },
      });

      // then
      expect(state).toEqual({
        products: [
          {
            ...initState.products[0],
            quantity,
          },
        ],
      });
    });

    it("should quantity change to 1 if quantity less than 1", () => {
      // given
      const id = 1;
      const quantity = -1;

      const initState: State = {
        products: [
          {
            id: 1,
            name: "product1",
            price: 1000,
            imageUrl: "https://via.placeholder.com/150",
            checked: true,
            quantity: 1,
          },
        ],
      };

      // when
      const state = cartReducer(initState, {
        type: "cart/changeQuantity",
        payload: { id, quantity },
      });

      // then
      expect(state).toEqual({
        products: [
          {
            ...initState.products[0],
            quantity: 1,
          },
        ],
      });
    });

    it("should quantity change to 20 if quantity greater than 20", () => {
      // given
      const id = 1;
      const quantity = 23;

      const initState: State = {
        products: [
          {
            id: 1,
            name: "product1",
            price: 1000,
            imageUrl: "https://via.placeholder.com/150",
            checked: true,
            quantity,
          },
        ],
      };

      // when
      const state = cartReducer(initState, {
        type: "cart/changeQuantity",
        payload: { id, quantity },
      });

      // then
      expect(state).toEqual({
        products: [
          {
            ...initState.products[0],
            quantity: 20,
          },
        ],
      });
    });
  });

  it("toggleProduct action test", () => {
    // given
    const id = 1;

    const initState: State = {
      products: [
        {
          id: 1,
          name: "product1",
          price: 1000,
          imageUrl: "https://via.placeholder.com/150",
          checked: true,
          quantity: 1,
        },
      ],
    };

    // when
    const state = cartReducer(initState, {
      type: "cart/toggleProduct",
      payload: { id },
    });

    // then
    expect(state).toEqual({
      products: [
        {
          ...initState.products[0],
          checked: false,
        },
      ],
    });
  });

  describe("toggleAllProducts action test", () => {
    it("should false when unchecked all check button", () => {
      // given
      const checked = false;

      const initState: State = {
        products: [
          {
            id: 1,
            name: "product1",
            price: 1000,
            imageUrl: "https://via.placeholder.com/150",
            checked: true,
            quantity: 1,
          },
          {
            id: 2,
            name: "product1",
            price: 1000,
            imageUrl: "https://via.placeholder.com/150",
            checked: true,
            quantity: 1,
          },
          {
            id: 3,
            name: "product1",
            price: 1000,
            imageUrl: "https://via.placeholder.com/150",
            checked: false,
            quantity: 1,
          },
        ],
      };

      // when
      const state = cartReducer(initState, {
        type: "cart/toggleAllProducts",
        payload: checked,
      });

      // then
      state.products.forEach((product) => {
        expect(product.checked).toEqual(checked);
      });
    });

    it("should true when unchecked all check button", () => {
      // given
      const checked = true;

      const initState: State = {
        products: [
          {
            id: 1,
            name: "product1",
            price: 1000,
            imageUrl: "https://via.placeholder.com/150",
            checked: true,
            quantity: 1,
          },
          {
            id: 2,
            name: "product1",
            price: 1000,
            imageUrl: "https://via.placeholder.com/150",
            checked: true,
            quantity: 1,
          },
          {
            id: 3,
            name: "product1",
            price: 1000,
            imageUrl: "https://via.placeholder.com/150",
            checked: false,
            quantity: 1,
          },
        ],
      };

      // when
      const state = cartReducer(initState, {
        type: "cart/toggleAllProducts",
        payload: checked,
      });

      // then
      state.products.forEach((product) => {
        expect(product.checked).toEqual(checked);
      });
    });
  });

  it("deleteCheckedProducts action test", () => {
    // given
    const initState: State = {
      products: [
        {
          id: 1,
          name: "product1",
          price: 1000,
          imageUrl: "https://via.placeholder.com/150",
          checked: true,
          quantity: 1,
        },
        {
          id: 2,
          name: "product1",
          price: 1000,
          imageUrl: "https://via.placeholder.com/150",
          checked: true,
          quantity: 1,
        },
        {
          id: 3,
          name: "product1",
          price: 1000,
          imageUrl: "https://via.placeholder.com/150",
          checked: false,
          quantity: 1,
        },
      ],
    };

    // when
    const state = cartReducer(initState, {
      type: "cart/deleteCheckedProducts",
    });

    // then
    expect(state).toEqual({
      products: [
        {
          id: 3,
          name: "product1",
          price: 1000,
          imageUrl: "https://via.placeholder.com/150",
          checked: false,
          quantity: 1,
        },
      ],
    });
  });

  it("deleteProduct action test", () => {
    // given
    const id = 1;

    const initState: State = {
      products: [
        {
          id: 1,
          name: "product1",
          price: 1000,
          imageUrl: "https://via.placeholder.com/150",
          checked: true,
          quantity: 1,
        },
        {
          id: 2,
          name: "product1",
          price: 1000,
          imageUrl: "https://via.placeholder.com/150",
          checked: true,
          quantity: 1,
        },
        {
          id: 3,
          name: "product1",
          price: 1000,
          imageUrl: "https://via.placeholder.com/150",
          checked: false,
          quantity: 1,
        },
      ],
    };

    // when
    const state = cartReducer(initState, {
      type: "cart/deleteProduct",
      payload: id,
    });

    // then
    expect(state).toEqual({
      products: [
        {
          id: 2,
          name: "product1",
          price: 1000,
          imageUrl: "https://via.placeholder.com/150",
          checked: true,
          quantity: 1,
        },
        {
          id: 3,
          name: "product1",
          price: 1000,
          imageUrl: "https://via.placeholder.com/150",
          checked: false,
          quantity: 1,
        },
      ],
    });
  });
});
