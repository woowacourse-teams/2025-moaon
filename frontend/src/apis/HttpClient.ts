class HTTPClient {
  baseUrl = "";
  apiKey = "";

  constructor(baseUrl: string, apiKey?: string) {
    this.baseUrl = baseUrl;
    this.apiKey = apiKey || "";
  }

  private getHeaders(): Record<string, string> {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    if (this.apiKey) {
      headers.Authorization = this.apiKey;
    }

    return headers;
  }

  async get(url: string) {
    const response = await fetch(this.baseUrl + url, {
      method: "GET",
      headers: this.getHeaders(),
    });

    return response;
  }

  async post<T>(url: string, data: T) {
    const response = await fetch(this.baseUrl + url, {
      method: "POST",
      headers: this.getHeaders(),
      body: JSON.stringify(data),
    });

    return response;
  }

  async delete(url: string) {
    const response = await fetch(this.baseUrl + url, {
      method: "DELETE",
      headers: this.getHeaders(),
    });

    return response;
  }

  async patch<T>(url: string, data: T) {
    const response = await fetch(this.baseUrl + url, {
      method: "PATCH",
      headers: this.getHeaders(),
      body: JSON.stringify(data),
    });

    return response;
  }

  setApiKey(apiKey: string) {
    this.apiKey = apiKey;
  }
}

const BASE_URL = process.env.BASE_URL!;
export const httpClient = new HTTPClient(BASE_URL);
