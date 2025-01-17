import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from "../context/AuthContext";

export const Appbar = ({ firstName }) => {
    const navigate = useNavigate();
    const { setAuthUser } = useAuthContext();

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('pay-user');
        setAuthUser(null);
        navigate('/signin');
    };

    return (
        <div className="shadow h-14 flex justify-between items-center px-4">
            <div className="flex flex-col justify-center h-full">
                PayTM App
            </div>
            <div className="flex items-center">
                <div className="flex flex-col justify-center h-full mr-4">
                    Hello, {firstName}
                </div>
                <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                    <div className="flex flex-col justify-center h-full text-xl">
                        {firstName ? firstName[0].toUpperCase() : 'U'}
                    </div>
                </div>
                <button
                    onClick={handleLogout}
                    className="ml-4 px-4 py-2 bg-red-500 text-white rounded-lg"
                >
                    Logout
                </button>
            </div>
        </div>
    );
};