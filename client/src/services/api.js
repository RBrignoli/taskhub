import API_URLS from "./server-urls";

const apiService = {
  async api(body, url, method) {
    const apiUrl = `${API_URLS.API_BASE_URL}${url}`;

    try {
      const response = await fetch(apiUrl, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: body,
      });
      return response
    } catch (error) {
      throw new Error("Error. Please try again.");
    }
  },
};

export default apiService;
