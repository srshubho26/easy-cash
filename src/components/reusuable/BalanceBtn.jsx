import PropTypes from 'prop-types';
import { MdOutlineAccountBalanceWallet } from 'react-icons/md';

const BalanceBtn = ({ showBalace, loadBalance, loading, balance, icon=null, type }) => {
    const _icon = icon || <MdOutlineAccountBalanceWallet className="text-4xl" />;

    const btnTxt = (type==='system_balance' ? 'System Balance' : type==='income' ? 'Income' : 'Balance') + ' Inquiry';

    return (<button
        className={(showBalace ? '' : 'hover:text-stroke') + ' rounded-full text-prime px-5 py-2 flex gap-3 items-center text-lg border border-prime font-semibold'}
        onClick={loadBalance}
    >
        {_icon}

        <span>
            {loading ? "Loading..." : <>{showBalace ? `tk. ${balance.toFixed(2)}` : btnTxt}</>}
        </span>
    </button>);
};

BalanceBtn.propTypes = {
    showBalace: PropTypes.bool,
    loadBalance: PropTypes.func,
    loading: PropTypes.bool,
    type: PropTypes.string,
    balance: PropTypes.number,
    icon: PropTypes.object
};

export default BalanceBtn;