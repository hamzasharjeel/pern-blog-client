import axios from "axios";

const useGetBlogsApi = async(user: any) => {
    const blogs = await axios.get("https://pern-backend-blog-server.onrender.com/api/posts", {
          headers: {
            Authorization: `${user?.token}`,
          },
        });  
        return blogs.data.posts;
}

export default useGetBlogsApi
