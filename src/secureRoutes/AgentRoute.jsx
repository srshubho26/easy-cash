import PropTypes from 'prop-types';
import useIsAgent from '../hooks/useIsAgent';
import Loading from '../components/reusuable/Loading';
import { Navigate } from 'react-router-dom';

const AgentRoute = ({children}) => {
    const { isAgent, loading } = useIsAgent();

    if (loading) return <Loading loading={loading} />
    if (!isAgent) return <Navigate to="/" />
    return children;
};

AgentRoute.propTypes = {
    children: PropTypes.object
};

export default AgentRoute;