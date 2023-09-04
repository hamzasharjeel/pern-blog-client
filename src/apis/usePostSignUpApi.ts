import axios from "axios";

export const usePostSignupApi = async (userData: any) => {
    try {
        const res = await axios.post('https://pern-backend-blog-server.onrender.com/api/signup', {
            name: userData.name,
            email: userData.email,
            password: userData.password,
            isAdmin: false
        });
        return res.data
       
    
    } catch (error: any) {
        console.log(error.message);
    }
};
