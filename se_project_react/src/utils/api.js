import { BASE_URL } from "../utils/constants.js";

//const BASE_URL = "http://rnr.pakasak.com"; //prod base URL
// const BASE_URL = "http://localhost:3001"; //dev base URL
console.log("API Base URL in build:", import.meta.env.VITE_BASE_URL);

export function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error: ${res.status}`);
}

export async function getItems() {
  const token = localStorage.getItem("jwt");

  const headers = { "Content-Type": "application/json" };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${BASE_URL}/items`, {
    headers,
  });
  return checkResponse(response);
}

export function addNewClothingItem({ name, imageUrl, weatherType }) {
  // console.log("API received:", { name, imageUrl, weatherType });
  const token = localStorage.getItem("jwt");
  return fetch(`${BASE_URL}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      name,
      imageUrl,
      weather: weatherType,
    }),
  }).then(checkResponse);
}

export async function deleteItem(itemId) {
  const token = localStorage.getItem("jwt");
  const res = await fetch(`${BASE_URL}/items/${itemId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return checkResponse(res);
}

export const updateUserInfo = ({ name, avatar }) => {
  const token = localStorage.getItem("jwt");

  return fetch(`${BASE_URL}/users/me`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, avatar }),
  }).then(checkResponse);
};

export function addCardLike(cardId, token) {
  return fetch(`${BASE_URL}/items/${cardId}/likes`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  }).then(checkResponse);
}

export function removeCardLike(cardId, token) {
  return fetch(`${BASE_URL}/items/${cardId}/likes`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  }).then(checkResponse);
}
