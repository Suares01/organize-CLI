const { Command } = require("commander");
const colors = require("ansi-colors");
const ConfigFile = require("../services/ConfigFile");
const transformDate = require("../shared/util/transformDate");
const log = require("../shared/Logs");
const verifyConfigFile = require("../shared/util/verifyConfigFile");

const listUser = new Command("list:user")
  .command("list:user")
  .description("List created users that are in the config file")
  .option(
    "-u, --user <username>",
    "return a specific user according to the given username",
    ""
  )
  .action(async (options) => {
    const { user } = options;

    const { user: userConfig } = new ConfigFile();

    await verifyConfigFile();

    const activeUser = await userConfig.getActive();

    if (user) {
      const usr = await userConfig.get(user);

      if (!usr) {
        log.error(`user "${user}" not found`);
        return;
      }

      const adjuestedDate = transformDate(usr.created_at);

      if (usr.username === activeUser) {
        log.table([usr.username, adjuestedDate, colors.green("active")], {
          head: ["username", "created_at", "isActive"],
        });

        return;
      }

      log.table([usr.username, adjuestedDate, colors.gray("off")], {
        head: ["username", "created_at", "isActive"],
      });

      return;
    }

    const users = await userConfig.get();

    if (users.length === 0) {
      log.error("no users created");
      return;
    }

    const usersArr = users.map((usr) => {
      const { username, created_at } = usr;

      const adjuestedDate = transformDate(created_at);

      if (username === activeUser)
        return [username, adjuestedDate, colors.green("active")];

      return [username, adjuestedDate, colors.gray("off")];
    });

    log.table(usersArr, {
      head: ["username", "created_at", "isActive"],
      many: true,
    });
  });

module.exports = listUser;
