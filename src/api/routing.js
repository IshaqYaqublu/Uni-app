const BASE_URL = "https://664a1e50a300e8795d410b73.mockapi.io/uni";

export const ENDPOINTS = {
  REGISTER: () => `${BASE_URL}/auth`,
  LOGIN: () => `${BASE_URL}/auth`,
  GET_TODO: () => `${BASE_URL}/todo`,
  POST_TODO: () => `${BASE_URL}/todo`,
  DELETE_TODO: () => `${BASE_URL}/todo`,
};
