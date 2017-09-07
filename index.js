#!/usr/bin/env node
'use strict';

const log = console.log;
const path = require('path');

const program = require('commander');

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

  const Enquirer = require('enquirer');
  const enquirer = new Enquirer();
  enquirer.register('confirm', require('prompt-confirm'));

  let settings = {};

  LANGUAGES.forEach((language) => {
    enquirer.question(language.name, `${language.name}?`, {type: 'confirm'});
  });

  enquirer
    .prompt(LANGUAGES.map(l => l.name))
    .then(function(answers) {
      settings.languages = answers;

      configuration.saveSettings(settings);

      bolt("Settings saved!")
    });
}

function list() {
  let settings = configuration.loadSettings();

  let langs = LANGUAGES.filter((l) => {
    return settings.languages.hasOwnProperty(l.name) && settings.languages[l.name]
  });

  current(langs);
}

function lookup(lang) {
  lang = lang.toLowerCase();
  let langs = LANGUAGES.filter((l) => {
    return l.name === lang;
  });

  if (langs.length > 0) {
    current(langs);
  } else {
    bolt(`${lang} not found`);
  }
}

if (program.configure) {
  configure();
  return;
}

if (typeof langValue === "undefined") {
  if (configuration.isConfigured()) {
    list();
  } else {
    configure();
  }
} else {
  lookup(langValue);
}

if (program.list) {
  if (configuration.isConfigured()) {
    let settings = configuration.loadSettings();

    let langs = LANGUAGES.filter((l) => {
      return settings.languages.hasOwnProperty(l.name) && settings.languages[l.name]
    });

    current(langs);

  } else {
    bolt("Tell current which languages you'd like to report on...\n");

    const Enquirer = require('enquirer');
    const enquirer = new Enquirer();
    enquirer.register('confirm', require('prompt-confirm'));

    let settings = {};

    LANGUAGES.forEach((language) => {
      enquirer.question(language.name, `${language.name}?`, {type: 'confirm'});
    });

    enquirer
      .prompt(LANGUAGES.map(l => l.name))
      .then(function(answers) {
        settings.languages = answers;

        configuration.saveSettings(settings);

        bolt("\nSettings saved!")
      });
  }
}
