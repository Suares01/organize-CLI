const { Command } = require("commander");

const { cwd } = require("process");
const log = require("../shared/Logs");
const api = require("../services/OrganizeAPI");
const verifyConfigFile = require("../shared/util/verifyConfigFile");
const ConfigFile = require("../services/ConfigFile");
const { isApiError, isApiTokenError } = require("../services/OrganizeAPI");
const generateNewToken = require("../shared/util/generateNewToken");
const generateProjectWorkspace = require("../shared/util/generateProjectWorkspace");

const newProject = new Command("new:project")
  .command("new:project <name>")
  .description("Create a new project")
  .action(async (name) => {
    const projectPath = `${cwd()}/${name}`;

    const config = new ConfigFile();

    await verifyConfigFile();

    let token;

    let response;

    token = await config.getToken();

    log.action("creating project...");
    response = await api.post(
      "/projects",
      {
        name,
        path: projectPath,
      },
      {
        "x-access-token": token,
      }
    );

    if (isApiError(response) && isApiTokenError(response.message)) {
      log.warn(`authentication error - ${response.message}`);

      const username = await config.getActiveUser();

      log.action(`generating a new token for "${username}"...`);

      await generateNewToken();

      token = await config.getToken();

      response = await api.post(
        "/projects",
        {
          name,
          path: projectPath,
        },
        {
          "x-access-token": token,
        }
      );
    }

    if (isApiError(response)) {
      log.error(response.message);
      return;
    }

    try {
      log.action("generating workspace...");
      await generateProjectWorkspace(projectPath);
    } catch (err) {
      log.error(err.message);
    }

    log.success(`Project "${response.name}" has been created with success!`);
  });

module.exports = newProject;
