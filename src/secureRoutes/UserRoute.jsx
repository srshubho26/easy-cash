import PropTypes from 'prop-types';
import useIsUser from '../hooks/useIsUser';
import Loading from '../components/reusuable/Loading';
import { Navigate } from 'react-router-dom';

const UserRoute = ({children}) => {
    const { isUser, loading } = useIsUser();

    if (loading) return <Loading loading={loading} />
    if (!isUser) return <Navigate to="/" />
    return children;
};

UserRoute.propTypes = {
    children: PropTypes.object
};

export default UserRoute;