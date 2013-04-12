# klei-fs

The `klei-fs` module contains some nice to have addons to the native node.js fs (filesystem) module.

## Installation

```bash
npm install klei-fs
```

## Usage

```javascript
var fs = require('klei-fs');

// Now you can use it as the native fs module,
// and you also have access to klei-fs own functions
```

## Functions

### forEachInDir

#### Params

 * *String* **dir** - The directory to read
 * *Function* **cb** - A callback that is called for each file in the directory, and gets following parameters:
    * *Error* **err** - An error if something went wrong, or empty if everything is ok
    * *String* **file** - The full path to the file

Reads a directory (like fs.readdir), iterates over all files and returns the full file path to the callback. (i.e. you don't have to do a `path.join(dir, file)` in order to read the file)
