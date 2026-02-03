import { describe, it, expect } from "vitest";
import cartReducer, {
  addToCart,
  removeFromCart,
  clearCart,
  setQty,
} from "./cartSlice";

const productA = { id: 1, title: "Burger", price: 10 };
const productB = { id: 2, title: "Pizza", price: 7.5 };

describe("cartSlice", () => {
  it("adds product to cart with qty=1 by default", () => {
    const state = cartReducer(
      undefined,
      addToCart({ product: productA })
    );

    expect(state.items).toHaveLength(1);
    expect(state.items[0].id).toBe(1);
    expect(state.items[0].qty).toBe(1);
  });

  it("adds product with custom qty", () => {
    const state = cartReducer(
      undefined,
      addToCart({ product: productA, qty: 3 })
    );

    expect(state.items[0].qty).toBe(3);
  });

  it("increments qty when adding same product again", () => {
    let state = cartReducer(undefined, addToCart({ product: productA }));
    state = cartReducer(state, addToCart({ product: productA, qty: 2 }));

    expect(state.items).toHaveLength(1);
    expect(state.items[0].qty).toBe(3);
  });

  it("does not allow qty < 1 when adding (qty is clamped to 1)", () => {
    const state = cartReducer(
      undefined,
      addToCart({ product: productA, qty: 0 })
    );

    expect(state.items[0].qty).toBe(1);
  });

  it("removes product from cart by id", () => {
    let state = cartReducer(undefined, addToCart({ product: productA }));
    state = cartReducer(state, addToCart({ product: productB }));
    state = cartReducer(state, removeFromCart(1));

    expect(state.items.map((i) => i.id)).toEqual([2]);
  });

  it("clears cart", () => {
    let state = cartReducer(undefined, addToCart({ product: productA }));
    state = cartReducer(state, clearCart());

    expect(state.items).toHaveLength(0);
  });

  it("sets qty for existing item (clamped to min 1)", () => {
    let state = cartReducer(undefined, addToCart({ product: productA }));
    state = cartReducer(state, setQty({ id: 1, qty: 5 }));

    expect(state.items[0].qty).toBe(5);

    state = cartReducer(state, setQty({ id: 1, qty: 0 }));
    expect(state.items[0].qty).toBe(1);
  });

  it("setQty does nothing if item not found", () => {
    const state = cartReducer(undefined, setQty({ id: 999, qty: 10 }));
    expect(state.items).toHaveLength(0);
  });
});
