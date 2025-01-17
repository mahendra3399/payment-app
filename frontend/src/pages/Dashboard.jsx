import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Appbar } from "../components/Appbar";
import { Balance } from "../components/Balance";
import { Users } from "../components/Users";


export const Dashboard = () => {
    const [balance, setBalance] = useState(0);
    const [firstName, setFirstName] = useState('');

    useEffect(() => {
        const fetchBalance = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:3000/api/v1/account/balance', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                setBalance(parseFloat(response.data.balance).toFixed(2));
            } catch (error) {
                console.error('Error fetching balance:', error);
            }
        };

        fetchBalance();
    }, []);

    useEffect(() => {
        const fetchFirstname = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:3000/api/v1/user/firstname', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                setFirstName(response.data.firstName);
            } catch (error) {
                console.error('Error fetching firstName:', error);
            }
        };

        fetchFirstname();
    }, []);

    return (
        <div>
            <Appbar firstName={firstName} />
            <div className="m-8">
                <Balance value={balance} />
                <Users />
            </div>
        </div>
    );
};