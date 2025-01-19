import { createContext, useContext, useState } from "react";
import {jwtDecode} from "jwt-decode";

export const AuthContext = createContext();

export const useAuthContext = () => {
    return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }) => {
    const storedData = JSON.parse(localStorage.getItem("pay-user"));
    let initialAuthUser = null;

    if (storedData?.token) {
        try {
            const decodedToken = jwtDecode(storedData.token); // Decode token to get userId
            initialAuthUser = { _id: decodedToken.userId }; // Assign userId to authUser
        } catch (error) {
            console.error("Error decoding token:", error);
        }
    }

    const [authUser, setAuthUser] = useState(initialAuthUser);

    return (
        <AuthContext.Provider value={{ authUser, setAuthUser }}>
            {children}
        </AuthContext.Provider>
    );
};
