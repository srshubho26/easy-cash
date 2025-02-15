import { useCallback, useEffect, useState } from "react";
import useAxiosWithCredentials from "../../hooks/useAxiosWithCredentials";
import swal from "sweetalert";
import Loading from "../../components/reusuable/Loading";
import HomeBtn from "../../components/reusuable/HomeBtn";
import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "flowbite-react";

const actionBtnCss = "border border-prime rounded-md text-prime font-semibold px-5 py-2 hover:bg-prime hover:text-lite transition-colors";

const WithdrawRequests = () => {
    const [requests, setRequests] = useState(null);
    const [loading, setLoading] = useState(false);
    const axiosSecure = useAxiosWithCredentials();

    const loadReqs = useCallback(() => {
        setLoading(true);
        const load = async () => {
            const res = await axiosSecure("/withdraw-requests");
            setRequests(res?.data);
            setLoading(false);
        }

        load();
    }, [axiosSecure])

    useEffect(() => {
        loadReqs();
    }, [loadReqs])

    const handleApprove = async (id, email, amount) => {
        setLoading(true);
        const res = await axiosSecure.patch("/approve-withdraw-request", { id, email, amount });

        if (res?.data?.acknowledged) {
            swal("Success", "Withdraw request is accepted.", "success");
        }
        setLoading(false);
        loadReqs();
    }

    return (<section className="max-w-screen-md mx-auto min-h-screen flex flex-col justify-center items-center relative">
        <Loading loading={loading} />

        {!loading && <>
            <h2 className="text-prime font-bold text-3xl mb-10 capitalize">Withdraw Requests</h2>

            <div className="w-full mb-5">
                <HomeBtn />
            </div>

            <div className="overflow-x-auto w-full border border-stroke rounded-md">
                {!requests?.length ? <h3 className='text-2xl text-prime text-center py-5 px-2'>No Request Available!</h3> : <Table>
                    <TableHead>
                        <TableHeadCell></TableHeadCell>
                        <TableHeadCell className="text-nowrap">Requested By</TableHeadCell>
                        <TableHeadCell>Amount</TableHeadCell>
                        <TableHeadCell>Status</TableHeadCell>
                        <TableHeadCell></TableHeadCell>
                    </TableHead>
                    <TableBody className="divide-y">
                        {requests?.map((request, i) => (<TableRow key={request._id} className="even:bg-white text-[#000]">
                            <TableCell>{i + 1}</TableCell>
                            <TableCell>{request?.requestedBy}</TableCell>
                            <TableCell>{request?.amount}tk.</TableCell>
                            <TableCell className="uppercase">{request?.status}</TableCell>
                            <TableCell>
                                {request?.status === 'pending' && <button
                                    className={actionBtnCss}
                                    onClick={() => handleApprove(request._id, request?.requestedBy, request?.amount)}
                                >
                                    Approve
                                </button>}
                            </TableCell>
                        </TableRow>))}
                    </TableBody>
                </Table>}
            </div>
        </>}
    </section>);
};

export default WithdrawRequests;