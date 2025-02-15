import { Button, Card, Label, TextInput } from "flowbite-react";
import swal from "sweetalert";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../../../components/reusuable/Loading";

const theme = {
    "color": {
        "prime": "border border-prime bg-transparent hover:bg-prime text-prime hover:text-lite"
    }
}

const Login = () => {
    const {login, user} = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(()=>{
        if(user)navigate("/");
    }, [user, navigate])

    const handleSubmit = async e => {
        e.preventDefault();

        const isConfirmed = await swal({
            title: "Warning!",
            text: 'If you are previously logged in to somewhere else, you will be logged out from there.',
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
        if (!isConfirmed) return;
        const form = e.target;
        const email = form.email.value;

        const pin = form.pin.value;

        const payload = { email, pin }

        setLoading(true);

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
    }


    return (<section className="flex flex-col min-h-screen justify-center items-center py-5">
        <h2 className="mb-5 text-prime font-bold text-3xl">Login - Easy Cash</h2>
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

                <Button theme={theme} color="prime" className="transition-colors" type="submit">Login</Button>
            </form>
        </Card>
    </section>);
};

export default Login;