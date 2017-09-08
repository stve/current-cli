const { configuration } = require('../config');
const { LANGUAGES } = require('../languages');
const { current } = require('../utils');

const list = () => {
  const settings = configuration.loadSettings();

  const langs = LANGUAGES.filter(l => settings.languages[l.name]);

  current(langs);
};

module.exports = list;
