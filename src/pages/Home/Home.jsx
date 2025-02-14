import { useContext, useEffect, useState } from "react";
import { FaMoneyBillTransfer, FaUsersBetweenLines, FaUsersGear } from "react-icons/fa6";
import { FiLogOut } from "react-icons/fi";
import { GiCash, GiExpense } from "react-icons/gi";
import { Link } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import { MdOutlineAccountBalanceWallet } from "react-icons/md";
import useAxiosWithCredentials from "../../hooks/useAxiosWithCredentials";

const linkCss = "flex items-center gap-3 border border-prime rounded-md px-4 py-2 hover:bg-prime hover:text-lite transition-colors";

const Home = () => {
    const { logout, user } = useContext(AuthContext);

    const [checkBalance, setCheckBalance] = useState(false);
    const [loading, setLoading] = useState(false);
    const [balance, setBalance] = useState(0);
    const axiosSecure = useAxiosWithCredentials();

    useEffect(() => {
        if (!checkBalance) return;
        setLoading(true);
        const loadBalance = async () => {
            const res = await axiosSecure("/balance");
            setBalance(res?.data?.balance);
            setLoading(false);
            setTimeout(() => {
                setCheckBalance(false);
            }, 5000);
        }
        loadBalance();
    }, [axiosSecure, checkBalance]);

    const handleCheckBalance = () => {
        setCheckBalance(true);
    }

    return (<section className="max-w-screen-md mx-auto h-screen flex flex-col justify-center items-center">
        <div className="w-full mb-10">
            <button
                className={(checkBalance ? '' : 'hover:text-stroke') + ' rounded-full text-lite px-5 py-2 flex gap-3 items-center text-lg bg-prime'}
                onClick={handleCheckBalance}
            >
                <MdOutlineAccountBalanceWallet className="text-4xl" />

                <span>
                    {loading ? "Loading..." : <>{checkBalance ? `tk. ${balance}` : 'Balance Inquiry'}</>}
                </span>
            </button>
        </div>

        <div className="text-xl w-full border border-stroke rounded-md p-5 grid grid-cols-3 gap-5 text-center text-prime font-semibold">
            {user?.ac_type === 'user' && <>
                <Link className={linkCss} to="/send-money">
                    <FaMoneyBillTransfer className="text-5xl" />
                    <span>Send Money</span>
                </Link>

                <Link className={linkCss} to="/cash-out">
                    <GiExpense className="text-5xl" />
                    <span>Cash Out</span>
                </Link>
            </>}
            {user?.ac_type === 'agent' && <Link className={linkCss} to="/cash-in">
                <GiCash className="text-5xl" />
                <span>Cash In</span>
            </Link>}
             
            {user?.ac_type === 'admin' && <>
                <Link className={linkCss} to="/users">
                    <FaUsersBetweenLines className="text-5xl" />
                    <span>Users</span>
                </Link>

                <Link className={linkCss} to="/agents">
                    <FaUsersGear className="text-5xl" />
                    <span>Agents</span>
                </Link>
            </>}

            <button className={linkCss} onClick={logout}>
                <FiLogOut className="text-5xl" />
                <span>Log Out</span>
            </button>
        </div>
    </section>);
};

export default Home;