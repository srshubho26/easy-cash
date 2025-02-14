import PropTypes from 'prop-types';
import { Button, Modal, Tooltip } from 'flowbite-react';
import { useNavigate } from 'react-router-dom';

const theme = {
    "color": {
        "prime": "border border-prime bg-transparent hover:bg-prime text-prime hover:text-lite"
    }
}

const TransInfoModal = ({ openModal, setOpenModal, details }) => {
    const navigate = useNavigate();

    return (<Modal dismissible show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Transaction Details</Modal.Header>
        <Modal.Body>
            <div className='text-lg'>
                <p className='flex gap-3'>
                    <strong>Amount: </strong>
                    <span>{details?.amount} tk.</span>
                </p>
                <p className='flex gap-3'>
                    <strong>{details?.agent ? 'Agent' : 'User'}: </strong>
                    <span>{details?.agent || details?.user}</span>
                </p>

                <Tooltip content={details?.trxId}>
                    <p className='flex gap-3'>
                        <strong>Trx ID: </strong>
                        <span>{details?.trxId?.substr(0, 20)}...</span>
                    </p>
                </Tooltip>
            </div>
        </Modal.Body>
        <Modal.Footer>
            <Button theme={theme} color="prime" className="transition-colors" onClick={() => {
                setOpenModal(false);
                navigate("/");
            }}>
                Go To Homepage
            </Button>
        </Modal.Footer>
    </Modal>);
};

TransInfoModal.propTypes = {
    openModal: PropTypes.bool,
    setOpenModal: PropTypes.func,
    details: PropTypes.object
};

export default TransInfoModal;