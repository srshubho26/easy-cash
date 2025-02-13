import { Spinner } from 'flowbite-react';
import PropTypes from 'prop-types';

// const loaderTheme = {
//     "base": "inline animate-spin text-gray-200",
//     "color": {
//         "primary": "fill-primary"
//     }
// }

const Loading = ({ loading }) => {
    return (<div className={(loading ? 'flex' : 'hidden') + ' absolute top-0 left-0 w-full h-full justify-center z-20 items-center bg-[#00000062] rounded-md'}>
        <Spinner size="xl" />
    </div>);
};

Loading.propTypes = {
    loading: PropTypes.bool
};

export default Loading;