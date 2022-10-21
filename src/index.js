import { nonAsciiIdentifierStart, nonAsciiIdentifierPart } from "./regexps.js";

// Based on https://github.com/estools/esutils

const IDENTIFIER_START = Array.from(
  { length: 0x80 },
  (_, codePoint) =>
    (codePoint >= 0x61 && codePoint <= 0x7a) || // a..z
    (codePoint >= 0x41 && codePoint <= 0x5a) || // A..Z
    codePoint === 0x24 || // $ (dollar)
    codePoint === 0x5f // _ (underscore)
);

const IDENTIFIER_PART = Array.from(
  { length: 0x80 },
  (_, codePoint) =>
    (codePoint >= 0x61 && codePoint <= 0x7a) || // a..z
    (codePoint >= 0x41 && codePoint <= 0x5a) || // A..Z
    (codePoint >= 0x30 && codePoint <= 0x39) || // 0..9
    codePoint === 0x24 || // $ (dollar)
    codePoint === 0x5f // _ (underscore)
);

function isEs5IdentifierStart(codePoint) {
  return codePoint < 0x80
    ? IDENTIFIER_START[codePoint]
    : nonAsciiIdentifierStart.test(String.fromCodePoint(codePoint));
}

function isEs5IdentifierPart(codePoint) {
  return codePoint < 0x80
    ? IDENTIFIER_PART[codePoint]
    : nonAsciiIdentifierPart.test(String.fromCodePoint(codePoint));
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
