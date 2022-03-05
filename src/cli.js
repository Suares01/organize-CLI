const { Command } = require("commander");
const listUser = require("./commands/list:user");
const newUser = require("./commands/new:user");

const cli = new Command()
  .name("organize-cli")
  .description(
    "CLI of organize project, a tool for you to create, open and organize your projects."
  )
  .version("0.0.1", "-v, --version", "see the cli version")
  .addCommand(newUser)
  .addCommand(listUser);

cli.parse(process.argv);
