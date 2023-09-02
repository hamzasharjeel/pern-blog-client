import React, { useEffect, useState } from 'react'
import { useUser } from '../contexts/userContext'
import { Link, Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminPage = ({user}:any) => {
    const [admins, setAdmins] = useState<{email: String, password: String, isAdmin: Boolean, id: Number []}[]>([]);
    const [error, setError] = useState<Boolean>(false);
    const [loader, setLoader] = useState<Boolean>(true);
    console.log(user, 'is user admin');
    
    useEffect(()=>{
        const fetchAdmin = async ()=> {
            try {
                const admins = await axios.get('https://pern-backend-blog-server.onrender.com/api/admins', {
                    headers: {
                        Authorization: `${user?.token}`
                    }
                });
                setAdmins(admins.data.admins);
                setLoader(false);
                if(admins.status === 200){
                }
            } catch (error: any) {
                console.log(error.message);
                setError(false);
            }
        }
        fetchAdmin();
    },[]);

        if(!user || !user?.user?.isAdmin ){
            return <Navigate to='/admin-signin'/>
        }

 else if(loader){
        return <>loading...</>
    }
    else if(error){
        return <>erorr..</>
    }
  return (
    <div className='grid grid-cols-1 md:grid-cols-6 gap-4'>
      {admins?.map(admin => {
        return <Link to="/" className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white" style={{wordWrap: 'break-word'}}>{admin.email}</h5>
  <Link to={'/admin-detail/' + admin.id} className="font-normal text-gray-700 dark:text-gray-400">admin detail</Link>
</Link>

        
      })}
    </div>
  )
}

export default AdminPage
