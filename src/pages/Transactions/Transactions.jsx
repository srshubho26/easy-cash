import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import useAxiosWithCredentials from '../../hooks/useAxiosWithCredentials';
import { useLocation, useParams } from 'react-router-dom';
import Loading from '../../components/reusuable/Loading';
import HomeBtn from '../../components/reusuable/HomeBtn';
import { IoMdArrowBack } from 'react-icons/io';
import TransactionsTable from '../../components/reusuable/TransactionsTable';

const Transactions = () => {
    const [transactions, setTransactions] = useState(null);
    const [loading, setLoading] = useState(false);
    const axiosSecure = useAxiosWithCredentials();
    const { email } = useParams();
    const { state } = useLocation();

    useEffect(() => {
        setLoading(true);
        const loadTransactions = async () => {
            const res = await axiosSecure(`/transactions?email=${email}`);
            setTransactions(res?.data);
            setLoading(false);
        }
        loadTransactions();
    }, [email, axiosSecure])

    return (<section className="py-10 max-w-screen-xl mx-auto min-h-screen flex flex-col justify-center items-center relative">
        <Loading loading={loading} />

        {!loading && <>
            <h2 className="text-prime font-bold text-3xl mb-5">Transactions</h2>

            <div className="w-full mb-5 flex gap-2">
                <HomeBtn />
                {state && <HomeBtn icon={<IoMdArrowBack />} to={state} info="Go Back" />}
            </div>

            <TransactionsTable transactions={transactions} email={email} />
        </>}
    </section>);
};

Transactions.propTypes = {
    email: PropTypes.string
};

export default Transactions;