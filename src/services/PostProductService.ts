import axios from "axios";

export const postProductService = async (data: FormData, id?: number) => {
    const token = localStorage.getItem('token');
    let url = `https://web-production-3ca4c.up.railway.app/api/items`;
    let method = 'post';
  
    if (id) {
      url += `/${id}`;
      data.append('_method', 'PUT');
    }
  
    const response = await axios({ method, url, data,
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    });
  
    return response.data;
  };
  