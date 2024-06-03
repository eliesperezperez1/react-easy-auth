import { API } from "../utils/constants";

export const refreshODSRequest = async (refreshToken: string) =>
  fetch(`${API}/ods`, {
    method: "GET",
    headers: {
      Authorization: refreshToken,
    },
  });
