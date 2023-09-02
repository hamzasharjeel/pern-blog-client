import React, { useEffect } from 'react'
import { useProfile } from '../contexts/profileContext'
import { useUser } from '../contexts/userContext';
import { Navigate } from 'react-router-dom';

const ProfilePage = () => {
    const {profile} = useProfile();
    const { user } = useUser();
    useEffect(()=> {
        console.log(profile);
    });
    if(!user){
        return <Navigate to='/signup'/>
    }
    else if(!profile){
        return <Navigate to='/create-profile'/>
    }
  return (
    <div>
      <section className="text-gray-600 body-font">
  <div className="container mx-auto flex px-5 py-24 items-center justify-center flex-col">
    <img className="lg:w-2/6 md:w-3/6 w-5/6 mb-10 object-cover object-center rounded" alt="hero" src="https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dGVjaG5vbG9neXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60" />
    <div className="text-center lg:w-2/3 w-full">
      <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">    status: {profile?.data.profile.status} || Age: {profile?.data.profile.age} || email: {user?.user.email} ||Role: {user?.user.isAdmin ? 'Admin': 'User'} || Profesion {profile?.data.profile.profesion}</h1>
      <p className="mb-8 leading-relaxed">Meggings kinfolk echo park stumptown DIY, kale chips beard jianbing tousled. Chambray dreamcatcher trust fund, kitsch vice godard disrupt ramps hexagon mustache umami snackwave tilde chillwave ugh. Pour-over meditation PBR&amp;B pickled ennui celiac mlkshk freegan photo booth af fingerstache pitchfork.</p>
    </div>
  </div>
</section>

    </div>
  )
}

export default ProfilePage
