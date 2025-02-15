import PropTypes from 'prop-types';
import { createContext, useEffect, useState } from 'react';
import useAxiosPublic from '../hooks/useAxiosPublic';
import useAxiosWithCredentials from '../hooks/useAxiosWithCredentials';
import Loading from '../components/reusuable/Loading';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosWithCredentials(setUser);
    const navigate = useNavigate();

    useEffect(() => {
        const loadData = async () => {
            const res = await axiosSecure.post('/jwt', {});
            const _user = res?.data;
            if (_user?._id) setUser(_user);
            setLoading(false);
        }
        loadData();
    }, [axiosSecure, navigate]);

    const createUser = async data => {
        const res = await axiosPublic.post("/create-user", data);
        return res.data;
    }

    const login = async payload => {
        const res = await axiosSecure.post("/login", payload);
        const data = res?.data;
        if (!data?.restricted && !data?.noAcc) {
            console.log('entered', data)
            setUser(data);
        }
        return data;
    }

    const logout = async () => {
        setLoading(true);
        await axiosSecure.post("/logout");
        setUser(null);
        setLoading(false);
    }

    const sendMoney = async payload => {
        const res = await axiosSecure.post("/send-money", payload);
        return res.data;
    }

    const cashIn = async payload => {
        const res = await axiosSecure.post("/cash-in", payload);
        return res.data;
    }

    const cashOut = async payload => {
        const res = await axiosSecure.post("/cash-out", payload);
        return res.data;
    }

    const requestMoney = async () => {
        const res = await axiosSecure.post("/request-money", {});
        return res.data;
    }

    return (<AuthContext.Provider value={{ setUser, createUser, user, login, logout, sendMoney, cashIn, cashOut, requestMoney }}>
        <div className='w-full min-h-screen relative bg-lite px-2 py-10'>
            <Loading loading={loading} />
            {!loading && children}
        </div>
    </AuthContext.Provider>);
};

AuthProvider.propTypes = {
    children: PropTypes.object
};

export default AuthProvider;