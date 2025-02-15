import { useContext, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import swal from "sweetalert";
import Loading from "../../components/reusuable/Loading";
import { Button, Label, TextInput } from "flowbite-react";
import TransInfoModal from "../../components/reusuable/TransInfoModal";
import HomeBtn from "../../components/reusuable/HomeBtn";

const theme = {
    "color": {
        "prime": "border border-prime bg-transparent hover:bg-prime text-prime hover:text-lite"
    }
}

const CashIn = () => {
    const { cashIn } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [modalDetails, setModalDetails] = useState(null);

    const handleSubmit = async e => {
        e.preventDefault();
        const form = e.target;
        const user = form.user.value;
        const amount = parseInt(form.amount.value);
        const pin = form.pin.value;
        if (amount < 100) {
            swal("Wait!", "You can't cash in less than 100 tk.", "warning");
            return;
        }

        const isConfirmed = await swal({
            title: "Are you sure?",
            text: `Your are going to proceed cash in ${amount}tk to ${user}.`,
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
        if (!isConfirmed) return;
        setLoading(true);

        const res = await cashIn({ user, amount, pin });

        setLoading(false);

        if (res?.acknowledged) {
            setOpenModal(true);
            setModalDetails({ trxId: res?.trxId, user, amount });
            form.reset();
            return;
        }

        if (res?.err) {
            swal("Error!", res?.message, "error");
            return;
        }
    }

    return (<section className="min-h-screen max-w-lg mx-auto w-full flex flex-col justify-center items-center">
            <div className="w-full mb-5 flex justify-between items-center gap-2">
                <h2 className="text-prime font-bold text-2xl">Cash In</h2>
    
                <HomeBtn />
            </div>

        <form onSubmit={handleSubmit} className="flex w-full border border-stroke rounded-md p-5 flex-col gap-4 relative">
            <Loading loading={loading} />

            <div>
                <div className="mb-2 block">
                    <Label value="Enter user's phone no." />
                </div>
                <TextInput name="user" type="text" minLength={11} maxLength={11} placeholder="User's mobile" required />
            </div>

            <div>
                <div className="mb-2 block">
                    <Label value="Amount" />
                </div>
                <TextInput type="number" name="amount" placeholder="Minimum 100 tk" required />
            </div>

            <div>
                <div className="mb-2 block">
                    <Label value="Pin" />
                </div>
                <TextInput name="pin" placeholder="Enter your pin" type="password" minLength={5} maxLength={5} required />
            </div>

            <Button theme={theme} color="prime" className="transition-colors" type="submit">Cash In</Button>
        </form>

        <TransInfoModal openModal={openModal} setOpenModal={setOpenModal} details={modalDetails} />
    </section>);
};

export default CashIn;