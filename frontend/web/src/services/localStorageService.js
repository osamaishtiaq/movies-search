import { LS_KEYS } from "../common/constants";

export class localStorageService {
  getItem(key) {
    return localStorage.getItem(key);
  }

  setItem(key, item) {
    try {
      if (typeof item === "string") {
        localStorage.setItem(key, item);
      } else {
        localStorage.setItem(key, JSON.stringify(item));
      }
      return true;
    } catch {
      return false;
    }
  }

  getToken() {
    return this.getItem(LS_KEYS.AUTH_TOKEN);
  }

  setToken(newToken) {
    return this.setItem(LS_KEYS.AUTH_TOKEN, newToken);
  }
}
