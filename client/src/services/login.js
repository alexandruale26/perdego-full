import axios from "axios";
import { BASE_URL } from "./config";

export default async (credentials) => {
  try {
    const response = await axios.post(`${BASE_URL}/users/login`, credentials, {
      withCredentials: true,
    });

    if (response.data) return response.data;
  } catch (error) {
    return error.response.data;
  }
};
