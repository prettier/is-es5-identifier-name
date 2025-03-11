/**
Check if provided string is an `IdentifierName` as specified in [ECMA262 edition 5.1 section 7.6](https://262.ecma-international.org/5.1/#sec-7.6)

@param moduleName - The name of the module.

@example
```js
import isEs5IdentifierName from "@prettier/is-es5-identifier-name";

isEs5IdentifierName("prettier");
// -> true
```
*/
export default function isEs5IdentifierName(id: string): boolean;
