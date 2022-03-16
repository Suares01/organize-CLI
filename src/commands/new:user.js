const { Command } = require("commander");

const log = require("../shared/Logs");

const verifyConfigFile = require("../shared/util/verifyConfigFile");

const ConfigFile = require("../services/ConfigFile");
const api = require("../services/OrganizeAPI");
const { isApiError } = require("../services/OrganizeAPI");
const authUser = require("../shared/util/authUser");

const newUser = new Command("new:user")
  .command("new:user <username> <password>")
  .description("createa new user")
  .action(async (username, password) => {
    const { user, token } = new ConfigFile();

    await verifyConfigFile();

    const response = await api.post("/users", { username, password });

    if (isApiError(response)) {
      log.error(response.message);
      return;
    }

    const tokenResponse = await authUser({
      username,
      password,
    });

    if (isApiError(tokenResponse)) {
      log.error(tokenResponse.message);
      return;
    }

    await token.save(tokenResponse.token);

    log.action("saving user...");
    await user.save({
      username,
      password,
      created_at: response.created_at,
    });

    await user.setActive(username);

    log.success(`User "${username}" has been created`);
  });

module.exports = newUser;
