import axios from "axios";

export const usePostAdminSignInApi = async (AdminData: any) => {
  const res = await axios.post(
    "https://pern-backend-blog-server.onrender.com/api/signin",
    {
      email: AdminData.email,
      password: AdminData.password,
    }
  );

  return res;
};
