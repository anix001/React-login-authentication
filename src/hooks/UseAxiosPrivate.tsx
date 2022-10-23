
import { useEffect } from 'react';
import { axiosPrivate } from '../api/axios';
import { useAuthContext } from '../context/AuthProvider';
import UseRefreshToken from './UseRefreshToken'

const UseAxiosPrivate = () => {
    const refresh = UseRefreshToken();
    const { auth } = useAuthContext();

    useEffect(() => {

        const requestIntercept = axiosPrivate.interceptors.request.use(
            config => {
                if (config.headers!.Authorization) {
                    config.headers!.Authorization = `Bearer ${auth?.accessToken}`;
                }
                return config;
            }, function (error) {
                return Promise.reject(error);
            }
        )

        const responseInterceptor = axiosPrivate.interceptors.response.use(
            response => response,
            async (error) => {
                const prevRequest = error?.config;
                if (error?.response?.status === 403 && !prevRequest?.sent) {
                    prevRequest.sent = true;
                    const newAccessToken = await refresh();
                    prevRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                    return axiosPrivate(prevRequest);
                }
                return Promise.reject(error);
            }
        )
        return () => {
            axiosPrivate.interceptors.request.eject(requestIntercept);
            axiosPrivate.interceptors.response.eject(responseInterceptor);
        }

    }, [auth, refresh])

    return axiosPrivate;
}

export default UseAxiosPrivate