import http from "./httpService";

const apiUrl = "http://localhost:8080";
const apiEndpoint = apiUrl + "/api/user/register";

export function register(user) {
  return http.post(apiEndpoint, {
    username: user.username,
    email: user.email,
    password: user.password,
    first_name: user.first_name,
    last_name: user.last_name,
  });
}
