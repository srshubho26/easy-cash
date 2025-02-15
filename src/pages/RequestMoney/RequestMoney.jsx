import { useContext, useState } from "react";
import swal from "sweetalert";
import { AuthContext } from "../../providers/AuthProvider";
import Loading from "../../components/reusuable/Loading";
import { Button } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import HomeBtn from "../../components/reusuable/HomeBtn";

const theme = {
    "color": {
        "prime": "border border-prime bg-transparent hover:bg-prime text-prime hover:text-lite"
    }
}

const RequestMoney = () => {
    const { requestMoney } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async e => {
        e.preventDefault();

        setLoading(true);

        const res = await requestMoney();

        setLoading(false);

        if (res?.acknowledged) {
            swal("Success", 'Your request is sent.', "success")
                .then(() => navigate("/"));
        }
    }

    return (<section className="min-h-screen max-w-lg w-full flex flex-col mx-auto justify-center items-center">
        <div className="w-full mb-5 flex justify-between items-center gap-2">
            <h2 className="text-prime font-bold text-2xl">Request Money</h2>

            <HomeBtn />
        </div>

        <form onSubmit={handleSubmit} className="flex w-full border border-stroke rounded-md p-5 flex-col gap-4 relative">
            <Loading loading={loading} />

            <p className="text-lg mb-5">You can send a request to the admin for recharge.</p>

            <Button theme={theme} color="prime" className="transition-colors" type="submit">Send Request</Button>
        </form>
    </section>);
};

export default RequestMoney;