import { nonAsciiIdentifierStart, nonAsciiIdentifierPart } from "./regexps.js";

// Based on https://github.com/estools/esutils

function isEs5IdentifierStart(character) {
  return nonAsciiIdentifierStart.test(character);
}

function isEs5IdentifierPart(character) {
  return nonAsciiIdentifierPart.test(character);
}

function isEs5IdentifierName(id) {
  if (id.length === 0) {
    return false;
  }

  if (!isEs5IdentifierStart(id.charAt(0))) {
    return false;
  }

  for (let index = 1, length = id.length; index < length; ++index) {
    if (!isEs5IdentifierPart(id.charAt(index))) {
      return false;
    }
  }
  return true;
}

export default isEs5IdentifierName;

export { isEs5IdentifierStart, isEs5IdentifierPart };
