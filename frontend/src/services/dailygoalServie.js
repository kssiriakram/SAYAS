import http from "./httpService";
import { apiUrl } from "../config.js";
import { getCurrentUser } from "./authService";
const apiEndpoint = "http://localhost:8080/api/daily_goal";

function dailygoalUrl(id) {
  return `${apiEndpoint}/${id}`;
}

export function getdailygoals() {
  let body = { userId: getCurrentUser().id, success: 0 };
  console.log(body);
  return http.post(apiEndpoint + "/find", body);
}

export function getdailygoal() {
  return http.get(dailygoalUrl(getCurrentUser().id));
}

export function savedailygoal(dailygoal) {
  if (dailygoal._id) {
    const body = { ...dailygoal };
    delete body._id;
    return http.put(dailygoalUrl(dailygoal._id), body);
  }
  console.log(dailygoal);
  return http.post(apiEndpoint, dailygoal);
}

export function dailygoalbyday() {
  const body = { userId: getCurrentUser().id, date: 20, success: 0 };

  return http.post(apiEndpoint + "/date", body);
}

export function deletedailygoal(dailygoalId) {
  return http.delete(dailygoalUrl(dailygoalId));
}
