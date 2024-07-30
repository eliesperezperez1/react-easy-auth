import { API } from "../utils/constants";

/**
 * Makes a GET request to the `/ods` endpoint of the API with the provided `refreshToken` in the Authorization header.
 *
 * @param {string} refreshToken - The refresh token to be used in the Authorization header.
 * @return {Promise<Response>} A Promise that resolves to the Response object of the fetch request.
 */
export const refreshODSRequest = async (refreshToken: string) =>
  fetch(`${API}/ods`, {
    method: "GET",
    headers: {
      Authorization: refreshToken,
      "Access-Control-Allow-Origin": "*",
    },
  });
