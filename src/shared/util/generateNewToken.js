const authUser = require("./authUser");
const ConfigFile = require("../../services/ConfigFile");
const log = require("../Logs");
const { isApiError } = require("../../services/OrganizeAPI");

const generateNewToken = async () => {
  const config = new ConfigFile();

  const activeUser = await config.getActiveUser();

  const { username, password } = await config.getUsers(activeUser);

  const response = await authUser({
    username,
    password,
  });

  if (isApiError(response)) {
    log.error(response.message);
    return;
  }

  await config.saveToken(response.token);
};

module.exports = generateNewToken;
