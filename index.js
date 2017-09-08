#!/usr/bin/env node

const program = require('commander');
const Enquirer = require('enquirer');
const prompt = require('prompt-confirm');

const { configuration } = require('./lib/config');
const { LANGUAGES } = require('./lib/languages');
const { current, bolt } = require('./lib/utils');

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

function configure() {
  bolt("Tell current which languages you'd like to report on...\n");

  const enquirer = new Enquirer();
  enquirer.register('confirm', prompt);

  const settings = {};

  LANGUAGES.forEach((language) => {
    enquirer.question(language.name, `${language.name}?`, { type: 'confirm' });
  });

  enquirer
    .prompt(LANGUAGES.map(l => l.name))
    .then((answers) => {
      settings.languages = answers;

      configuration.saveSettings(settings);

      bolt('Settings saved!');
    });
}

function list() {
  const settings = configuration.loadSettings();

  const langs = LANGUAGES.filter(l => typeof settings.languages[l.name] !== 'undefined');

  current(langs);
}

function lookup(lang) {
  const lookupValue = lang.toLowerCase();
  const langs = LANGUAGES.filter(l => l.name === lookupValue);

  if (langs.length > 0) {
    current(langs);
  } else {
    bolt(`${lang} not found`);
  }
}

if (program.configure) {
  configure();
  process.exit(0);
}

if (typeof langValue === 'undefined') {
  if (configuration.isConfigured()) {
    list();
  } else {
    configure();
  }
} else {
  lookup(langValue);
}
