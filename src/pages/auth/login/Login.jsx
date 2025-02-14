import { Button, Card, Label, TextInput } from "flowbite-react";
import swal from "sweetalert";
import { useContext, useState } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../../../components/reusuable/Loading";

const Login = () => {
    const {login} = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async e => {
        e.preventDefault();
        setLoading(true);
        const form = e.target;
        const email = form.email.value;

        const pin = form.pin.value;

        const payload = { email, pin }
        const res = await login(payload);
        setLoading(false);
        if(res?.noAcc){
            swal("Error!", res.message, "error");
            return;
        }

        if(res?.restricted){
            swal("Wait!", res.message, "warning");
            return;
        }
        navigate("/");
    }


    return (<section className="flex h-screen justify-center items-center">
        <Card className="max-w-sm w-full mx-auto relative">
        <Loading loading={loading} />

            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <div>
                    <div className="mb-2 block">
                        <Label value="Email" />
                    </div>
                    <TextInput name="email" type="email" placeholder="Enter Your Email" required />
                </div>

                <div>
                    <div className="mb-2 block">
                        <Label value="Pin" />
                    </div>
                    <TextInput name="pin" placeholder="Enter your pin" type="password" minLength={5} maxLength={5} required />
                </div>

                <div className="flex items-center gap-2">
                    <Label>Don&apos;t have an account? <Link to="/register">Register</Link></Label>
                </div>

                <Button type="submit">Login</Button>
            </form>
        </Card>
    </section>);
};

export default Login;