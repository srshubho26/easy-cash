import { useEffect, useState } from "react";
import useAxiosWithCredentials from "./useAxiosWithCredentials";

const useIsAdmin = () => {
    const [isAdmin, setIsAdmin] = useState(false);
    const [loading, setLoading] = useState(true);
    const axiosSecure = useAxiosWithCredentials();

    useEffect(()=>{
        const loadUser = async()=>{
            const res= await axiosSecure("/is-admin");
            setIsAdmin(res?.data?.isAdmin);
            setLoading(false);
        }
        loadUser();
    }, [axiosSecure])

    return {isAdmin, loading}
};

export default useIsAdmin;