import { CreateEntity, UpdateEntity } from "../interfaces/entity.interface";
import { API } from "../utils/constants";

export const getEntitiesRequest = async (refreshToken: string) =>
  fetch(`${API}/entity`, {
    method: "GET",
    headers: {
      Authorization: refreshToken,
      "Access-Control-Allow-Origin": "*",
    },
  });

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

export const getEntityRequest = async (refreshToken: string, id: string) =>
  fetch(`${API}/entity/${id}`, {
    method: "GET",
    headers: {
      Authorization: refreshToken,
      "Access-Control-Allow-Origin": "*",
    },
  });
