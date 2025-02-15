import { useContext, useEffect, useState } from "react";
import useIsAdmin from "../../hooks/useIsAdmin";
import Loading from "../../components/reusuable/Loading";
import HomeBtn from "../../components/reusuable/HomeBtn";
import TransactionsTable from "../../components/reusuable/TransactionsTable";
import { AuthContext } from "../../providers/AuthProvider";
import useAxiosWithCredentials from "../../hooks/useAxiosWithCredentials";
import { useNavigate } from "react-router-dom";

const MyTransactions = () => {
    const { user } = useContext(AuthContext);
    const { isAdmin, loading: isAdminLoading } = useIsAdmin();
    const [transactions, setTransactions] = useState(null);
    const [loading, setLoading] = useState(false);
    const axiosSecure = useAxiosWithCredentials();
    const navigate = useNavigate();

    useEffect(() => {
        if (isAdmin) navigate('/');
    }, [isAdmin, navigate]);

    useEffect(() => {
        setLoading(true);
        const loadTransactions = async () => {
            const res = await axiosSecure('/my-transactions');
            setTransactions(res?.data);
            setLoading(false);
        }
        loadTransactions();
    }, [axiosSecure])

    return (<section className="py-10 max-w-screen-xl mx-auto min-h-screen flex flex-col justify-center items-center relative">
        <Loading loading={loading || isAdminLoading} />

        {!loading && <>
            <h2 className="text-prime font-bold text-3xl mb-5">My Transactions</h2>

            <div className="w-full mb-5 flex gap-2">
                <HomeBtn />
            </div>

            <TransactionsTable transactions={transactions} email={user.email} />
        </>}
    </section>);
};

export default MyTransactions;