import { nonAsciiIdentifierStart, nonAsciiIdentifierPart } from "./regexps.js";

// Based on https://github.com/estools/esutils

function isEs5IdentifierStart(codePoint) {
  return nonAsciiIdentifierStart.test(String.fromCodePoint(codePoint));
}

function isEs5IdentifierPart(codePoint) {
  return nonAsciiIdentifierPart.test(String.fromCodePoint(codePoint));
}

function isEs5IdentifierName(id) {
  if (id.length === 0) {
    return false;
  }

  if (!isEs5IdentifierStart(id.charCodeAt(0))) {
    return false;
  }

  for (let index = 1, length = id.length; index < length; ++index) {
    if (!isEs5IdentifierPart(id.charCodeAt(index))) {
      return false;
    }
  }
  return true;
}

export default isEs5IdentifierName;

export { isEs5IdentifierStart, isEs5IdentifierPart };
