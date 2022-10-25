# valuehex

A small library for primitive data encoding/decoding.

### Installation

Add the library as a dependency to your JavaScript project.

```
yarn add valuehex
```

### Usage

```js
import { encode, decode } from "valuehex";

const encoded = encode("Hello");
// encoded is the string "A148656C6C6F"

const decoded = decode(encoded);
// decoded is the string "Hello"
```

## License

This library has been developed by Richard Marks, is copyright 2021, and licensed under the MIT License.

See [LICENSE.md](./LICENSE.md) for full legal details.

### Changes

1.0.0 - first release
