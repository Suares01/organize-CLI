const { Command } = require("commander");
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

    const config = new ConfigFile();

    await verifyConfigFile();

    if (user) {
      const usr = await config.getUsers(user);

      if (!usr) {
        log.error(`user "${user}" not found`);
        return;
      }

      const adjuestedDate = transformDate(usr.created_at);

      log.table([usr.username, adjuestedDate], {
        head: ["username", "created_at"],
        colWidths: [20, 15],
      });

      return;
    }

    const users = await config.getUsers();

    if (users.length === 0) {
      log.error("no users created");
      return;
    }

    const usersArr = users.map((usr) => {
      const { username, created_at } = usr;

      const adjuestedDate = transformDate(created_at);

      return [username, adjuestedDate];
    });

    log.table(usersArr, {
      head: ["username", "created_at"],
      colWidths: [20, 15],
      many: true,
    });
  });

module.exports = listUser;
