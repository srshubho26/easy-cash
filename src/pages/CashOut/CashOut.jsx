import { useContext, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import swal from "sweetalert";
import Loading from "../../components/reusuable/Loading";
import { Button, Label, TextInput } from "flowbite-react";
import TransInfoModal from "../../components/reusuable/TransInfoModal";

const theme = {
    "color": {
        "prime": "border border-prime bg-transparent hover:bg-prime text-prime hover:text-lite"
    }
}

const CashOut = () => {
    const { cashOut } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [modalDetails, setModalDetails] = useState(null);

    const handleSubmit = async e => {
        e.preventDefault();
        const form = e.target;
        const agent = form.agent.value;
        const amount = parseInt(form.amount.value);
        const pin = form.pin.value;
        if (amount < 100) {
            swal("Wait!", "You can't cash out less than 100 tk.", "warning");
            return;
        }

        const charge = amount * (1.5/100)
        const isConfirmed = await swal({
            title: "Are you sure?",
            text: `Your are going to cash out ${amount}tk. It will charge tk. ${charge}`,
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
        if (!isConfirmed) return;
        setLoading(true);

        const res = await cashOut({ agent, amount, pin });

        setLoading(false);

        if (res?.acknowledged) {
            setOpenModal(true);
            setModalDetails({trxId: res?.trxId, agent, amount});
            form.reset();
            return;
        }

        if (res?.err) {
            swal("Error!", res?.message, "error");
            return;
        }
    }

    return (<section className="min-h-screen w-full flex justify-center items-center">
        <form onSubmit={handleSubmit} className="flex max-w-lg w-full border border-stroke rounded-md p-5 flex-col gap-4 relative">
            <Loading loading={loading} />

            <div>
                <div className="mb-2 block">
                    <Label value="Enter agent's phone no." />
                </div>
                <TextInput name="agent" type="text" minLength={11} maxLength={11} placeholder="Agent's mobile" required />
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

            <Button theme={theme} color="prime" className="transition-colors" type="submit">Cash Out</Button>
        </form>

        <TransInfoModal openModal={openModal} setOpenModal={setOpenModal} details={modalDetails}/>
    </section>);
};

export default CashOut;