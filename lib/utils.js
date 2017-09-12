const { execSync } = require('child_process');

const chalk = require('chalk');

function cleanup(version) {
  let v = version;
  // strip new lines
  v = v.replace(/(\r\n|\n|\r)/gm, '');

  // strip leading characters (ie, v6.6.0, go1.8.3)
  v = v.replace(/^(\D*)?/gm, '');

  return v;
}

function capture(language) {
  const lang = language;

  try {
    const output = execSync(language.command).toString();
    lang.version = cleanup(output);
  } catch (err) {
    lang.version = 'An error occured while detecting the version';
  }

  return lang;
}

function logVersion(language) {
  console.log(`${chalk.yellow(language.name)}: ${chalk.green(language.version)}`);
}

exports.current = (languages) => {
  languages.forEach((language) => {
    logVersion(capture(language));
  });
};

exports.bolt = (str) => {
  console.log(`⚡️  ${str}`);
};
