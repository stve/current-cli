const { LANGUAGES } = require('../languages');
const { current, bolt } = require('../utils');

const lookup = (lang) => {
  const lookupValue = lang.toLowerCase();
  const langs = LANGUAGES.filter(l => l.name === lookupValue);

  if (langs.length > 0) {
    current(langs, false);
  } else {
    bolt(`${lang} not found`);
  }
};

module.exports = lookup;
