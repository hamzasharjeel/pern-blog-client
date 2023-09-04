import { useState, useEffect } from "react";
import { useUser } from "../contexts/userContext";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { useProfile } from "../contexts/profileContext";
import { usePostProfileApi } from "../apis/usePostProfileApi";
import { useMutation } from '@tanstack/react-query';
const ProfileCreate = () => {
  const { setProfile } = useProfile();
  const { user } = useUser();
  const navigate = useNavigate();
  const [profileCredentials, setProfileCredentials] = useState<{
    status: String;
    profesion: String;
    age: String;
  }>({
    profesion: "",
    status: "",
    age: "",
  });
  const { mutate } = useMutation(() => usePostProfileApi(profileCredentials, user), {
    onSuccess: (data) => {
      if (data.status === 200) {
        setProfile(data);
        navigate("/profile");
      }
    }
  })
  const handleOnChange = (e: any) => {
    const { name, value } = e.target;
    setProfileCredentials((prevState) => ({ ...prevState, [name]: value }));
  };
  const handleOnSubmit = async (e: any) => {
    e.preventDefault();
    try {
      mutate();
      
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
            create your profile
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
                status
              </label>
              <div className="mt-2">
                <input
                  onChange={(e) => handleOnChange(e)}
                  id="name"
                  name="status"
                  type="text"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="age"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                age
              </label>
              <div className="mt-2">
                <input
                  onChange={(e) => handleOnChange(e)}
                  id="age"
                  name="age"
                  type="age"
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
                  proffesion
                </label>
              </div>
              <div className="mt-2">
                <input
                  onChange={(e) => handleOnChange(e)}
                  id="profesion"
                  name="profesion"
                  type="text"
                  autoComplete="current-password"
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

export default ProfileCreate;
