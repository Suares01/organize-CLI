const fetch = require("node-fetch");

class OrganizeAPI {
  constructor() {
    this.baseURL = "http://0.0.0.0:3000";
  }

  async post(url, body, headers) {
    const response = await fetch(`${this.baseURL}${url}`, {
      method: "post",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
    });

    const resJson = await response.json();

    return resJson;
  }

  isApiError(error) {
    return !!(
      typeof error.message === "string" &&
      typeof error.code === "number" &&
      typeof error.error === "string"
    );
  }
}

module.exports = new OrganizeAPI();
