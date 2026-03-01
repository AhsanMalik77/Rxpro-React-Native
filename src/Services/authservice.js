// src/services/authService.js
const BASE_URL = 'http://192.168.1.9:5150/api'; 

export const loginuser = async (email, password) => {
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

// User Registration ke liye function (Aapka backend mein registration ka endpoint aur method specify nahi hai, toh yahan ek template diya hai)
export const signupuser = async (userdata) => {
  try {
    const url = `${BASE_URL}/Customer/Signup`;
    
    const response = await fetch(url, {
      method: 'POST', // Baray huroof (CAPS) mein likhna behtar hai
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json' // Ye backend ko batata hai ke JSON aa raha hai
      },
      body: JSON.stringify(userdata) // Ye sabse zaroori hai! Data ko pack karke bhej raha hai
    });

    // Jawab ko check karna
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data? data : 'Signup failed');
    }

    return "Ok"; 
  } catch (error) {
    console.error('Registration API Error:', error);
    throw error;
  }
};
export const signupstore = async (storedata) => {
  try {
    const url = `${BASE_URL}/Store/StoreSignup`;
    
    const response = await fetch(url, {
      method: 'POST', // Baray huroof (CAPS) mein likhna behtar hai
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json' // Ye backend ko batata hai ke JSON aa raha hai
      },
      body: JSON.stringify(storedata) // Ye sabse zaroori hai! Data ko pack karke bhej raha hai
    });

    // Jawab ko check karna
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data? data : 'Signup failed');
    }

    return "Ok"; 
  } catch (error) {
    console.error('Registration API Error:', error);
    throw error;
  }
};

