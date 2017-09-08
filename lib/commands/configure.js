const Enquirer = require('enquirer');
const prompt = require('prompt-confirm');

const { configuration } = require('../config');
const { LANGUAGES } = require('../languages');
const { bolt } = require('../utils');

const configure = () => {
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
};

module.exports = configure;
