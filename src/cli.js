const command = require("commander");
const newUser = require("./commands/new:user");

const cli = command
  .name("organize-cli")
  .description(
    "CLI of organize project, a tool for you to create, open and organize your projects."
  )
  .version("0.0.1", "-v, --version", "see the cli version")
  .addCommand(newUser);

cli.parse(process.argv);
