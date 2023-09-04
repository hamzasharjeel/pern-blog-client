import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Navigate, useParams } from 'react-router-dom';

const BlogDetail = ({user}: any) => {
    const [blog, setBlog] = useState<{title: String, description: String, id: Number }>({
        title: '', description: '', id: 0
    });
    const [error, setError] = useState<Boolean>(false);
    const [loader, setLoader] = useState<Boolean>(true);
    const {id} = useParams();
    
    useEffect(()=>{
        const fetchAdmin = async ()=> {
            try {
                const blog = await axios.get('https://pern-backend-blog-server.onrender.com/api/posts/' + id, {
                    headers: {
                        Authorization: `${user?.token}`
                    }
                });
                console.log(blog, 'iam')
                setBlog(blog.data.post);
                setLoader(false);
            } catch (error: any) {
                console.log(error.message);
                setError(false);
            }
        }
        fetchAdmin();
    },[]);
    if(!user){
        return <Navigate to='/signup'/>
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
      <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">{blog.title}</h1>
      <p className="mb-8 leading-relaxed">{blog.description}</p>
      
    </div>
  </div>
</section>

    </div>
  )
}

export default BlogDetail
