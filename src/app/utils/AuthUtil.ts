export const TOKEN_KEY = "token";

export const isAuthenticated = () => sessionStorage.getItem(TOKEN_KEY) !== null;

export const logout = () => sessionStorage.removeItem(TOKEN_KEY) !== null;

export const getToken = () => sessionStorage.getItem(TOKEN_KEY);