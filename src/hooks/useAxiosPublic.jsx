import axios from 'axios';
import swal from 'sweetalert';

const axiosPublic = axios.create({
    baseURL : 'http://localhost:5000'
});

axiosPublic.interceptors.response.use(null, () => {
    swal('Oops!', "Something went wrong!", 'error');
})

const useAxiosPublic = () => {
    return axiosPublic
};

export default useAxiosPublic;