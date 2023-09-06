import React from 'react'
import { useUser } from '../contexts/userContext'
import { Link } from 'react-router-dom'
import { Button } from 'antd'
const Navbar = () => {
    const {user, setUser} = useUser();
    console.log(user);
  return (
    <div>
      <header className="text-gray-600 body-font bg-black">
  <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
    <Link to='/' className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
      
      <span className="ml-3 text-xl text-white">SharjeelsBlog</span>
    </Link>
    <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
      <Link to='/users' className="mr-5 text-white">Users</Link>
      <Link to='/admin-page' className="mr-5 text-white">Admins</Link>
      <Link to='/create-profile' className="mr-5 text-white">Create You Profile</Link>
      <Link to='/blogs' className="mr-5 text-white">Blogs</Link>
      <Link to='/create-blogs' className="mr-5 text-white">Create Your Blog</Link>
    </nav>
    {
        user === null ? <div className='gap-5 flex justify-between'>
          <Button className='bg-white'>
            <Link to='/signup'>
            signup as user
      </Link>
          </Button>
        <Button className='bg-white'>
           <Link to='admin-signup'>signup as an admin
        
      </Link>
        </Button>
     
        </div>: <>
        <Button onClick={_=> setUser(null)} className="bg-white">
        logout
        
      </Button>
      
        </>
    }
  </div>
</header>
    </div>
  )
}

export default Navbar
