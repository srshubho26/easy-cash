import { Outlet } from "react-router-dom";
import AuthProvider from "../providers/AuthProvider";

const Main = () => {

    return (<AuthProvider>
        <Outlet />
    </AuthProvider>);
};

export default Main;