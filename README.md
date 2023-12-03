# Xencode

Simple and easy-to-use text encoding algorithms.

## Getting Started

Add repository to your project:

```bash
git clone https://github.com/iibe/xencoder.git
```

Import library in your repository:

```js
import xen, { Xencode } from "xencode/dist/index";

const message = "Hello, world";
const command = "pr-1.cl-2.tr-3";

// const encoded = xen.encode(message, command);
const encoded = new Xencode().encode(message, command);

console.log(encoded);
```
