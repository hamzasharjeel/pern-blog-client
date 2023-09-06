import {useState} from 'react'
import { useUser } from '../contexts/userContext'
import { Link, useNavigate } from 'react-router-dom' 
import { useMutation } from '@tanstack/react-query'
import { usePostAdminSignInApi } from '../apis/usePostAdminSignUpApi';
import { Skeleton, message  } from 'antd';
const AdminSignUpForm = () => {
    const navigate = useNavigate();
    const [adminCredentials, setAdminCredentials] = useState<{ email: String, password: String}>({
        email: '',
        password: ''
    });
    const { mutate, isLoading, isError } = useMutation(usePostAdminSignInApi, {
      onSuccess: (data) => {
        if(data.status === 200){
          message.success("admin registered successfully");
          navigate('/admin-page');
      }
      }
    })
    const handleOnChange = (e: any) => {
        const { name, value } = e.target;
        setAdminCredentials(prevState => ({...prevState, [name]: value}));
    }
    const handleOnSubmit = async(e: any) => {
        e.preventDefault();
        console.log(adminCredentials)
        try {
            mutate(adminCredentials);

        } catch (error: any) {
            console.log(error.message);
            message.error(error.message);
        }
    }
    if(isLoading){
      return <Skeleton/>
    }
  return (
    <div>
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
  <div className="sm:mx-auto sm:w-full sm:max-w-sm">
    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your account</h2>
  </div>
  <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
    <form onSubmit={handleOnSubmit} className="space-y-6" action="#" method="POST">
        <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
            <div className="mt-2">
            <input onChange={e => handleOnChange(e)} id="email" name="email" type="email" autoComplete="email" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            </div>
        </div>
      <div>
        <div className="flex items-center justify-between">
          <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
        </div>
        <div className="mt-2">
          <input onChange={e => handleOnChange(e)} id="password" name="password" type="password" autoComplete="current-password" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
        </div>
      </div>
      <div>
        <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button>
      </div>
    </form>
    <p className="mt-10 text-center text-sm text-gray-500">
      not an admin?
      <Link to="/admin-signup" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">sign up</Link>
    </p>
  </div>
</div>

    </div>
  )
}

export default AdminSignUpForm
