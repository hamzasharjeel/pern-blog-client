import { Link, Navigate } from "react-router-dom";
import useGetUsersApi from "../apis/useGetUsersApi";
import { useQuery } from '@tanstack/react-query';
import { Skeleton, Alert  } from 'antd';

const Userspage = ({ user }: any) => {
  const {
    data: users,
    isLoading,
    isError,
  } = useQuery(["admin-page"], () => useGetUsersApi(user), {
    enabled: !!user,
  });

  if (!user) {
    return <Navigate to="/signin" />;
  } else if (isLoading) {
    return <Skeleton/>;
  } else if (isError) {
    return <Alert
    message="Error Text"
    description="Error Description Error Description Error Description Error Description Error Description Error Description"
    type="error"
    closable
  />;
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
      {users?.map((user: any) => {
        return <Link key={user.id} to="/" className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white" style={{wordWrap: 'break-word'}}>{user.email}</h5>
  <Link to={'/users-detail/' + user.id} className="font-normal text-gray-700 dark:text-gray-400">user detail</Link>
</Link>

        
      })}
    </div>
  );
};

export default Userspage;
