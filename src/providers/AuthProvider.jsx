import PropTypes from 'prop-types';
import { createContext, useEffect, useState } from 'react';
import useAxiosPublic from '../hooks/useAxiosPublic';
import useAxiosWithCredentials from '../hooks/useAxiosWithCredentials';
import Loading from '../components/reusuable/Loading';

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosWithCredentials();

    useEffect(() => {
        const loadData = async () => {
            const res = await axiosSecure.post('/jwt', {});
            const _user = res.data;
            if (_user?._id) setUser(_user);
            setLoading(false);
        }
        loadData();
    }, [axiosSecure]);

    const createUser = async data => {
        const res = await axiosPublic.post("/create-user", data);
        return res.data;
    }

    const login = async payload => {
        const res = await axiosSecure.post("/login", payload);
        const data = res.data;
        if (!data?.noAcc) {
            setUser(data);
        }
        return data;
    }

    const logout = async ()=>{
        await axiosSecure.post("/logout");
        setUser(null);
    }

    const sendMoney = async payload=>{
        const res = await axiosSecure.post("/send-money", payload);
        return res.data;
    }

    const cashIn = async payload=>{
        const res = await axiosSecure.post("/cash-in", payload);
        return res.data;
    }

    const cashOut = async payload=>{
        const res = await axiosSecure.post("/cash-out", payload);
        return res.data;
    }

    return (<AuthContext.Provider value={{ createUser, user, login, logout, sendMoney, cashIn, cashOut }}>
        <div className='w-full h-screen relative bg-lite px-2'>
            <Loading loading={loading} />
            {!loading && children}
        </div>
    </AuthContext.Provider>);
};

AuthProvider.propTypes = {
    children: PropTypes.object
};

export default AuthProvider;