const fetch = require("node-fetch");

class OrganizeAPI {
  constructor() {
    this.baseURL = "https://api-organize.herokuapp.com";
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

  async get(url, headers) {
    const response = await fetch(`${this.baseURL}${url}`, {
      method: "get",
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

  isApiTokenError(responseErrorMessage) {
    const tokenErrorMessages = [
      "invalid signature",
      "jwt must be provided",
      "invalid token",
      "jwt malformed",
    ];

    if (
      responseErrorMessage === tokenErrorMessages[0] ||
      responseErrorMessage === tokenErrorMessages[1] ||
      responseErrorMessage === tokenErrorMessages[2] ||
      responseErrorMessage === tokenErrorMessages[3]
    ) {
      return true;
    }

    return false;
  }
}

module.exports = new OrganizeAPI();
