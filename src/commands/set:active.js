const { Command } = require("commander");
const ConfigFile = require("../services/ConfigFile");
const log = require("../shared/Logs");
const verifyConfigFile = require("../shared/util/verifyConfigFile");
const authUser = require("../shared/util/authUser");
const { isApiError } = require("../services/OrganizeAPI");

const setActive = new Command("set:active")
  .command("set:active <username>")
  .description("Set some user as active")
  .action(async (username) => {
    const config = new ConfigFile();

    await verifyConfigFile();

    const user = await config.getUsers(username);

    if (!user) {
      log.error("User not found in config file");
      return;
    }

    const tokenRes = await authUser({
      username,
      password: user.password,
    });

    if (
      isApiError(tokenRes) &&
      tokenRes.message === "username or password incorrect"
    ) {
      log.error(`User "${username}" doesn't exists in the database`);
      return;
    }

    if (isApiError(tokenRes)) {
      log.error(tokenRes.message);
      return;
    }

    await config.defineActiveUser(username);
    await config.saveToken(tokenRes.token);

    log.success(`User "${username}" has been defined as active with success!`);
  });

module.exports = setActive;
