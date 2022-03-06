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
      users: [],
      token: "",
      activeUser: "",
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

    configObject.users.push({
      username,
      password,
      created_at,
    });

    await writeAsync(this.path, configObject, { jsonIndent: 2 });
  }

  async getUsers(username = "") {
    const configFile = await readAsync(this.path);

    const configObject = JSON.parse(configFile);

    if (username) {
      const user = configObject.users.find((usr) => usr.username === username);

      if (!user) return undefined;

      return user;
    }

    return configObject.users;
  }

  async getToken() {
    const configFile = await readAsync(this.path);

    const configObject = JSON.parse(configFile);

    const { token } = configObject;

    return token;
  }

  async saveToken(token) {
    const configFile = await readAsync(this.path);

    const configObject = JSON.parse(configFile);

    configObject.token = token;

    await writeAsync(this.path, configObject, { jsonIndent: 2 });
  }

  async defineActiveUser(username) {
    const configFile = await readAsync(this.path);

    const configObject = JSON.parse(configFile);

    configObject.activeUser = username;

    await writeAsync(this.path, configObject, { jsonIndent: 2 });
  }

  async getActiveUser() {
    const configFile = await readAsync(this.path);

    const configObject = JSON.parse(configFile);

    const { activeUser } = configObject;

    return activeUser;
  }
};
