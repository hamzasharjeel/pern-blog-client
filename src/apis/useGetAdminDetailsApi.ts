import axios from "axios";

const useGetAdminDetailsApi = async(id: String | undefined, user: any) => {
  const admin = await axios.get(
    "https://pern-backend-blog-server.onrender.com/api/admins/" + id,
    {
      headers: {
        Authorization: `${user?.token}`,
      },
    }
  );
  return admin.data.admin;
};

export default useGetAdminDetailsApi;
