import { useEffect, useState } from "react";
import useAxiosWithCredentials from "./useAxiosWithCredentials";

const useIsUser = () => {
    const [isUser, setIsUser] = useState(false);
    const [loading, setLoading] = useState(true);
    const axiosSecure = useAxiosWithCredentials();

    useEffect(()=>{
        const loadUser = async()=>{
            const res= await axiosSecure("/is-user");
            setIsUser(res?.data?.isUser);
            setLoading(false);
        }
        loadUser();
    }, [axiosSecure])

    return {isUser, loading}
};

export default useIsUser;