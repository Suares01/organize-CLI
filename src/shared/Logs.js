const colors = require("ansi-colors");
const Table = require("cli-table");

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

  table(items, { head = [], colWidths = [], many = false }) {
    const table = new Table({
      head,
      colWidths,
    });

    if (!many) table.push(items);

    if (many) {
      items.forEach((item) => {
        table.push(item);
      });
    }

    console.log(table.toString());
  }
}

module.exports = new Logs();
