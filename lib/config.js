const fs = require('fs');
const os = require('os');
const path = require('path');

const CONFIG_FILENAME = ".current.json";
const CONFIG_FILE = path.join(os.homedir(), CONFIG_FILENAME);

exports.configuration = {
  isConfigured: () => {
    return fs.existsSync(CONFIG_FILE);
  },

  loadSettings: () => {
    return JSON.parse(fs.readFileSync(CONFIG_FILE, 'utf8'));
  },

  saveSettings: (settings) => {
    fs.writeFileSync(CONFIG_FILE, JSON.stringify(settings), 'utf8');
  }
}
