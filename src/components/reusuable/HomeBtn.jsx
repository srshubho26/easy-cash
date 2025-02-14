import { Tooltip } from "flowbite-react";
import { FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

const HomeBtn = ({icon=null, to="/", info="Go to homepage"}) => {
    const linkIcon = icon || <FaHome/>;
    return (<Tooltip content={info}>
        <Link to={to} className="text-4xl border border-prime rounded-md p-3 block text-prime hover:text-lite hover:bg-prime transition-colors">
            {linkIcon}
        </Link>
    </Tooltip>);
};

HomeBtn.propTypes = {
    icon: PropTypes.object,
    to: PropTypes.string,
    info: PropTypes.string
}

export default HomeBtn;