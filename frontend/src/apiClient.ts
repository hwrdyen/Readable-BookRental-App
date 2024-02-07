import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

type RegisterType = {
  email: string;
  password: string;
};

// login API Request
export const login = async (formData: RegisterType) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/api/users/login`,
      formData,
      {
        // Ensures that cookies are sent and received.
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    throw new Error(
      "An Login API error occurred while processing your request."
    );
  }
};
