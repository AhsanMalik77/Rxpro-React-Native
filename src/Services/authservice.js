// src/services/authService.js
const BASE_URL = 'http://192.168.1.30:5150/api'; 

export const loginUser = async (email, password) => {
  try {
    // Aapka backend HttpGet("Login") use kar raha hai aur params URL mein mang raha hai
    const url = `${BASE_URL}/Signin/Login?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`;
    
    const response = await fetch(url, {
      method: 'GET', // Backend mein [HttpGet] hai isliye yahan GET aayega
      headers: {
        'Accept': 'application/json',
      },
    });

    const data = await response.json();

    if (!response.ok) {
      // Backend BadRequest ya NotFound bhej raha hai toh yahan catch hoga
      throw new Error(data || 'Invalid Login');
    }

    return data; // Isme id, nam/namee, aur role wapis milega
  } catch (error) {
    console.error('Login API Error:', error);
    throw error;
  }
};