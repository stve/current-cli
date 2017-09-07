#!/usr/bin/env node
'use strict';

const log = console.log;
const path = require('path');

const { configuration } = require('./lib/config');
const { LANGUAGES } = require('./lib/languages');
const { current, bolt } = require('./lib/utils');

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
