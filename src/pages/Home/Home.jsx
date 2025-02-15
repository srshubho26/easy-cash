import { useCallback, useContext, useState } from "react";
import { FaMoneyBillTransfer, FaUsers, FaUsersGear } from "react-icons/fa6";
import { FiLogOut } from "react-icons/fi";
import { GiCash, GiExpense, GiPayMoney, GiProfit } from "react-icons/gi";
import { Link } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import { MdOutlinePendingActions } from "react-icons/md";
import useAxiosWithCredentials from "../../hooks/useAxiosWithCredentials";
import { GrMoney, GrTransaction } from "react-icons/gr";
import { BiMoneyWithdraw } from "react-icons/bi";
import { PiHandWithdrawBold } from "react-icons/pi";
import BalanceBtn from "../../components/reusuable/BalanceBtn";
import { CiBank } from "react-icons/ci";

const linkCss = "flex items-center gap-3 border border-prime rounded-md px-4 py-2 hover:bg-prime hover:text-lite transition-colors";
const balances = { balance: false, income: false, system_balance: false }

const Home = () => {
    const { logout, user } = useContext(AuthContext);

    const [showBalace, setShowBalance] = useState({ ...balances });
    const [balanceLoading, setBalanceLoading] = useState({ ...balances });
    const [balance, setBalance] = useState({ balance: 0, income: 0, system_balance: 0 });
    const axiosSecure = useAxiosWithCredentials();

    const loadBalance = useCallback((type) => {
        setBalanceLoading(prev=>({...prev, [type]: true}));
        const load = async () => {
            const res = await axiosSecure(`/balance?type=${type}`);
            setBalance(prev => ({ ...prev, [type]: res?.data[type] }));
            setBalanceLoading(prev=>({...prev, [type]: false}));
            setShowBalance(prev => ({ ...prev, [type]: true }));
            setTimeout(() => {
                setShowBalance(prev => ({ ...prev, [type]: false }));
            }, 5000);
        }
        load();
    }, [axiosSecure])

    return (<section className="py-10 sm:py-2 max-w-4xl mx-auto min-h-screen flex flex-col justify-center items-center">
        <h2 className="text-lite font-bold text-3xl mb-10 rounded-full px-5 py-2 pb-3 bg-prime">
            Easy Cash
            </h2>

        <div className="w-full mb-10 flex flex-wrap items-center justify-center gap-x-2 gap-y-5 sm:justify-between">
            <div className="flex gap-2 flex-wrap justify-center">
                <BalanceBtn showBalace={showBalace.balance} type="balance" loadBalance={() => loadBalance('balance')} loading={balanceLoading.balance} balance={balance.balance} />

                {user?.income && <BalanceBtn type="income" showBalace={showBalace.income} loadBalance={() => loadBalance('income')} loading={balanceLoading.income} balance={balance.income} icon={<GiProfit className="text-4xl" />} />}

                {user?.system_balance && <BalanceBtn type="system_balance" showBalace={showBalace.system_balance} loadBalance={() => loadBalance('system_balance')} loading={balanceLoading.system_balance} balance={balance.system_balance} icon={<CiBank className="text-4xl" />} />}
            </div>

            <div className="bg-prime border border-lite text-lite rounded-md px-5 py-1">
                <h3 className="font-semibold text-2xl">
                    {user.name}
                    {user.ac_type!=='user' && <span className="font-normal ml-2 capitalize">{`(${user.ac_type})`}</span>}
                    </h3>
                <p className="text-lg pb-1">{user.mobile}</p>
            </div>
        </div>

        <div className="text-lg w-full border border-stroke rounded-md p-5 grid sm:grid-cols-2 md:grid-cols-3 gap-5 text-center text-prime font-semibold">
            {user?.ac_type === 'user' && <>
                <Link className={linkCss} to="/send-money">
                    <FaMoneyBillTransfer className="text-4xl" />
                    <span>Send Money</span>
                </Link>

                <Link className={linkCss} to="/cash-out">
                    <GiExpense className="text-4xl" />
                    <span>Cash Out</span>
                </Link>

                <Link className={linkCss} to="/my-transactions">
                    <GrTransaction className="text-4xl" />
                    <span>Transactions</span>
                </Link>
            </>}
            {user?.ac_type === 'agent' && <>
                <Link className={linkCss} to="/cash-in">
                    <GiCash className="text-4xl" />
                    <span>Cash In</span>
                </Link>

                <Link className={linkCss} to="/my-transactions">
                    <GrTransaction className="text-4xl" />
                    <span>Transactions</span>
                </Link>

                <Link className={linkCss} to="/request-money">
                    <GrMoney className="text-4xl" />
                    <span>Request Money</span>
                </Link>

                <Link className={linkCss} to="/withdraw">
                    <BiMoneyWithdraw className="text-4xl" />
                    <span>Withdraw</span>
                </Link>
            </>}

            {user?.ac_type === 'admin' && <>
                <Link className={linkCss} to="/users">
                    <FaUsers className="text-4xl" />
                    <span>Users</span>
                </Link>

                <Link className={linkCss} to="/agents">
                    <FaUsersGear className="text-4xl" />
                    <span>Agents</span>
                </Link>

                <Link className={linkCss} to="/approval-requests">
                    <MdOutlinePendingActions className="text-4xl" />
                    <span>Approval Requests</span>
                </Link>

                <Link className={linkCss} to="/money-requests">
                    <GiPayMoney className="text-4xl" />
                    <span>Money Requests</span>
                </Link>

                <Link className={linkCss} to="/withdraw-requests">
                    <PiHandWithdrawBold className="text-4xl" />
                    <span>Withdraw Requests</span>
                </Link>
            </>}

            <button className={linkCss} onClick={logout}>
                <FiLogOut className="text-4xl" />
                <span>Log Out</span>
            </button>
        </div>
    </section>);
};

export default Home;