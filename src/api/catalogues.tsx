import {
  CreateCatalogue,
  UpdateCatalogue,
} from "../interfaces/catalogue.interface";
import { API } from "../utils/constants";

/**
 * Sends a request to the server to retrieve all catalogues.
 *
 * @param {string} refreshToken - The refresh token used for authentication.
 * @return {Promise<Response>} A promise that resolves to the server's response.
 */
export const getCataloguesRequest = async (refreshToken: string) =>
  fetch(`${API}/catalogue`, {
    method: "GET",
    headers: {
      Authorization: refreshToken,
        "Access-Control-Allow-Origin": "*",
    },
  });

/**
 * Sends a POST request to the server to create a new catalogue.
 *
 * @param {CreateCatalogue} catalogue - The catalogue to be created.
 * @param {string} refreshToken - The refresh token for authentication.
 * @return {Promise<Response>} A Promise that resolves to the Response object of the fetch request.
 */
export const createCatalogueRequest = async (
  catalogue: CreateCatalogue,
  refreshToken: string
) =>
  fetch(`${API}/catalogue/create`, {
    method: "POST",
    body: JSON.stringify(catalogue),
    headers: {
      "Content-Type": "application/json",
      Authorization: refreshToken,
      "Access-Control-Allow-Origin": "*",
    },
  });

/**
 * Sends a request to the server to permanently delete a catalogue.
 *
 * @param {string} id - The ID of the catalogue to be deleted.
 * @param {string} refreshToken - The refresh token used for authentication.
 * @return {Promise<Response>} A promise that resolves to the server's response.
 */
export const deletePermamentCatalogueRequest = async (
  id: string,
  refreshToken: string
) =>
  fetch(`${API}/catalogue/${id}`, {
    method: "DELETE",
    headers: {
      "Access-Control-Allow-Origin": "*",
      Authorization: refreshToken,
    },
  });

/**
 * Sends a request to the server to delete a catalogue.
 *
 * @param {string} id - The ID of the catalogue to be deleted.
 * @param {UpdateCatalogue} catalogue - The updated catalogue data.
 * @param {string} refreshToken - The refresh token used for authentication.
 * @return {Promise<Response>} A promise that resolves to the server's response.
 */
export const deleteCatalogueRequest = async (
  id: string,
  catalogue: UpdateCatalogue,
  refreshToken: string
) =>
  fetch(`${API}/catalogue/${id}`, {
    method: "PUT",
    body: JSON.stringify(catalogue),
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
      Authorization: refreshToken,
    },
  });
  

/**
 * Sends a request to the server to update a catalogue.
 *
 * @param {string} id - The ID of the catalogue to be updated.
 * @param {UpdateCatalogue} catalogue - The updated catalogue data.
 * @param {string} refreshToken - The refresh token used for authentication.
 * @return {Promise<Response>} A promise that resolves to the server's response.
 */
export const updateCatalogueRequest = async (
  id: string,
  catalogue: UpdateCatalogue,
  refreshToken: string
) =>
  fetch(`${API}/catalogue/${id}`, {
    method: "PUT",
    body: JSON.stringify(catalogue),
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
      Authorization: refreshToken,
    },
  });

/**
 * Sends a GET request to the server to retrieve a specific catalogue.
 *
 * @param {string} refreshToken - The refresh token used for authentication.
 * @param {string} id - The ID of the catalogue to retrieve.
 * @return {Promise<Response>} A promise that resolves to the server's response.
 */
export const getCatalogueRequest = async (refreshToken: string, id: string) =>
  fetch(`${API}/catalogue/${id}`, {
    method: "GET",
    headers: {
      Authorization: refreshToken,
      "Access-Control-Allow-Origin": "*",
    },
  });
/**
 * Retrieves the high value catalogue from the server.
 *
 * @param {string} refreshToken - The refresh token used for authentication.
 * @return {Promise<Response>} A promise that resolves to the server's response containing the high value catalogue.
 */
export const getHighValue = async (refreshToken: string) =>
  fetch(`${API}/catalogue/highValue`, {
    method: "GET",
    headers: {
      Authorization: refreshToken,
      "Access-Control-Allow-Origin": "*",
    },
  });

  