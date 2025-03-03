import axios from "axios";

const getUser = async () => {
  const accessToken = localStorage.getItem("accessToken");

  const response = await axios.get(`${import.meta.env.VITE_API_URL}/user/me`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
};

export default getUser;
