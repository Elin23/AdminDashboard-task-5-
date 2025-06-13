import axios from 'axios';

export const fetchProductsService = async (id?: number) => {
  const token = localStorage.getItem('token');
  const url = id
    ? `https://web-production-3ca4c.up.railway.app/api/items/${id}`
    : `https://web-production-3ca4c.up.railway.app/api/items`;

  const response = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json'
    }
  });

  return response.data;
};
