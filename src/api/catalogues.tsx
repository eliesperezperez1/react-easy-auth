import {
  CreateCatalogue,
  UpdateCatalogue,
} from "../interfaces/catalogue.interface";
import { API } from "../utils/constants";

export const getCataloguesRequest = async (refreshToken: string) =>
  fetch(`${API}/catalogue`, {
    method: "GET",
    headers: {
      Authorization: refreshToken,
        "Access-Control-Allow-Origin": "*",
    },
  });

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

export const getCatalogueRequest = async (refreshToken: string, id: string) =>
  fetch(`${API}/catalogue/${id}`, {
    method: "GET",
    headers: {
      Authorization: refreshToken,
      "Access-Control-Allow-Origin": "*",
    },
  });
export const getHighValue = async (refreshToken: string) =>
  fetch(`${API}/catalogue/highValue`, {
    method: "GET",
    headers: {
      Authorization: refreshToken,
      "Access-Control-Allow-Origin": "*",
    },
  });