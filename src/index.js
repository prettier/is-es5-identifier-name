import identifierRegexp from "./regexp.js";

const isEs5IdentifierName = (id) => identifierRegexp.test(id);
export default isEs5IdentifierName;
