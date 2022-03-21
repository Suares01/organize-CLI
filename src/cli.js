const { Command } = require("commander");
const listUser = require("./commands/list:user");
const listProject = require("./commands/list:project");
const newUser = require("./commands/new:user");
const newProject = require("./commands/new:project");
const setActive = require("./commands/set:active");
const open = require("./commands/open");

const cli = new Command()
  .name("organize")
  .description(
    "CLI of organize project, a tool for you to create, open and organize your projects."
  )
  .version("0.0.1", "-v, --version", "see the cli version")
  .addCommand(newUser)
  .addCommand(listUser)
  .addCommand(newProject)
  .addCommand(listProject)
  .addCommand(setActive)
  .addCommand(open);

cli.parse(process.argv);
