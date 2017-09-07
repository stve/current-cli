const { execSync } = require('child_process');
const log = console.log;

const chalk = require('chalk');

const stripNewLines = (version) => {
  version = version.replace(/(\r\n|\n|\r)/gm,"");

  return version;
}

function capture(language) {
  let version;

  try {
    let output = execSync(language.command).toString();
    language.version = stripNewLines(output);

  } catch (err) {
    language.version = "An error occured while detecting the version";
  }

  return language;
}

function output(language) {
  log(`${chalk.yellow(language.name)}: ${chalk.green(language.version)}`);
}

exports.current = (languages) => {
  languages.forEach((language) => {
    output(capture(language));
  });
}

exports.bolt = (str) => {
  log(`⚡️  ${str}`);
}
