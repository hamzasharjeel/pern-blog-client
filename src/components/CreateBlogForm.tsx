import { useState, useEffect } from "react";
import { useUser } from "../contexts/userContext";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
const CreateBlogForm = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );
  const [userCredentials, setUserCredentials] = useState<{
    title: String,
    description: String
  }>({
    title: "",
    description: "",
  });
  const handleOnChange = (e: any) => {
    const { name, value } = e.target;
    setUserCredentials((prevState) => ({ ...prevState, [name]: value }));
  };
  const handleOnSubmit = async (e: any) => {
    e.preventDefault();
    console.log(userCredentials);
    console.log(token);
    try {
      const res = await axios.post(
        "https://pern-backend-blog-server.onrender.com/api/create-post",
        {
          title: userCredentials.title,
          description: userCredentials.description,
        },
        {
          headers: {
            Authorization: `${user?.token}`,
          },
        }
      );
      console.log(res)
      if (res.status === 200) {
        navigate("/blogs");
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };
  if(!user){
    return <Navigate to='/signup'/>
  }

  return (
    <div>
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
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
