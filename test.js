import { describe, it } from "node:test";
import assert from "node:assert/strict";
import isEs5Identifier from "./dist/index.js";

// https://github.com/estools/esutils/blob/a825f91fd1d1e3a9fff84227cb06c011d8a0b9e8/test/code.coffee#L137
describe("isEs5Identifier(Start)", () => {
  it("returns true if provided code can be a start of Identifier in ES5", () => {
    const characters = ["a", "Z", "_", "$", "ゆ"];
    for (const character of characters) {
      assert.equal(isEs5Identifier(character), true);
    }
  });

  it("returns false if provided code cannot be a start of Identifier in ES5", () => {
    for (let number = 0; number <= 9; number++) {
      assert.equal(isEs5Identifier(String(number)), false);
    }

    assert.equal(isEs5Identifier("+"), false);
    assert.equal(isEs5Identifier("-"), false);
  });
});

// https://github.com/estools/esutils/blob/a825f91fd1d1e3a9fff84227cb06c011d8a0b9e8/test/code.coffee#L147
describe("isEs5Identifier(Part)", () => {
  it("returns true if provided code can be a part of Identifier in ES5", () => {
    const characters = ["a", "Z", "_", "$", "ゆ"];
    for (const character of characters) {
      assert.equal(isEs5Identifier("$" + character), true);
    }

    for (let number = 0; number <= 9; number++) {
      assert.equal(isEs5Identifier("$" + String(number)), true);
    }
  });

  it("returns false if provided code cannot be a part of Identifier in ES5", () => {
    assert.equal(isEs5Identifier("$+"), false);
    assert.equal(isEs5Identifier("$-"), false);
  });
});

describe("isEs5Identifier", () => {
  assert.equal(isEs5Identifier(""), false);
});
