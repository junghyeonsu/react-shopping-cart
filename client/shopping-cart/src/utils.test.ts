import { isEmptyObject } from "./utils";

describe("IsEmptyObject", () => {
  it("should return true for empty object", () => {
    expect(isEmptyObject({})).toBe(true);
  });

  it("should return false for non-empty object", () => {
    expect(isEmptyObject({ a: 1 })).toBe(false);
  });
});
