import PropTypes from 'prop-types';
import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow, Tooltip } from 'flowbite-react';
import moment from 'moment';

const TransactionsTable = ({ transactions, email }) => {
    return (<div className="overflow-x-auto h-full w-full border border-stroke rounded-md">
        {!transactions?.length ? <h3 className='text-2xl text-prime text-center px-2 py-5'>
            No Transaction Available!
            </h3> : <Table>
            <TableHead>
                <TableHeadCell>Type</TableHeadCell>
                <TableHeadCell>Amount</TableHeadCell>
                <TableHeadCell>Charge</TableHeadCell>
                <TableHeadCell>From</TableHeadCell>
                <TableHeadCell>To</TableHeadCell>
                <TableHeadCell>Date</TableHeadCell>
                <TableHeadCell>TrxId</TableHeadCell>
            </TableHead>
            <TableBody className="divide-y">
                {transactions?.map(trans => (<TableRow key={trans?._id} className="even:bg-white text-[#000]">
                    <TableCell className='uppercase text-nowrap font-semibold'>
                        {trans?.type.replace("-", " ")}
                    </TableCell>

                    <TableCell>
                        {trans?.amount}tk.
                    </TableCell>

                    <TableCell>
                        {parseFloat(trans?.charge).toFixed(2)}tk.
                    </TableCell>

                    <TableCell className={email === trans?.from ? 'text-prime' : ''}>
                        {trans?.from}
                    </TableCell>

                    <TableCell className={email === trans?.to ? 'text-prime' : ''}>
                        {trans?.to}
                    </TableCell>

                    <TableCell className='text-nowrap'>
                        {moment(trans?.date).format('Do MMM, YYYY | h:mm a')}
                    </TableCell>

                    <TableCell>
                        <Tooltip content={trans?.trxId}>
                            {trans?.trxId.substr(0, 15)}...
                        </Tooltip>
                    </TableCell>
                </TableRow>))}
            </TableBody>
        </Table>}
    </div>);
};

TransactionsTable.propTypes = {
    transactions: PropTypes.array,
    email: PropTypes.string
};

export default TransactionsTable;