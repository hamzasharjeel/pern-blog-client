import axios from "axios";

const useGetAdminsApi = async(user: any) => {
    const admins = await axios.get('https://pern-backend-blog-server.onrender.com/api/admins', {
        headers: {
            Authorization: `${user?.token}`
        }
    });
  return admins.data.admins;
};

export default useGetAdminsApi;
