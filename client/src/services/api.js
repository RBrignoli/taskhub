import API_URLS from "./server-urls";

const apiService = {
  async get(url) {
    const apiUrl = `${API_URLS.API_BASE_URL}${url}`;
    try {
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return response.json();
    } catch (error) {
      throw new Error("Error. Please try again.");
    }
  },

  async api(body, url, method) {
    const apiUrl = `${API_URLS.API_BASE_URL}${url}`;

    try {
      const response = await fetch(apiUrl, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: body,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return response;
    } catch (error) {
      throw new Error("Error. Please try again.");
    }
  },
};

export default apiService;