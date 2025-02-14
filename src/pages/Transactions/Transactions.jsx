import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import useAxiosWithCredentials from '../../hooks/useAxiosWithCredentials';
import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow, Tooltip } from 'flowbite-react';
import { useLocation, useParams } from 'react-router-dom';
import Loading from '../../components/reusuable/Loading';
import HomeBtn from '../../components/reusuable/HomeBtn';
import { IoMdArrowBack } from 'react-icons/io';

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

    return (<section className="max-w-screen-lg mx-auto min-h-screen flex flex-col justify-center items-center relative">
        <Loading loading={loading} />

        <div className="w-full mb-5 flex gap-2">
            <HomeBtn />
            {state && <HomeBtn icon={<IoMdArrowBack/>} to={state} info="Go Back" />}
        </div>

        {!loading && <div className="overflow-x-auto h-full w-full border border-stroke rounded-md">
            {!transactions?.length ? <h3 className='text-2xl text-prime text-center px-2 py-10'>No Transaction Available!</h3> : <Table>
                <TableHead>
                    <TableHeadCell>Type</TableHeadCell>
                    <TableHeadCell>Amount</TableHeadCell>
                    <TableHeadCell>Charge</TableHeadCell>
                    <TableHeadCell>From</TableHeadCell>
                    <TableHeadCell>To</TableHeadCell>
                    <TableHeadCell>TrxId</TableHeadCell>
                </TableHead>
                <TableBody className="divide-y">
                    {transactions?.map(trans => (<TableRow key={trans?._id} className="even:bg-white text-[#000]">
                        <TableCell className='uppercase text-nowrap'>{trans?.type.replace("-", " ")}</TableCell>
                        <TableCell>{trans?.amount}tk.</TableCell>
                        <TableCell>{trans?.charge}tk.</TableCell>
                        <TableCell className={email === trans?.from ? 'text-prime' : ''}>{trans?.from}</TableCell>
                        <TableCell className={email === trans?.to ? 'text-prime' : ''}>{trans?.to}</TableCell>
                        <TableCell>
                            <Tooltip content={trans?.trxId}>
                                {trans?.trxId.substr(0, 15)}...
                            </Tooltip>
                        </TableCell>
                    </TableRow>))}
                </TableBody>
            </Table>}
        </div>}
    </section>);
};

Transactions.propTypes = {
    email: PropTypes.string
};

export default Transactions;