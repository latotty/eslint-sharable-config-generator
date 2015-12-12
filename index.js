#!/usr/bin/env node

'use strict';

const fs = require('fs');
const glob = require('glob');
const path = require('path');

const args = process.argv.slice(2);

function printHelp(isHelp) {
  const log = isHelp ? 'log' : 'error';
  console[log]('Usage: eslint-sharable-config-generator <from-path> <to-path>');
  console[log]('');
  console[log]('  Generates compiled js eslint config files.');
  console[log]('');
  console[log]('  Config files can be:');
  console[log]('    javascript (.js)');
  console[log]('    json       (.json)');
  console[log]('    yaml       (.yml and .yaml)');
  console[log]('');
  console[log]('  Files with name starting with underscore (_)');
  console[log]('    or files in subdirectories will be ignored.');
  console[log]('');
  console[log]('Options:');
  console[log]('');
  console[log]('  -h, --help    Display this usage info');
  process.exit(isHelp ? 0 : 1); // eslint-disable-line no-process-exit
}

if (~args.indexOf('--help') || ~args.indexOf('-h')) {
  printHelp(true);
}

if (args.length !== 2) {
  printHelp(false);
}

const fromDir = args[0];
const toDir = args[1];

try {
  fs.accessSync(fromDir);
  fs.accessSync(toDir);
} catch (e) {
  console.error(`Invalid path.\n`);
  printHelp(false);
}

const eslintConfigFile = require('eslint/lib/config/config-file.js');
const eslintConfigOps = require('eslint/lib/config/config-ops.js');

function compileConfig(from, to) {
  const eslintConfigOpsApplyEnvironmentsBak = eslintConfigOps.applyEnvironments;
  eslintConfigOps.applyEnvironments = (config) => config; // HAX

  const config = eslintConfigFile.load(path.resolve(from));
  delete config.extends;
  eslintConfigFile.write(config, path.resolve(to));

  eslintConfigOps.applyEnvironments = eslintConfigOpsApplyEnvironmentsBak;
}

glob.sync('./*.@(js|json|yml|yaml)', { ignore: './_*', cwd: fromDir }).forEach((filePath) => {
  const fromAbsolute = path.resolve(path.join(fromDir, filePath));
  const fromExt = path.extname(filePath);
  const toFileName = path.basename(filePath).replace(fromExt, '.js');
  const toAbsolute = path.resolve(path.join(toDir, toFileName));
  compileConfig(fromAbsolute, toAbsolute);
});
