const { Command } = require("commander");
const log = require("../shared/Logs");
const api = require("../services/OrganizeAPI");
const ConfigFile = require("../services/ConfigFile");
const generateNewToken = require("../shared/util/generateNewToken");
const verifyConfigFile = require("../shared/util/verifyConfigFile");
const { isApiError, isApiTokenError } = require("../services/OrganizeAPI");
const transformDate = require("../shared/util/transformDate");

const listProject = new Command("list:project")
  .command("list:project")
  .option(
    "-n, --name <projectName>",
    "return a specific project according to the given name",
    ""
  )
  .description("List created projects by the user")
  .action(async (options) => {
    const { name } = options;

    const config = new ConfigFile();

    await verifyConfigFile();

    let token;

    let response;

    if (name) {
      token = await config.getToken();

      response = await api.get(`/projects/${name}`, {
        "x-access-token": token,
      });
    }

    if (!name) {
      token = await config.getToken();

      response = await api.get("/projects", {
        "x-access-token": token,
      });
    }

    if (isApiError(response) && isApiTokenError(response.message)) {
      log.warn(`authentication error - ${response.message}`);

      const username = await config.getActiveUser();

      log.action(`generating a new token for "${username}"...`);

      await generateNewToken();

      token = await config.getToken();

      if (name) {
        response = await api.get(`/projects/${name}`, {
          "x-access-token": token,
        });
      }

      if (!name) {
        response = await api.get("/projects", {
          "x-access-token": token,
        });
      }
    }

    if (isApiError(response)) {
      log.error(response.message);
      return;
    }

    if (name) {
      log.table([response.name, response.path, response.created_at], {
        head: ["name", "path", "created_at"],
      });
      return;
    }

    if (response.length === 0) {
      log.error(
        `User "${await config.getActiveUser()}" doesn't have any project`
      );
      return;
    }

    const projectsArr = response.map((project) => {
      const { name: projectName, path, created_at } = project;

      const adjuestedDate = transformDate(created_at);

      return [projectName, path, adjuestedDate];
    });

    log.table(projectsArr, {
      head: ["name", "path", "created_at"],
      many: true,
    });
  });

module.exports = listProject;
