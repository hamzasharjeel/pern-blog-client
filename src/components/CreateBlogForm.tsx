import { useState, useEffect } from "react";
import { useUser } from "../contexts/userContext";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useMutation } from '@tanstack/react-query';
import axios from "axios";
import { usePostBlogsApi } from "../apis/usePostBlogsApi";
import { Skeleton, message  } from 'antd';

const CreateBlogForm = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );
  const [blogCredentials, setblogCredentials] = useState<{
    title: String,
    description: String
  }>({
    title: "",
    description: "",
  });
  const handleOnChange = (e: any) => {
    const { name, value } = e.target;
    setblogCredentials((prevState) => ({ ...prevState, [name]: value }));
  };
  const { mutate, isLoading } = useMutation(()=> usePostBlogsApi(blogCredentials, user), {
    onSuccess: (data) => {
      if (data.status === 200) {
        message.success("blog created successfully");
        navigate("/blogs");
      }
    }
  })
  const handleOnSubmit = async (e: any) => {
    e.preventDefault();
     
    try {
      mutate();
    } catch (error: any) {
      message.error(error.message);
      console.log(error.message);
    }
  };
  if(!user){
    return <Navigate to='/signup'/>
  }
  else if(isLoading){
    return <Skeleton/>
  }

  return (
    <div>
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            create your blog
          </h2>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            onSubmit={handleOnSubmit}
            className="space-y-6"
            action="#"
            method="POST"
          >
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                title
              </label>
              <div className="mt-2">
                <input
                  onChange={(e) => handleOnChange(e)}
                  id="name"
                  name="title"
                  type="text"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  description
                </label>
              </div>
              <div className="mt-2">
                <input
                  onChange={(e) => handleOnChange(e)}
                  id="profesion"
                  name="description"
                  type="text"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                create
              </button>
            </div>
          </form>
          <p className="mt-10 text-center text-sm text-gray-500">
            want to update
            <Link
              to="/update-profile"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              update
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CreateBlogForm;
