import http from "./httpService";
import { apiUrl } from "../config.js";
import { getCurrentUser } from "./authService";
const apiEndpoint = "http://localhost:8080/api/task";

function taskUrl(id) {
  return `${apiEndpoint}/${id}`;
}

export function gettasks() {
  let body = { userId: getCurrentUser().id };
  console.log(body);
  return http.post(apiEndpoint + "/find", body);
}

export function gettask(taskId) {
  return http.get(taskUrl(taskId));
}

export function savetask(task) {
  if (task.id) {
    const body = { ...task };
    delete body.id;
    console.log("updating");
    return http.put(taskUrl(task.id), body);
  }

  return http.post(apiEndpoint, task);
}

export function deletetask(taskId) {
  return http.delete(taskUrl(taskId));
}
