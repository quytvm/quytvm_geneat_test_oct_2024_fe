import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import {useEffect, useState} from "react";
import {fetchAllOrders} from "../../services/OrderService";
import {useNavigate} from "react-router-dom";

const TableOrders = () => {
    const navigate = useNavigate();
    const [orders, setOrders] = useState({});

    useEffect(() => {
        getOrders();
    }, [])

    const getOrders = async () => {
        let res = await fetchAllOrders();
        if (res.data ) {
            setOrders(res.data);
        }
    }

    const handleAddNewOrder = () => {
        navigate('/orders/new');
    };

    console.log(orders);
    return (
        <>
            <div className='my-3 add-new d-sm-flex'>
                <span><b>List Orders:</b></span>
                <div className='group-btns'>
                    <Button variant="success" onClick={handleAddNewOrder}>
                        Add new Order
                    </Button>
                </div>
            </div>
            <div className="table-customize">
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Code</th>
                            <th>Customer Name</th>
                            <th>Customer Phone</th>
                            <th>Total Tax</th>
                            <th>Total Amount</th>
                            <th>Created</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.length > 0 && orders.map((order, index) => {
                            return (
                                <tr key={order.id}>
                                    <td>{order.orderCode}</td>
                                    <td>{order.customerName}</td>
                                    <td>{order.customerPhone}</td>
                                    <td>{order.totalTax}</td>
                                    <td>{order.totalAmount}</td>
                                    <td>{order.createdDate}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
            </div>
        </>
    )
}

export default TableOrders;