import axios from "axios";

export const usePostAdminSignInApi = async(AdminData: any) => {
  const res = await axios.post(
    "https://pern-backend-blog-server.onrender.com/api/signup",
    {
      name: AdminData.name,
      email: AdminData.email,
      password: AdminData.password,
      isAdmin: true,
    }
  );
  return res;
};
