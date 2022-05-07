import axios from "../api/axios"
import useAuth from "./useAuth"

const REFRESH_URL = '/auth/jwt/refresh/'

const useRefreshToken = () => {
    const { auth, setAuth } = useAuth()
    
    const refresh = async () => {
        const response = await axios.post(
            REFRESH_URL,
            JSON.stringify({ 'refresh': auth.refresh}),
            {
                headers: {
                    "Content-Type": "application/json",
                }
            }
        );
        setAuth(prev => {
            // console.log(JSON.stringify(prev))
            // console.log(response.data);
            return { ...prev, 'auth_token': response?.data?.access}
        })
        return response?.data?.access
    }
  return refresh
}

export default useRefreshToken