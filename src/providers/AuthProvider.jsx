import PropTypes from 'prop-types';
import { createContext, useEffect, useState } from 'react';
import useAxiosPublic from '../hooks/useAxiosPublic';
import useAxiosWithCredentials from '../hooks/useAxiosWithCredentials';

export const AuthContext = createContext(null);

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosWithCredentials();

    useEffect(()=>{
        const loadData = async()=>{
            const res = await axiosSecure.post('/jwt', {});
            console.log(res.data);
        }
        loadData();
    }, [axiosSecure]);

    const createUser = async data=>{
        const res = await axiosPublic.post("/create-user", data);
        return res.data;
    }

    const login = async payload=>{
        const res = await axiosSecure.post("/login", payload);
        const data = res.data;
        if(!data?.noAcc){
            setUser(data);
        }
        return data;
    }

    return (<AuthContext.Provider value={{createUser, user, login}}>
        {children}
    </AuthContext.Provider>);
};

AuthProvider.propTypes = {
    children: PropTypes.object
};

export default AuthProvider;