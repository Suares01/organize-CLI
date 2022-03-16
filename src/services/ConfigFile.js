const {
  fileAsync,
  existsAsync,
  path,
  readAsync,
  writeAsync,
} = require("fs-jetpack");

class User {
  constructor(filePath) {
    this.path = filePath;
  }

  async save({ username, password, created_at }) {
    const configFile = await readAsync(this.path);

    const configObject = JSON.parse(configFile);

    configObject.users.push({
      username,
      password,
      created_at,
    });

    await writeAsync(this.path, configObject, { jsonIndent: 2 });
  }

  async get(username = "") {
    const configFile = await readAsync(this.path);

    const configObject = JSON.parse(configFile);

    if (username) {
      const user = configObject.users.find((usr) => usr.username === username);

      if (!user) return undefined;

      return user;
    }

    return configObject.users;
  }

  async setActive(username) {
    const configFile = await readAsync(this.path);

    const configObject = JSON.parse(configFile);

    configObject.activeUser = username;

    await writeAsync(this.path, configObject, { jsonIndent: 2 });
  }

  async getActive() {
    const configFile = await readAsync(this.path);

    const configObject = JSON.parse(configFile);

    const { activeUser } = configObject;

    return activeUser;
  }
}

class IntegratedDevelopmentEnvironment {
  constructor(filePath) {
    this.path = filePath;
  }

  async get() {
    const configFile = await readAsync(this.path);

    const configObject = JSON.parse(configFile);

    const { ide } = configObject;

    return ide;
  }

  async set(ideCli) {
    const configFile = await readAsync(this.path);

    const configObject = JSON.parse(configFile);

    configObject.ide = ideCli;

    await writeAsync(this.path, configObject, { jsonIndent: 2 });
  }
}

class Token {
  constructor(filePath) {
    this.path = filePath;
  }

  async get() {
    const configFile = await readAsync(this.path);

    const configObject = JSON.parse(configFile);

    const { token } = configObject;

    return token;
  }

  async save(token) {
    const configFile = await readAsync(this.path);

    const configObject = JSON.parse(configFile);

    configObject.token = token;

    await writeAsync(this.path, configObject, { jsonIndent: 2 });
  }
}

module.exports = class ConfigFile {
  constructor() {
    this.path = path(__dirname, "..", "config.json");
    this.user = new User(this.path);
    this.ide = new IntegratedDevelopmentEnvironment(this.path);
    this.token = new Token(this.path);
  }

  async generate() {
    const intialConfigFile = {
      users: [],
      token: "",
      activeUser: "",
      ide: "code",
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
};
