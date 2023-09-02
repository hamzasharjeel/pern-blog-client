import React, {useEffect} from "react";
import { useUser } from "./contexts/userContext";
import { useProfile } from "./contexts/profileContext";
import { Routes, Route } from 'react-router-dom'
import Homepage from "./pages/Homepage";
import SignupPage from "./pages/SignupPage";
import SigninPage from "./pages/SigninPage";
import AdminSignup from "./pages/AdminSignup";
import AdminSignin from "./pages/AdminSignin";
import AdminPage from "./pages/AdminPage";
import CreateProfilePage from "./pages/CreateProfilePage";
import ProfilePage from "./pages/ProfilePage";
import Blogs from "./pages/Blogs";
import BlogDetail from "./pages/BlogDetail";
import Userspage from "./pages/Userspage";
import UserdetailPage from "./pages/UserdetailPage";
import Navbar from "./components/Navbar";
import AdmindetailPage from "./pages/AdmindetailPage";
import CreateBlog from "./pages/CreateBlog";

export default function App() {
  const {user, setUser} = useUser();
  const {profile} = useProfile();
  useEffect(() => {
    console.log(user, profile);
  }, [])
  
  return <div>
    <Navbar/>
    <Routes>
      <Route path='/' element={<Homepage/>}/> 
      <Route path='/signup' element={<SignupPage/>}/> 
      <Route path='/signin' element={<SigninPage/>}/> 
      <Route path='/admin-signup' element={<AdminSignup/>}/> 
      <Route path='/admin-signin' element={<AdminSignin />}/> 
      <Route path='/admin-detail/:id/' element={<AdmindetailPage user={user}/>}/> 
      <Route path='/admin-page' element={<AdminPage user={user}/>}/> 
      <Route path='/create-profile' element={<CreateProfilePage/>}/> 
      <Route path='/create-blogs' element={<CreateBlog/>}/> 
      <Route path='/profile' element={<ProfilePage/>}/> 
      <Route path='/blogs' element={<Blogs user={user}/>}/> 
      <Route path='/blog-detail/:id' element={<BlogDetail user={user}/>}/> 
      <Route path='/users' element={<Userspage user={user}/>}/> 
      <Route path='/users-detail/:id' element={<UserdetailPage user={user}/>}/> 
    </Routes>
  </div>;
}
