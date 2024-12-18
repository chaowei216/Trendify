import { jwtDecode } from 'jwt-decode';

export function decodeToken(token) {
  try {
    if (token) {
      const decodedToken = jwtDecode(token);
      return decodedToken != null ? decodedToken : null;
    }
    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export const viewProducts = async (requestBody) => {
  
  try {
    
    const response = await fetch('http://localhost:8080/api/v1/products/search', {
      method: 'POST',
      headers: auth.getAuthHeaders(),
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Unauthorized');
      }
      throw new Error('Failed to fetch products');
    }

    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

export const getProductDetail = async (id) => {
  try {
    const response = await fetch(`http://localhost:8080/api/v1/products/${id}`, {
      method: 'GET',
      headers: auth.getAuthHeaders(),
    
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Unauthorized');
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching product detail:', error);
    throw error;
  }
};

export const createPayment = async (paymentData) => {
  try {
    const response = await fetch('http://localhost:8080/api/v1/payment', {
      method: 'POST',
      headers: auth.getAuthHeaders(),
      body: JSON.stringify(paymentData)
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error creating payment:', error);
    throw error;
  }
};

export const handlePaymentResponse = async (responseData) => {
  try {
    const response = await fetch('http://localhost:8080/api/v1/payment/response', {
      method: 'PUT',
      headers: auth.getAuthHeaders(),
      body: JSON.stringify({
        orderId: responseData.orderId,
        success: responseData.success
      }),
      credentials: 'include'
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error handling payment response:', error);
    throw error;
  }
};


export const auth = {
  getAuthHeaders: () => {

    const token = localStorage.getItem('accessToken');
    
    if (!token) {
      throw new Error('No authentication token found');
    }
    console.log(token);
    return {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };
  },

  validateAccess: () => {
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) return false;
      
      const decoded = decodeToken(token);
      return decoded?.auth === 'CUSTOMER' || decoded?.auth === 'STAFF' || decoded?.auth === 'ADMIN';
    } catch (error) {
      console.error('Error validating access:', error);
      return false;
    }
  }
};