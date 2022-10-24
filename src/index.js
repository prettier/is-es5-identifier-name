import nonAsciiIdentifier from "./regexp.js";

const isEs5IdentifierName = (id) => nonAsciiIdentifier.test(id);
export default isEs5IdentifierName;
