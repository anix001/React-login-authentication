import React, { createContext, useContext, useState } from 'react';

interface AuthProviderProps {
    children: React.ReactNode
}
interface AuthContextProps {
    auth: any
    setAuth: React.Dispatch<any>
}

const AuthContext = createContext({} as AuthContextProps);

export const useAuthContext = () => {
    return useContext(AuthContext);
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [auth, setAuth] = useState<any>({});
    console.log("auth values", auth)
    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    )
}