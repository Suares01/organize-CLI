const {
  fileAsync,
  existsAsync,
  path,
  readAsync,
  writeAsync,
} = require("fs-jetpack");

module.exports = class ConfigFile {
  constructor() {
    this.path = path(__dirname, "..", "config.json");
  }

  async generate() {
    const intialConfigFile = {
      user: [],
    };

    await fileAsync(`${__dirname}/../config.json`, {
      content: JSON.stringify(intialConfigFile),
    });
  }

  async exists() {
    const configFile = await existsAsync(`${__dirname}/../config.json`);

    if (configFile === "file") return true;

    return false;
  }

  async saveUser({ username, password, created_at }) {
    const configFile = await readAsync(this.path);

    const configObject = JSON.parse(configFile);

    configObject.user.push({
      username,
      password,
      created_at,
    });

    await writeAsync(this.path, configObject, { jsonIndent: 2 });
  }
};