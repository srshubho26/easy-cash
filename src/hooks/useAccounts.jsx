import PropTypes from 'prop-types';
import { useCallback, useEffect, useState } from 'react';
import useAxiosWithCredentials from './useAxiosWithCredentials';

const useAccounts = (type='user', searchByPhone="") => {
    const [accounts, setAccounts] = useState([]);
    const [loading, setLoading] = useState(true);
    const axiosSecure = useAxiosWithCredentials();


    const loadAccounts = useCallback(()=>{
        setLoading(true);
        const load = async()=>{
            let query = `?type=${type}`;
            if(searchByPhone)query+=`&phone=${searchByPhone}`;
            const res = await axiosSecure(`/accounts${query}`);
            setAccounts(res?.data);
            setLoading(false);
        }
        load();
    }, [type, axiosSecure, searchByPhone])

    useEffect(()=>{
        loadAccounts();
    }, [loadAccounts])


    return {accounts, loading, loadAccounts}
};

useAccounts.propTypes = {
    type: PropTypes.string,
    searchByPhone: PropTypes.string
};

export default useAccounts;