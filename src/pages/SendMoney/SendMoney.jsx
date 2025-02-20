import { Button, Label, TextInput } from "flowbite-react";
import { useContext, useState } from "react";
import swal from "sweetalert";
import { AuthContext } from "../../providers/AuthProvider";
import Loading from "../../components/reusuable/Loading";
import HomeBtn from "../../components/reusuable/HomeBtn";
import TransInfoModal from "../../components/reusuable/TransInfoModal";

const theme = {
    "color": {
        "prime": "border border-prime bg-transparent hover:bg-prime text-prime hover:text-lite"
    }
}

const SendMoney = () => {
    const { sendMoney } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [modalDetails, setModalDetails] = useState(null);

    const handleSubmit = async e => {
        e.preventDefault();
        const form = e.target;
        const recipient = form.recipient.value;
        const amount = parseInt(form.amount.value);
        if (amount < 50) {
            swal("Wait!", "You can't send money less than 50 tk.", "warning");
            return;
        }

        const isConfirmed = await swal({
            title: "Are you sure?",
            text: `Your are going to send ${amount}tk. ${amount < 100 ? '' : 'It will charge 5 tk.'}`,
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
        if (!isConfirmed) return;
        setLoading(true);

        const res = await sendMoney({ recipient, amount });

        setLoading(false);

        if (res?.acknowledged) {
            setOpenModal(true);
            setModalDetails({ trxId: res?.trxId, user:recipient, amount });
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
            <h2 className="text-prime font-bold text-2xl">Send Money</h2>

            <HomeBtn />
        </div>

        <form onSubmit={handleSubmit} className="flex w-full border border-stroke rounded-md p-5 flex-col gap-4 relative">
            <Loading loading={loading} />

            <div>
                <div className="mb-2 block">
                    <Label value="Enter recipient's phone no." />
                </div>
                <TextInput name="recipient" type="text" minLength={11} maxLength={11} placeholder="Recipient's mobile" required />
            </div>

            <div>
                <div className="mb-2 block">
                    <Label value="Amount" />
                </div>
                <TextInput type="number" name="amount" placeholder="Send money amount" required />
            </div>

            <Button theme={theme} color="prime" className="transition-colors" type="submit">Send</Button>
        </form>
        <TransInfoModal openModal={openModal} setOpenModal={setOpenModal} details={modalDetails} />
    </section>);
};

export default SendMoney;