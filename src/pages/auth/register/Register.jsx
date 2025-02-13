import { Button, Card, Checkbox, Label, Select, TextInput } from "flowbite-react";
import bcrypt from "bcryptjs-react";
import swal from "sweetalert";

const Register = () => {
    const handleSubmit = e => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;

        const mobile = form.mobile.value;
        if(isNaN(mobile)){
            swal("Error", "Invalid mobile number", "error");
            return;
            
        }

        const nid = form.nid.value;
        if(isNaN(nid)){
            swal("Error", "Invalid NID", "error");
            return;
        }

        const pinInput = form.pin.value;
        if(isNaN(pinInput)){
            swal("Error", "Invalid PIN", "error");
            return;
        }

        const ac_type = form.ac_type.value;
        var salt = bcrypt.genSaltSync(10);
        let pin = bcrypt.hashSync(pinInput, salt);
        console.log({ name, email, mobile, nid, ac_type, pin })
    }


    return (<section className="flex h-screen justify-center items-center">
        <Card className="max-w-sm w-full mx-auto">
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
                    <Checkbox required />
                    <Label htmlFor="remember">I accept the terms &amp; conditions.</Label>
                </div>

                <Button type="submit">Register</Button>
            </form>
        </Card>
    </section>);
};

export default Register;