import { Link, Navigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useGetAdminsApi from "../apis/useGetAdminsApi";
import { Skeleton, message  } from 'antd';

const AdminPage = ({ user }: any) => {
  const {
    data: admins,
    isLoading,
    isError,
  } = useQuery(["admin-page"], () => useGetAdminsApi(user), {
    enabled: !!user,
  });

  if (!user || !user?.user?.isAdmin) {
    return <Navigate to="/admin-signin" />;
  } else if (isLoading) {
    return <Skeleton />;
  } else if (isError) {
    return <>erorr..</>;
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
      {admins?.map((admin: any) => {
        return (
          <Link
            to="/"
            className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
          >
            <h5
              className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
              style={{ wordWrap: "break-word" }}
            >
              {admin.email}
            </h5>
            <Link
              to={"/admin-detail/" + admin.id}
              className="font-normal text-gray-700 dark:text-gray-400"
            >
              admin detail
            </Link>
          </Link>
        );
      })}
    </div>
  );
};

export default AdminPage;
