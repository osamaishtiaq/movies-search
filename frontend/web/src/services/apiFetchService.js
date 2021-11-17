import { LS_KEYS } from "../common/constants";
import { localStorageService } from "./localStorageService";
import { ENV } from "../environment";
export class ApiFetchService {
  baseUrl = "";
  localStorageService = new localStorageService();
  retryCount = 0;

  constructor() {
    this.baseUrl = `${ENV.REACT_APP_BASE_API_URL}`;
  }

  async getSearchResults(searchTerm) {
    try {
      const data = await this.get(
        `api/v1/movies/search?searchTerm=${searchTerm}`
      );
      return data;
    } catch {
      if (this.retryCount < 10) {
        this.retryCount += 1;
        await this.authenticate();
        return await this.getSearchResults(searchTerm);
      }
    }
  }

  async getMovieById(id) {
    try {
      const data = await this.get(`api/v1/movies/${id}`);
      return data;
    } catch {
      if (this.retryCount < 10) {
        this.retryCount += 1;
        await this.authenticate();
        return await this.getMovieById(id);
      }
    }
  }

  getHeaders() {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    const token = this.localStorageService.getToken(LS_KEYS.AUTH_TOKEN);
    if (token !== null) {
      headers.append("Authorization", `Bearer ${token}`);
    }
    return headers;
  }

  async authenticate() {
    console.error("Authenticating...");

    var raw = JSON.stringify({
      username: ENV.API_USER,
      password: ENV.API_USER_PWD,
    });
    
    var requestOptions = {
      method: "POST",
      headers: this.getHeaders(),
      body: raw,
      redirect: "follow",
    };

    const resp = await fetch(`${this.baseUrl}/api/auth/login`, requestOptions);
    const data = await resp.json();
    this.localStorageService.setToken(data.access_token);
    return data.access_token;
  }

  async get(url) {
    const resp = await fetch(`${this.baseUrl}/${url}`, {
      method: "GET",
      headers: this.getHeaders(),
    });
    if (resp.status >= 200 && resp.status <= 299) {
      const data = await resp.json();
      return data;
    } else {
      throw Error(resp.status);
    }
  }

  async post(url, payload, options) {
    console.log("Calling: ", `${this.baseUrl}/${url}`);

    const resp = await fetch(`${this.baseUrl}/${url}`, {
      headers: this.getHeaders(),
      method: "POST",
      body: payload,
      ...(options && { ...options }),
    });

    const data = await resp.json();
    console.log("data: ", data);
    return data;
  }

  async getTopRatedMovies() {
    try {
      const data = await this.get("api/v1/movies/top-rated");
      return data;
    } catch (err) {
      if (this.retryCount < 10) {
        this.retryCount += 1;
        await this.authenticate();
        return await this.getTopRatedMovies();
      }
    }
  }

  async getTrendingDaily() {
    try {
      const data = await this.get("api/v1/movies/trending-daily");
      return data;
    } catch (err) {
      if (this.retryCount < 10) {
        this.retryCount += 1;
        await this.authenticate();
        return await this.getTrendingDaily();
      }
    }
  }
}
