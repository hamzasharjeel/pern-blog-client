import axios from "axios";

export const usePostBlogsApi = async (postData: any, user: any) => {
    const res = await axios.post(
        "https://pern-backend-blog-server.onrender.com/api/create-post",
        {
          title: postData.title,
          description: postData.description,
        },
        {
          headers: {
            Authorization: `${user?.token}`,
          },
        }
      );
  return res;
};
