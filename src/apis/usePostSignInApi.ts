import axios from "axios";

export const usePostSignInApi = async (userData: any) => {
  const res = await axios.post(
    "https://pern-backend-blog-server.onrender.com/api/signin",
    {
      email: userData.email,
      password: userData.password,
    }
  );

  return res;
};
