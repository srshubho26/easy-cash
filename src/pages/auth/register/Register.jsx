import { Button, Card, Label, Select, TextInput } from "flowbite-react";
import swal from "sweetalert";
import { useContext, useState } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import Loading from "../../../components/reusuable/Loading";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
    const { createUser } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async e => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;

        const mobile = form.mobile.value;
        if (isNaN(mobile)) {
            swal("Error", "Invalid mobile number", "error");
            return;

        }

        const nid = form.nid.value;
        if (isNaN(nid)) {
            swal("Error", "Invalid NID", "error");
            return;
        }

        const pin = form.pin.value;
        if (isNaN(pin)) {
            swal("Error", "Invalid PIN", "error");
            return;
        }

        const ac_type = form.ac_type.value.toLowerCase();
        const payload = { name, email, mobile, nid, ac_type, pin }
        setLoading(true);
        const res = await createUser(payload);
        setLoading(false);
        if (res?.insertedId) {
            let msg = "Registration has been completed & you got 40 tk bonus. Please login.";
            if(ac_type==='agent'){
                msg = "Thank you for registering. Your account is pending approval.";
            }
            swal("Success", msg, "success")
                .then(() => {
                    navigate("/login");
                })
        }else if(res?.err){
            let msg = "";

            if(res?.duplicateEmail)msg = "Email already exists!";
            else if(res?.duplicateMobile)msg = "Phone number already exists!";
            else if(res?.duplicateNid)msg = "NID is already used!";

            swal("Error", msg, "error");
        }

    }


    return (<section className="flex h-screen justify-center items-center">
        <Card className="max-w-sm w-full mx-auto relative">
            <Loading loading={loading} />

            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <div>
                    <div className="mb-2 block">
                        <Label value="Name" />
                    </div>
                    <TextInput name="name" type="text" placeholder="Enter Your Name" required />
                </div>

                <div>
                    <div className="mb-2 block">
                        <Label value="Email" />
                    </div>
                    <TextInput name="email" type="email" placeholder="Enter Your Email" required />
                </div>

                <div>
                    <div className="mb-2 block">
                        <Label value="Mobile No" />
                    </div>
                    <TextInput name="mobile" type="text" minLength={11} maxLength={11} placeholder="11 digit mobile no." required />
                </div>

                <div>
                    <div className="mb-2 block">
                        <Label value="NID" />
                    </div>
                    <TextInput name="nid" type="text" minLength={10} maxLength={10} placeholder="Enter your 10 digit nid no." required />
                </div>

                <div className="max-w-md">
                    <div className="mb-2 block">
                        <Label value="Account Type" />
                    </div>

                    <Select name="ac_type">
                        <option>User</option>
                        <option>Agent</option>
                    </Select>
                </div>

                <div>
                    <div className="mb-2 block">
                        <Label value="Pin" />
                    </div>
                    <TextInput name="pin" type="password" minLength={5} maxLength={5} required />
                </div>

                <div className="flex items-center gap-2">
                    <Label>Already have an account? <Link to="/login">Login</Link></Label>
                </div>

                <Button type="submit">Register</Button>
            </form>
        </Card>
    </section>);
};

export default Register;