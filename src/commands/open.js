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

    const { token: configToken, user, ide: configIde } = new ConfigFile();

    let token;

    token = await configToken.get();

    let response;

    response = await api.get(`/projects/${name}`, {
      "x-access-token": token,
    });

    if (isApiError(response) && isApiTokenError(response.message)) {
      log.warn(`authentication error - ${response.message}`);

      const username = await user.getActive();

      log.action(`generating a new token for "${username}"...`);

      await generateNewToken();

      token = await configToken.get();

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
      await configIde.set(ide);
    }

    const ideCli = await configIde.get();

    await shell.exec(`${ideCli} ${path}`);
  });

module.exports = open;
