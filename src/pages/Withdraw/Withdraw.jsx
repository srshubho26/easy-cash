import { useState } from "react";
import swal from "sweetalert";
import Loading from "../../components/reusuable/Loading";
import { Button, Label, TextInput } from "flowbite-react";
import useAxiosWithCredentials from "../../hooks/useAxiosWithCredentials";
import { useNavigate } from "react-router-dom";
import HomeBtn from "../../components/reusuable/HomeBtn";

const theme = {
    "color": {
        "prime": "border border-prime bg-transparent hover:bg-prime text-prime hover:text-lite"
    }
}

const Withdraw = () => {
    const [loading, setLoading] = useState(false);
    const axiosSecure = useAxiosWithCredentials();
    const navigate = useNavigate();

    const handleSubmit = async e => {
        e.preventDefault();
        const form = e.target;
        const amount = parseInt(form.amount.value);
        if (amount < 100) {
            swal("Wait!", "Minimum withdrawl amount is 100 tk.", "warning");
            return;
        }

        setLoading(true);

        const res = await axiosSecure.post("/withdraw-request", { amount })

        setLoading(false);

        if (res?.data?.err) {
            swal("Error!", res?.data?.message, "error");
            return;
        }

        if (res?.data?.acknowledged) {
            swal("Success", 'Withdrawal request is sent to the admin.', "success")
                .then(() => navigate('/'));
        }
    }

    return (<section className="min-h-screen max-w-lg w-full flex flex-col mx-auto justify-center items-center">
        <div className="w-full mb-5 flex justify-between items-center gap-2">
            <h2 className="text-prime font-bold text-2xl">Withdraw Money</h2>

            <HomeBtn />
        </div>

        <form onSubmit={handleSubmit} className="flex w-full border border-stroke rounded-md p-5 flex-col gap-4 relative">
            <Loading loading={loading} />

            <div>
                <div className="mb-2 block">
                    <Label value="Amount" />
                </div>
                <TextInput type="number" name="amount" placeholder="Send money amount" required />
            </div>

            <Button theme={theme} color="prime" className="transition-colors" type="submit">
                Send Withdraw Request
            </Button>
        </form>
    </section>);
};

export default Withdraw;