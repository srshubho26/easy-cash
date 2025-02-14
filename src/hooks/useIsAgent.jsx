import { useEffect, useState } from "react";
import useAxiosWithCredentials from "./useAxiosWithCredentials";

const useIsAgent = () => {
    const [isAgent, setIsAgent] = useState(false);
    const [loading, setLoading] = useState(true);
    const axiosSecure = useAxiosWithCredentials();

    useEffect(()=>{
        const loadUser = async()=>{
            const res= await axiosSecure("/is-agent");
            setIsAgent(res?.data?.isAgent);
            setLoading(false);
        }
        loadUser();
    }, [axiosSecure])

    return {isAgent, loading}
};

export default useIsAgent;