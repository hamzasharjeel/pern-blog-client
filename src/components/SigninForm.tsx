import {useState} from 'react'
import { useUser } from '../contexts/userContext'
import { Link, useNavigate } from 'react-router-dom' 
import axios from 'axios';
const SignInForm = () => {
    const {user, setUser} = useUser();
    const navigate = useNavigate();
    const [userCredentials, setUserCredentials] = useState<{ email: String, password: String}>({
        email: '',
        password: ''
    });
    const handleOnChange = (e: any) => {
        const { name, value } = e.target;
        setUserCredentials(prevState => ({...prevState, [name]: value}));
    }
    const handleOnSubmit = async(e: any) => {
        e.preventDefault();
        console.log(userCredentials)
        try {
            const res = await axios.post('https://pern-backend-blog-server.onrender.com/api/signin', {
                email: userCredentials.email,
                password: userCredentials.password,
            });
            if(res.status === 200){
                navigate('/users');
            }

        } catch (error: any) {
            console.log(error.message);
        }
    }
  return (
    <div>
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
  <div className="sm:mx-auto sm:w-full sm:max-w-sm">
    <img className="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company" />
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
        <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign up</button>
      </div>
    </form>
    <p className="mt-10 text-center text-sm text-gray-500">
      already a member?
      <Link to="/signin" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">signin</Link>
    </p>
  </div>
</div>

    </div>
  )
}

export default SignInForm
