#!/usr/bin/env node

const program = require('commander');

const { configuration } = require('./lib/config');
const { configure, list, lookup } = require('./lib/commands');

let langValue;

program
  .version('0.1.0')
  .option('-c, --configure', 'Configure');

program
  .arguments('<language>')
  .action((l) => {
    langValue = l;
  });

program.parse(process.argv);

if (typeof langValue !== 'undefined') {
  lookup(langValue);
} else if (program.configure) {
  configure();
} else if (configuration.isConfigured()) {
  list();
} else {
  configure();
}
