import React, { useContext, createContext } from "react";

export const AuthContext = createContext({
    auth: '',
    setAuth: () => { }
})

export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider = ({ children = <></>, value = { auth: '', setAuth: () => { } } }) => <AuthContext.Provider value={value}>{children}</AuthContext.Provider>