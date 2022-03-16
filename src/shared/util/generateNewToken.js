const authUser = require("./authUser");
const ConfigFile = require("../../services/ConfigFile");
const log = require("../Logs");
const { isApiError } = require("../../services/OrganizeAPI");

const generateNewToken = async () => {
  const { token, user } = new ConfigFile();

  const activeUser = await user.getActive();

  const { username, password } = await user.get(activeUser);

  const response = await authUser({
    username,
    password,
  });

  if (isApiError(response)) {
    log.error(response.message);
    return;
  }

  await token.save(response.token);
};

module.exports = generateNewToken;
