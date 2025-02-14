import PropTypes from 'prop-types';
import useAccounts from '../../hooks/useAccounts';
import { useState } from 'react';
import Loading from './Loading';
import HomeBtn from './HomeBtn';
import swal from 'sweetalert';
import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow, TextInput } from 'flowbite-react';
import ViewAccount from '../../pages/Users/parts/ViewAccount';
import { Link, useLocation } from 'react-router-dom';

const actionBtnCss = "border border-prime rounded-md text-prime font-semibold px-5 py-2 hover:bg-prime hover:text-lite transition-colors";

const Accounts = ({ ac_type = "user" }) => {
    const [searchByPhone, setSearchByPhone] = useState("");
    const { accounts, loading, loadAccounts } = useAccounts(ac_type, searchByPhone);
    const [openModal, setOpenModal] = useState(false);
    const [details, setDetails] = useState(null);
    const { pathname } = useLocation();

    const handleView = user => {
        setOpenModal(true);
        setDetails({ ...user });
    }

    const handleSearch = async e => {
        e.preventDefault();
        const phone = parseInt(e.target.phone.value);
        if (isNaN(phone)) {
            swal("Error", "Invalid Phone Number!", "error");
            return;
        }
        setSearchByPhone(phone);
    }

    return (<section className="max-w-screen-md mx-auto min-h-screen flex flex-col justify-center items-center relative">
        <Loading loading={loading} />

        {!loading && <>
            <div className="w-full mb-5 flex justify-between items-center">
                <HomeBtn />

                <form className='flex gap-2 grow max-w-md' onSubmit={handleSearch}>
                    <TextInput name="phone" minLength={11} maxLength={11} className='grow' placeholder='Search By Phone Number' defaultValue={searchByPhone} />
                    <button className={actionBtnCss}>Search</button>
                    <button className={actionBtnCss} type='button' onClick={()=>setSearchByPhone("")}>Load All</button>
                </form>
            </div>

            <div className="overflow-x-auto w-full border border-stroke rounded-md">
                {!accounts?.length ? <h3 className='text-2xl text-prime text-center px-2 py-10'>No Account Available!</h3> : <Table>
                    <TableHead>
                        <TableHeadCell></TableHeadCell>
                        <TableHeadCell>name</TableHeadCell>
                        <TableHeadCell>Mobile</TableHeadCell>
                        <TableHeadCell>Status</TableHeadCell>
                        <TableHeadCell></TableHeadCell>
                    </TableHead>
                    <TableBody className="divide-y">
                        {accounts?.map((user, i) => (<TableRow key={user._id} className="even:bg-white text-[#000]">
                            <TableCell>{i + 1}</TableCell>
                            <TableCell>{user.name}</TableCell>
                            <TableCell>{user.mobile}</TableCell>
                            <TableCell className="uppercase font-semibold">{user.status}</TableCell>
                            <TableCell>
                                <button
                                    className={actionBtnCss}
                                    onClick={() => handleView(user)}
                                >
                                    View
                                </button>

                                <Link
                                    className={actionBtnCss + ' ml-2'}
                                    to={`/transactions/${user.email}`}
                                    state={pathname}
                                >
                                    Transactions
                                </Link>
                            </TableCell>
                        </TableRow>))}
                    </TableBody>
                </Table>}
            </div>
        </>}

        <ViewAccount openModal={openModal} setOpenModal={setOpenModal} refetch={loadAccounts} user={details} />
    </section>);
};

Accounts.propTypes = {
    ac_type: PropTypes.string
};

export default Accounts;