import { CreateUser, UpdateUser } from "../interfaces/user.interface";
import { API } from "../utils/constants";

/**
 * Sends a request to the server to retrieve all users.
 *
 * @param {string} refreshToken - The refresh token used for authentication.
 * @return {Promise<Response>} A promise that resolves to the server's response.
 */
export const getUsersRequest = async (refreshToken: string) =>
  fetch(`${API}/user`, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
      Authorization: refreshToken,
    },
  });
/**
 * Sends a POST request to the server to create a new user.
 *
 * @param {CreateUser} User - The user object containing the user's information.
 * @param {string} refreshToken - The refresh token used for authentication.
 * @return {Promise<Response>} A promise that resolves to the server's response.
 */
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

/**
 * Sends a request to the server to permanently delete a user.
 *
 * @param {string} id - The ID of the user to delete.
 * @param {string} refreshToken - The refresh token used for authentication.
 * @return {Promise<Response>} A promise that resolves to the server's response.
 */
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

/**
 * Sends a request to delete a user by ID.
 *
 * @param {string} id - The ID of the user to delete.
 * @param {UpdateUser} User - The user object containing the updated user information.
 * @param {string} refreshToken - The refresh token used for authentication.
 * @return {Promise<Response>} A promise that resolves to the server's response.
 */
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

/**
 * Sends a request to update a user by ID.
 *
 * @param {string} id - The ID of the user to update.
 * @param {UpdateUser} User - The user object containing the updated user information.
 * @param {string} refreshToken - The refresh token used for authentication.
 * @return {Promise<Response>} A promise that resolves to the server's response.
 */
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

/**
 * Sends a GET request to the server to retrieve a user by their ID.
 *
 * @param {string} id - The ID of the user to retrieve.
 * @param {string} refreshToken - The refresh token used for authentication.
 * @return {Promise<Response>} A promise that resolves to the server's response.
 */
export const getUserRequest = async (id: string, refreshToken: string) =>
  fetch(`${API}/user/${id}`, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
      Authorization: refreshToken,
    },
  });

/**
 * Sends a request to the server to register a new user.
 *
 * @param {CreateUser} User - The user object containing the user's information.
 * @param {string} refreshToken - The refresh token used for authentication.
 * @return {Promise<Response>} A promise that resolves to the server's response.
 */
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

/**
 * Updates the language of a user.
 *
 * @param {UpdateUser} User - The user object containing the updated language information.
 * @param {string} refreshToken - The refresh token used for authentication.
 * @return {Promise<Response>} A promise that resolves to the server's response.
 */
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

/**
 * Updates the theme app of a user.
 *
 * @param {UpdateUser} User - The user object containing the updated theme app information.
 * @param {string} refreshToken - The refresh token used for authentication.
 * @return {Promise<Response>} A promise that resolves to the server's response.
 */
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
