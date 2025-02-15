import { RiEmotionSadLine } from "react-icons/ri";
import { Link } from "react-router-dom";

const Error404 = () => {
    return (<section className="min-h-screen bg-lite p-2 flex flex-col gap-3 justify-center items-center text-prime">
        <h2 className="text-8xl"><RiEmotionSadLine /></h2>
        <h2 className="text-4xl font-semibold">404 Not Found!</h2>
        <Link to="/" className="text-lg border border-prime rounded-md px-6 py-2 hover:bg-prime hover:text-lite transition-colors">
        Main Menu
        </Link>
    </section>);
};

export default Error404;