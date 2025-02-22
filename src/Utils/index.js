import axios from "axios";

export const signup = async (user) => {
  try {
    const res = await axios.post("/api/jc/auth/signup", user);
    return res.data.message;
  } catch (error) {
    return error.response.data.message;
  }
};

export const verifyOTP = async (email, otp) => {
  try {
    const res = await axios.post("/api/jc/auth/verify-otp", { email, otp });
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

export const login = async (user) => {
  try {
    const res = await axios.post("/api/jc/auth/login", user);
    return res.data;
  } catch (error) {
    console.log(error)
    return error.response.data;
  }
};
