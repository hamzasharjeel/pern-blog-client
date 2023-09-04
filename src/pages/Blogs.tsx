import { Link, Navigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useGetBlogsApi from "../apis/useGetBlogsApi";

const Blogs = ({ user }: any) => {
  const {
    data: blogs,
    isLoading,
    isError,
  } = useQuery(["admin-page"], () => useGetBlogsApi(user), {
    enabled: !!user,
  });

  if (!user) {
    return <Navigate to="/signin" />;
  } else if (isLoading) {
    return <>loading...</>;
  } else if (isError) {
    return <>erorr..</>;
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
      {blogs?.map((blog: any) => {
        return (
          <Link
            to="/"
            className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
          >
            <h5
              className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
              style={{ wordWrap: "break-word" }}
            >
              {blog.title}
            </h5>
            <Link
              to={"/blog-detail/" + blog.id}
              className="font-normal text-gray-700 dark:text-gray-400"
            >
              blog detail
            </Link>
          </Link>
        );
      })}
    </div>
  );
};

export default Blogs;
