# Eslint sharable config generator
[![Build Status](https://travis-ci.org/latotty/eslint-sharable-config-generator.svg?branch=master)](https://travis-ci.org/latotty/eslint-sharable-config-generator)

Install with `npm install eslint-sharable-config-generator`

## Usage

Run manually

`./node_modules/.bin/eslint-sharable-config-generator src .` (if you stored your config files at `./config`, and you want your compiled js files in the cwd).

Or add it to npm:

```
"scripts": {
  "build": "eslint-sharable-config-generator src ."
},
```
You do not need to include `./node_modules/.bin/` in npm scripts.

## --help

Usage: `eslint-sharable-config-generator <from-path> <to-path>`

  Generates compiled js eslint config files.

  Config files can be:
    javascript (.js)
    json       (.json)
    yaml       (.yml and .yaml)

  Files with name starting with underscore (_)
    or files in subdirectories will be ignored.

Options:

  `-h`, `--help`    Display this usage info
