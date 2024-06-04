import { CreateUser, UpdateUser } from "../interfaces/user.interface";
import { API } from "../utils/constants";

export const getUsersRequest = async (refreshToken: string) =>
  fetch(`${API}/user`, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
      Authorization: refreshToken,
    },
  });
export const createUserRequest = async (
  User: CreateUser,
  refreshToken: string
) =>
  fetch(`${API}/user`, {
    method: "POST",
    body: JSON.stringify(User),
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
      Authorization: refreshToken,
    },
  });

export const deletePermamentUserRequest = async (
  id: string,
  refreshToken: string
) =>
  fetch(`${API}/user/${id}`, {
    method: "DELETE",
    headers: {
      "Access-Control-Allow-Origin": "*",
      Authorization: refreshToken,
    },
  });

export const deleteUserRequest = async (
  id: string,
  User: UpdateUser,
  refreshToken: string
) =>
  fetch(`${API}/user/${id}`, {
    method: "DELETE",
    body: JSON.stringify(User),
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
      Authorization: refreshToken,
    },
  });

export const updateUserRequest = async (
  id: string,
  User: UpdateUser,
  refreshToken: string
) =>
  fetch(`${API}/user/${id}`, {
    method: "PUT",
    body: JSON.stringify(User),
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
      Authorization: refreshToken,
    },
  });

export const getUserRequest = async (id: string, refreshToken: string) =>
  fetch(`${API}/user/${id}`, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
      Authorization: refreshToken,
    },
  });

export const registerUser = async (User: CreateUser, refreshToken: string) =>
  fetch(`${API}/auth/register`, {
    method: "POST",
    body: JSON.stringify(User),
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
      Authorization: refreshToken,
    },
  });

export const updateUserLanguage = async (
  User: UpdateUser,
  refreshToken: string
) =>
  fetch(`${API}/user/language`, {
    method: "POST",
    body: JSON.stringify(User),
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
      Authorization: refreshToken,
    },
  });

export const updateUserThemeApp = async (
  User: UpdateUser,
  refreshToken: string
) =>
  fetch(`${API}/user/themeApp`, {
    method: "POST",
    body: JSON.stringify(User),
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
      Authorization: refreshToken,
    },
  });
