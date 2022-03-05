const colors = require("ansi-colors");

class Logs {
  warn(message) {
    console.log(
      `${colors.black.bold.bgYellow("WARN:")} ${colors.yellow(message)}`
    );
  }

  action(message) {
    console.log(`${colors.gray(message)}`);
  }

  success(message) {
    console.log(`${colors.green(message)}`);
  }

  error(message) {
    console.log(`${colors.bgRed.white("Error:")} ${colors.red(message)}`);
  }
}

module.exports = new Logs();
