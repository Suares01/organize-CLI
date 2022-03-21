const init = require("init-package-json");
const { dirAsync } = require("fs-jetpack");

const generateProjectWorkspace = async (projectPath) => {
  await dirAsync(projectPath);

  await new Promise((resolve, reject) => {
    init(projectPath, "", "", (error, data) => {
      if (error) reject(error);

      resolve(data);
    });
  });
};

module.exports = generateProjectWorkspace;
