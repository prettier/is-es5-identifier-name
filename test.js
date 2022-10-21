import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { isEs5IdentifierStart, isEs5IdentifierPart } from "./dist/index.js";

// https://github.com/estools/esutils/blob/a825f91fd1d1e3a9fff84227cb06c011d8a0b9e8/test/code.coffee#L137
describe("isEs5IdentifierStart", () => {
  it("returns true if provided code can be a start of Identifier in ES5", () => {
    const characters = ["a", "_", "$", "ゆ"];
    for (const character of characters) {
      const codePoint = character.charCodeAt(0);
      assert.equal(isEs5IdentifierStart(codePoint), true);
    }
  });

  it("returns false if provided code cannot be a start of Identifier in ES5", () => {
    for (let number = 0; number <= 9; number++) {
      const codePoint = String(number).charCodeAt(0);
      assert.equal(isEs5IdentifierStart(codePoint), false);
    }
  });
});

// https://github.com/estools/esutils/blob/a825f91fd1d1e3a9fff84227cb06c011d8a0b9e8/test/code.coffee#L147
describe("isEs5IdentifierPart", () => {
  it("returns true if provided code can be a part of Identifier in ES5", () => {
    const characters = ["a", "_", "$", "ゆ"];
    for (const character of characters) {
      const codePoint = character.charCodeAt(0);
      assert.equal(isEs5IdentifierPart(codePoint), true);
    }

    for (let number = 0; number <= 9; number++) {
      const codePoint = String(number).charCodeAt(0);
      assert.equal(isEs5IdentifierPart(codePoint), true);
    }
  });

  it("returns false if provided code cannot be a part of Identifier in ES5", () => {
    assert.equal(isEs5IdentifierPart("+".charCodeAt(0)), false);
    assert.equal(isEs5IdentifierPart("-".charCodeAt(0)), false);
  });
});
