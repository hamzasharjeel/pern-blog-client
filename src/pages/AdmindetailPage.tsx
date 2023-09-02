import React, { useEffect, useState } from 'react'
import { useUser } from '../contexts/userContext';
import axios from 'axios';
import { Navigate, useParams } from 'react-router-dom';
import CreateProfilePage from './CreateProfilePage';

const AdmindetailPage = ({user}: any) => {
    const [admin, setAdmin] = useState<{email: String, password: String, isAdmin: Boolean, id: Number }>({
        email: '', password: '', isAdmin: false, id: 0
    });
    const [error, setError] = useState<Boolean>(false);
    const [loader, setLoader] = useState<Boolean>(true);
    const {id} = useParams();
    
    useEffect(()=>{
        const fetchAdmin = async ()=> {
            try {
                const admin = await axios.get('https://pern-backend-blog-server.onrender.com/api/admins/' + id, {
                    headers: {
                        Authorization: `${user?.token}`
                    }
                });
                console.log(admin, 'iam')
                setAdmin(admin.data.admin);
                setLoader(false);
            } catch (error: any) {
                console.log(error.message);
                setError(false);
            }
        }
        fetchAdmin();
    },[]);
    if(!user || !user.user.isAdmin){
        return <Navigate to='/admin-signin'/>
    }
    if(loader){
        return <>loading...</>
    }
    else if(error){
        return <>erorr..</>
    }
  return (
    <div>
        <section className="text-gray-600 body-font">
  <div className="container mx-auto flex px-5 py-24 items-center justify-center flex-col">
    <img className="lg:w-2/6 md:w-3/6 w-5/6 mb-10 object-cover object-center rounded" alt="hero" src="https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dGVjaG5vbG9neXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60" />
    <div className="text-center lg:w-2/3 w-full">
      <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">{admin?.email}</h1>
      <p className="mb-8 leading-relaxed">Meggings kinfolk echo park stumptown DIY, kale chips beard jianbing tousled. Chambray dreamcatcher trust fund, kitsch vice godard disrupt ramps hexagon mustache umami snackwave tilde chillwave ugh. Pour-over meditation PBR&amp;B pickled ennui celiac mlkshk freegan photo booth af fingerstache pitchfork.</p>
      
    </div>
  </div>
</section>

    </div>
  )
}

export default AdmindetailPage
