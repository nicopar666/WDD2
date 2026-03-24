import { apiFetch } from "./api";

export async function getInventory() {
  return apiFetch("/inventory");
}

export async function addProduct(product) {
  return apiFetch("/inventory", {
    method: "POST",
    body: JSON.stringify(product),
  });
}

export async function updateProduct(id, product) {
  return apiFetch(`/inventory/${id}`, {
    method: "PUT",
    body: JSON.stringify(product),
  });
}

export async function deleteProduct(id) {
  return apiFetch(`/inventory/${id}`, { method: "DELETE" });
}
