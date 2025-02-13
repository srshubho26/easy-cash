import { useContext } from "react";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { FiLogOut } from "react-icons/fi";
import { GiCash, GiExpense } from "react-icons/gi";
import { Link } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";

const linkCss = "flex items-center gap-3 border border-prime rounded-md px-4 py-2 hover:bg-prime hover:text-lite transition-colors";

const Home = () => {
    const {logout} = useContext(AuthContext);

    return (<section className="h-screen flex justify-center items-center">
        <div className="max-w-screen-md text-xl w-full border border-stroke rounded-md p-5 grid grid-cols-3 gap-5 text-center text-prime font-semibold">
            <Link className={linkCss} to="/send-money">
            <FaMoneyBillTransfer className="text-5xl" />
            <span>Send Money</span>
            </Link>

            <Link className={linkCss} to="/cash-in">
            <GiCash className="text-5xl" />
            <span>Cash In</span>
            </Link>

            <Link className={linkCss}>
            <GiExpense className="text-5xl" />
            <span>Cash Out</span>
            </Link>

            <button className={linkCss} onClick={logout}>
            <FiLogOut className="text-5xl" />
            <span>Log Out</span>
            </button>
        </div>
    </section>);
};

export default Home;