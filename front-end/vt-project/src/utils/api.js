export const viewProducts = async (requestBody) => {
  try {
    const response = await fetch('http://localhost:8080/api/v1/products/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': '*/*',
        'Access-Control-Allow-Origin': '*'
      },
      credentials: 'include',  // Include credentials if needed
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const getProductDetail = async (id) => {
  try {
      const response = await fetch(`http://localhost:8080/api/v1/products/${id}`, {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
              'Accept': '*/*',
              'Access-Control-Allow-Origin': '*'
          },
          credentials: 'include',
      });

      if (!response.ok) {
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
          headers: {
              'Content-Type': 'application/json',
          },
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
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
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