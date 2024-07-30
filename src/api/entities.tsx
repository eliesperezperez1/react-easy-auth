import { CreateEntity, UpdateEntity } from "../interfaces/entity.interface";
import { API } from "../utils/constants";

/**
 * Sends a request to the server to retrieve all entities.
 *
 * @param {string} refreshToken - The refresh token used for authentication.
 * @return {Promise<Response>} A promise that resolves to the server's response.
 */
export const getEntitiesRequest = async (refreshToken: string) =>
  fetch(`${API}/entity`, {
    method: "GET",
    headers: {
      Authorization: refreshToken,
      "Access-Control-Allow-Origin": "*",
    },
  });

/**
 * Sends a POST request to the server to create a new entity.
 *
 * @param {CreateEntity} Entity - The entity object containing the new entity's information.
 * @param {string} refreshToken - The refresh token used for authentication.
 * @return {Promise<Response>} A promise that resolves to the server's response.
 */
export const createEntityRequest = async (
  Entity: CreateEntity,
  refreshToken: string
) =>
  fetch(`${API}/entity/create`, {
    method: "POST",
    body: JSON.stringify(Entity),
    headers: {
      "Content-Type": "application/json",
      Authorization: refreshToken,
      "Access-Control-Allow-Origin": "*",
    },
  });

/**
 * Deletes a permanent entity by sending a DELETE request to the server.
 *
 * @param {string} id - The ID of the entity to be deleted.
 * @param {string} refreshToken - The refresh token used for authentication.
 * @return {Promise<Response>} A promise that resolves to the server's response.
 */
export const deletePermamentEntityRequest = async (
  id: string,
  refreshToken: string
) =>
  fetch(`${API}/entity/${id}`, {
    method: "DELETE",
    headers: {
      "Access-Control-Allow-Origin": "*",
      Authorization: refreshToken,
    },
  });

/**
 * Sends a request to the server to delete an entity.
 *
 * @param {string} id - The ID of the entity to be deleted.
 * @param {UpdateEntity} Entity - The updated entity object.
 * @param {string} refreshToken - The refresh token used for authentication.
 * @return {Promise<Response>} A promise that resolves to the server's response.
 */
export const deleteEntityRequest = async (
  id: string,
  Entity: UpdateEntity,
  refreshToken: string
) =>
  fetch(`${API}/entity/${id}`, {
    method: "PUT",
    body: JSON.stringify(Entity),
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
      Authorization: refreshToken,
    },
  });

/**
 * Sends a PUT request to the server to update an entity by its ID.
 *
 * @param {string} id - The ID of the entity to update.
 * @param {UpdateEntity} Entity - The updated entity object.
 * @param {string} refreshToken - The refresh token used for authentication.
 * @return {Promise<Response>} A promise that resolves to the server's response.
 */
export const updateEntityRequest = async (
  id: string,
  Entity: UpdateEntity,
  refreshToken: string
) =>
  fetch(`${API}/entity/${id}`, {
    method: "PUT",
    body: JSON.stringify(Entity),
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
      Authorization: refreshToken,
    },
  });

/**
 * Sends a GET request to the server to retrieve a specific entity by its ID.
 *
 * @param {string} refreshToken - The refresh token used for authentication.
 * @param {string} id - The ID of the entity to retrieve.
 * @return {Promise<Response>} A promise that resolves to the server's response.
 */
export const getEntityRequest = async (refreshToken: string, id: string) =>
  fetch(`${API}/entity/${id}`, {
    method: "GET",
    headers: {
      Authorization: refreshToken,
      "Access-Control-Allow-Origin": "*",
    },
  });
