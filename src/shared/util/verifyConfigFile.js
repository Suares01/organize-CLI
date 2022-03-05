const ConfigFile = require("../../services/ConfigFile");

const log = require("./Logs");

const config = new ConfigFile();

const verifyConfigFile = async () => {
  const configFileExists = await config.exists();

  if (!configFileExists) {
    log.warn("config file does not exists");

    log.action("generating config file...");
    await config.generate();
  }
};

module.exports = verifyConfigFile;
