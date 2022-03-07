const init = require("init-package-json");
const { dirAsync } = require("fs-jetpack");

const generateProjectWorkspace = async (projectPath) => {
  await dirAsync(projectPath);

  init(projectPath, "", "", (error) => {
    if (error) throw error;
  });
};

module.exports = generateProjectWorkspace;
