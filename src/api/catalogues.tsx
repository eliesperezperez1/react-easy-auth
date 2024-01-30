import {
  CreateCatalogue,
  UpdateCatalogue,
} from "../interfaces/catalogue.interface";
import { API } from "../utils/constants";

export const getCataloguesRequest = async (refreshToken: string) =>
  fetch(`${API}/catalogue`, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
      Authorization: refreshToken,
    },
  });

export const createCatalogueRequest = async (
  catalogue: CreateCatalogue,
  refreshToken: string
) =>
  fetch(`${API}/catalogue`, {
    method: "POST",
    body: JSON.stringify(catalogue),
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
      Authorization: refreshToken,
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

export const getCatalogueRequest = async (id: string, refreshToken: string) =>
  fetch(`${API}/catalogue/${id}`, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
      Authorization: refreshToken,
    },
  });
