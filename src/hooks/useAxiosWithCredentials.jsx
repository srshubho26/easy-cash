import axios from "axios";
import swal from "sweetalert";

const withCredentials = axios.create({
    baseURL: 'https://easy-cash-server-six.vercel.app',
    withCredentials: true
});

// receiving set_user function as callback
const useAxiosWithCredentials = (callback=null) => {

    withCredentials.interceptors.response.use(null, (err) => {
        const msg = err?.response?.data?.message;
        swal('Error!', (msg || "Something went wrong!"), 'error')
        .then(()=>{
            callback && callback(null);
        })
    })
    return withCredentials;
};

export default useAxiosWithCredentials;