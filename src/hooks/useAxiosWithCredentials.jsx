import axios from "axios";
import swal from "sweetalert";

const withCredentials = axios.create({
    baseURL: 'http://localhost:5000',
    withCredentials: true
});
withCredentials.interceptors.response.use(null, () => {
    swal('Oops!', "Something went wrong!", 'error');
})

const useAxiosWithCredentials = () => {
    return withCredentials;
};

export default useAxiosWithCredentials;