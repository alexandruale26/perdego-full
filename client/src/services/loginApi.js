import axios from "axios";

export default async (credentials) => {
  try {
    const response = await axios.post(
      "http://localhost:3000/api/v1/users/login",
      credentials,
      {
        withCredentials: true,
      },
    );

    if (response.data) return response.data;
  } catch (error) {
    return error.response.data;
  }
};
