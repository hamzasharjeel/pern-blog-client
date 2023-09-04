import axios from "axios";

const useGetUsersApi = async(user: any) => {
    const users = await axios.get("https://pern-backend-blog-server.onrender.com/api/users", {
          headers: {
            Authorization: `${user?.token}`,
          },
        });
        return users.data.users;
}

export default useGetUsersApi
