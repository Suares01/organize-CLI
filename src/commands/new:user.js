const { Command } = require("commander");

const log = require("../shared/util/Logs");

const verifyConfigFile = require("../shared/util/verifyConfigFile");

const ConfigFile = require("../services/ConfigFile");
const api = require("../services/OrganizeAPI");
const { isApiError } = require("../services/OrganizeAPI");

const newUser = new Command("new:user")
  .command("new:user <username> <password>")
  .description("createa new user")
  .action(async (username, password) => {
    const config = new ConfigFile();

    await verifyConfigFile();

    const response = await api.post("/users", { username, password });

    if (isApiError(response)) {
      log.error(response.message);
      return;
    }

    log.action("saving user...");
    await config.saveUser({
      username,
      password,
      created_at: response.created_at,
    });

    log.success(`User "${username}" has been created`);
  });

module.exports = newUser;
