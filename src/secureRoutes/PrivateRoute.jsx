import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { Navigate } from "react-router-dom";
import PropTypes from 'prop-types';

const PrivateRoute = ({children}) => {
    const {user} = useContext(AuthContext);
    if(!user)return <Navigate to="/login"/>
    return children;
};

PrivateRoute.propTypes = {
    children: PropTypes.object
}

export default PrivateRoute;