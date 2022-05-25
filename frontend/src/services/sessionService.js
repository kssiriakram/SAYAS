import http from "./httpService";
import { getCurrentUser } from "./authService";
import { apiUrl } from "../config.js";

const apiEndpoint = "http://localhost:8080/api/focus_session";

function sessionUrl(id) {
  return `${apiEndpoint}/${id}`;
}

export function getsessions(id) {
  let body = { userId: id };
  console.log(body);
  return http.post(apiEndpoint + "/find", body);
}

export function getsession(sessionId) {
  return http.get(sessionUrl(sessionId));
}

export function savesession(session) {
  if (session._id) {
    const body = { ...session };
    delete body._id;

    return http.put(sessionUrl(session._id), body);
  }

  return http.post(apiEndpoint, session);
}

export function deletesession(sessionId) {
  return http.delete(sessionUrl(sessionId));
}

export function getsuccess(userid, value) {
  let body = { userId: userid, success: value };
  return http.post(apiEndpoint + "/count_success", body);
}

export function getaverage(userId) {
  let body = { userId: userId };
  console.log(body);
  return http.get(apiEndpoint + "/average", body);
}

export function getmonthly(userid) {
  let body = { userId: userid, success: 0, date: new Date() };
  console.log(body);
  return http.post(apiEndpoint + "/month", body);
}

export function getmostquit(userId) {
  let body = { userId: userId };
  return http.post(apiEndpoint + "/max_quit", body);
}
