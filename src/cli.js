import command from "commander";

const cli = command
  .name("organize-cli")
  .description(
    "CLI of organize project, a tool for you to create, open and organize your projects."
  )
  .version("0.0.1")
  .addCommand();

cli.parse(process.argv);
