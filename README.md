# keynote-parser2

[![github check](https://github.com/meteorlxy/keynote-parser/workflows/check/badge.svg)](https://github.com/meteorlxy/keynote-parser/actions?query=workflow%3Acheck)
[![npm](https://badgen.net/npm/v/keynote-parser2)](https://www.npmjs.com/package/keynote-parser2)
[![license](https://badgen.net/github/license/meteorlxy/keynote-parser)](https://github.com/meteorlxy/keynote-parser/blob/main/LICENSE)

A library for parsing Apple Keynote file.

## Install

```sh
npm i keynote-parser2
```

## Usage

### Command Line

Parse keynote (.key) file:

```sh
# output the parsed result to `keynote_file.key.parsed` by default
keynote-parser keynote_file.key
# specify the output directory
keynote-parser keynote_file.key keynote_file_parsed_directory
```

### Node.js API

Parse keynote (.key) file:

```ts
import { parse } from 'keynote-parser2';

await parse(
  '/path/to/keynote_file.key',
  '/path/to/keynote_file_parsed_directory',
);
```

Parse IWA (.iwa) file:

```ts
import fs from 'node:fs/promises';
import { parseIwa } from 'keynote-parser2';

const data = await fs.readFile('/path/to/iwa_file.iwa');
const iwaData = parseIwa(data);
```

## Credits

- [obriensp/iWorkFileFormat](https://github.com/obriensp/iWorkFileFormat)
- [psobot/keynote-parser](https://github.com/psobot/keynote-parser) (Python)
- [pranaygp/keynote-parser](https://github.com/pranaygp/keynote-parser) (Node.js)

## License

[MIT](https://github.com/meteorlxy/keynote-parser/blob/main/LICENSE) &copy; [meteorlxy](https://github.com/meteorlxy) & [Contributors](https://github.com/meteorlxy/keynote-parser/graphs/contributors)
