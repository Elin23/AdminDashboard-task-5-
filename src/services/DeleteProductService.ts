import axios from 'axios';

export const deleteProductService = async (id: number, token: string) => {
  try {
    const response = await axios.delete(
      `https://web-production-3ca4c.up.railway.app/api/items/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Failed to delete product:', error);
    throw error;
  }
};
