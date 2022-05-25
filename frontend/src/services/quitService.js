import http from "./httpService";
import { apiUrl } from "../config.js";

const apiEndpoint = "http://localhost:8080/api/quit";

function quitUrl(id) {
  return `${apiEndpoint}/${id}`;
}

export function getquits(userid) {
  let body = { userId: userid };
  return http.get(apiEndpoint, body);
}

export function getquit(quitId) {
  return http.get(quitUrl(quitId));
}

export function savequit(quit) {
  if (quit._id) {
    const body = { ...quit };
    delete body._id;
    console.log("updating");
    return http.put(quitUrl(quit._id), body);
  }

  return http.post(apiEndpoint, quit);
}

export function deletequit(quitId) {
  return http.delete(quitUrl(quitId));
}
