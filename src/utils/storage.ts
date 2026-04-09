// Работа с хранилищем
export const storage = {
  getToken: (): string | null => {
    return localStorage.getItem("token") || sessionStorage.getItem("token");
  },

  setToken: (token: string, remember: boolean): void => {
    const storage = remember ? localStorage : sessionStorage;
    storage.setItem("token", token);
  },

  removeToken: (): void => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
  },

  getUser: <T>() => {
    const userStr = localStorage.getItem("user") || sessionStorage.getItem("user");
    return userStr ? (JSON.parse(userStr) as T) : null;
  },

  setUser: <T>(user: T, remember: boolean): void => {
    const storage = remember ? localStorage : sessionStorage;
    storage.setItem("user", JSON.stringify(user));
  },

  removeUser: (): void => {
    localStorage.removeItem("user");
    sessionStorage.removeItem("user");
  },

  clearAll: (): void => {
    localStorage.clear();
    sessionStorage.clear();
  },
};