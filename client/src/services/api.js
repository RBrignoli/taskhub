import { API_URLS, API_BASE_URL } from "./server-urls";

const apiService = {
  async get(url, queryParams) {
    const apiUrl = `${API_BASE_URL}${url}`;
    try {
      const queryString = new URLSearchParams(queryParams || {}).toString();
      const response = await fetch(`${apiUrl}?${queryString}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
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
    const apiUrl = `${API_BASE_URL}${url}`;

    try {
      const response = await fetch(apiUrl, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: body,
        credentials: "include",
      });
      
      if (response.status === 401) {
        alert("You are not authorized to perform this action");
        return;
      }
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
