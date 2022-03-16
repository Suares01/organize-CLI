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
    const { user: configUser, token } = new ConfigFile();

    await verifyConfigFile();

    const user = await configUser.get(username);

    if (!user) {
      log.error("User not found in config file");
      return;
    }

    const tokenRes = await authUser({
      username,
      password: user.password,
    });

    if (isApiError(tokenRes)) {
      log.error(tokenRes.message);
      return;
    }

    await configUser.setActive(username);
    await token.save(tokenRes.token);

    log.success(`User "${username}" has been defined as active with success!`);
  });

module.exports = setActive;
