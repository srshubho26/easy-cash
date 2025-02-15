import { Button, Modal } from 'flowbite-react';
import PropTypes from 'prop-types';
import { useState } from 'react';
import useAxiosWithCredentials from '../../hooks/useAxiosWithCredentials';
import Loading from './Loading';
import swal from 'sweetalert';

const theme = {
    "color": {
        "prime": "border border-prime bg-transparent hover:bg-prime text-prime hover:text-lite"
    }
}

const ViewAccount = ({ openModal, setOpenModal, user, refetch }) => {
    const [loading, setLoading] = useState(false);
    const axiosSecure = useAxiosWithCredentials();
    const isActive = user?.status === 'active';
    const isPending = user?.status === 'pending';
    const isRejected = user?.status === 'rejected';

    const handleStatus = async (act = '') => {
        setLoading(true);
        const action = {
            email: user?.email,
            action: act || (isActive ? 'blocked' : isPending ? 'active' : 'active')
        }

        const res = await axiosSecure.patch("/account-restriction", action);

        if (res?.data?.modifiedCount) {
            swal("Success", "Account modification completed", "success")
                .then(() => {
                    setOpenModal(false);
                    refetch();
                })
        }
        setLoading(false);
    }

    return (
        <Modal dismissible show={openModal} onClose={() => setOpenModal(false)}>
            <Modal.Header>Account Details</Modal.Header>
            <div className='relative'>
                <Modal.Body>
                    <Loading loading={loading} />

                    <div className='text-lg'>
                        <p className='flex gap-3'>
                            <strong>Name: </strong>
                            <span>{user?.name}</span>
                        </p>

                        <p className='flex gap-3'>
                            <strong>Email: </strong>
                            <span>{user?.email}</span>
                        </p>

                        <p className='flex gap-3'>
                            <strong>Mobile: </strong>
                            <span>{user?.mobile}</span>
                        </p>

                        <p className='flex gap-3'>
                            <strong>NID: </strong>
                            <span>{user?.nid}</span>
                        </p>

                        <p className='flex gap-3'>
                            <strong>Current Balance: </strong>
                            <span>{parseFloat(user?.balance).toFixed(2)}tk.</span>
                        </p>

                        {user?.income >= 0 && <p className='flex gap-3'>
                            <strong>Income: </strong>
                            <span>{parseFloat(user?.income).toFixed(2)}tk.</span>
                        </p>}
                    </div>
                </Modal.Body>
            </div>

            <Modal.Footer>
                <Button theme={theme} color="prime" className="transition-colors" onClick={() => {
                    setOpenModal(false);
                }}>
                    Close
                </Button>


                {!isRejected && <Button theme={theme} color="prime" className="transition-colors" onClick={() => handleStatus()}>
                    {isPending ? "Approve Account" : isActive ? 'Block Account' : 'Unblock Account'}
                </Button>}

                {isPending && <Button theme={theme} color="prime" className="transition-colors" onClick={() => handleStatus('rejected')}>
                    Reject Account
                </Button>}
            </Modal.Footer>
        </Modal>
    );
};

ViewAccount.propTypes = {
    openModal: PropTypes.bool,
    setOpenModal: PropTypes.func,
    user: PropTypes.object,
    refetch: PropTypes.func
};

export default ViewAccount;