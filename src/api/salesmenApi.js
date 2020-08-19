import { handleResponse, handleError } from "./apiUtils";
const baseUrl = process.env.API_URL + "/reports/";

export function getReports() {
  return fetch(baseUrl).then(handleResponse).catch(handleError);
}
