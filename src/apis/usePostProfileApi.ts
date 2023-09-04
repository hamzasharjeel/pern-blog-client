import axios from "axios";

export const usePostProfileApi = async (postData: any, user: any) => {
  const res = await axios.post(
    "https://pern-backend-blog-server.onrender.com/api/create-profile",
    {
      status: postData.status,
      profesion: postData.profesion,
      age: postData.age,
    },
    {
      headers: {
        Authorization: `${user?.token}`,
      },
    }
  );
  return res;
};
