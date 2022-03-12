const { Command } = require("commander");
const shell = require("shelljs");
const log = require("../shared/Logs");
const api = require("../services/OrganizeAPI");
const verifyConfigFile = require("../shared/util/verifyConfigFile");
const ConfigFile = require("../services/ConfigFile");
const { isApiError, isApiTokenError } = require("../services/OrganizeAPI");
const generateNewToken = require("../shared/util/generateNewToken");

const open = new Command("open")
  .command("open <projectName>")
  .description("Open a project from any directory")
  .option("-i, --ide <ideCLI>", "Change the IDE for open your projects", "code")
  .alias("o")
  .action(async (name, options) => {
    const { ide } = options;

    await verifyConfigFile();

    const config = new ConfigFile();

    let token;

    token = await config.getToken();

    let response;

    response = await api.get(`/projects/${name}`, {
      "x-access-token": token,
    });

    if (isApiError(response) && isApiTokenError(response.message)) {
      log.warn(`authentication error - ${response.message}`);

      const username = await config.getActiveUser();

      log.action(`generating a new token for "${username}"...`);

      await generateNewToken();

      token = await config.getToken();

      response = await api.get(`/projects/${name}`, {
        "x-access-token": token,
      });
    }

    if (isApiError(response)) {
      log.error(response.message);
      return;
    }

    const { path } = response;

    if (ide) {
      await config.setIde(ide);
    }

    const ideCli = await config.getIde();

    await shell.exec(`${ideCli} ${path}`);
  });

module.exports = open;
