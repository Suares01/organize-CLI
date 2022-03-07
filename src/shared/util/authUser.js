const api = require("../../services/OrganizeAPI");

const authUser = async ({ username, password }) => {
  const response = await api.post("/users/authenticate", {
    username,
    password,
  });

  return response;
};

module.exports = authUser;
