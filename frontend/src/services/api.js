const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1';

export async function apiFetch(path, options = {}) {
  const token = localStorage.getItem('admin_token');

  const response = await fetch(`${API_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    ...options,
  });

  if (response.status === 401) {
    localStorage.removeItem('admin_token');
    window.location.href = '/admin/login';
  }

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || 'Something went wrong');
  }

  if (response.status === 204) return null;
  return response.json();
}

export async function getProducts() {
  return apiFetch('/products');
}

export async function getProduct(id) {
  return apiFetch(`/products/${id}`);
}

export async function createProduct(data) {
  return apiFetch('/products', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function updateProduct(id, data) {
  return apiFetch(`/products/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

export async function updateStock(id, stockCount) {
  return apiFetch(`/products/${id}/stock`, {
    method: 'PATCH',
    body: JSON.stringify({ stock_count: stockCount }),
  });
}

export async function deleteProduct(id) {
  return apiFetch(`/products/${id}`, { method: 'DELETE' });
}

export async function createOrder(data) {
  return apiFetch('/orders', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function getOrders() {
  return apiFetch('/orders');
}
