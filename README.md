# Xencode

Simple and easy-to-use text encoding algorithms.

## Installation

Use [git](https://git-scm.com/downloads) to install package.

```bash
git clone https://github.com/iibe/xencoder.git
```

## Usage

```js
import xen, { Xencode } from "xencode/dist/index.js";

const message = "Hello, world";
const command = "pr-1.cl-2.tr-3";
const encoded = xen.encode(message, command);
console.log(encoded);
```
## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit)
