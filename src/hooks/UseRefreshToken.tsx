import axios from "../api/axios"
import { useAuthContext } from "../context/AuthProvider"

const UseRefreshToken = () => {
    const {setAuth} = useAuthContext();

    const refresh = async()=>{
        const response:any  = await axios.get('/refresh',{
            withCredentials: true
        });
        setAuth((prev:any)=>{
            console.log(JSON.stringify(prev));
            console.log(response.data.accessToken);
            return {...prev, accessToken: response?.data?.accessToken}
        })
        return response?.data?.accessToken;
    }
  return refresh;
}

export default UseRefreshToken