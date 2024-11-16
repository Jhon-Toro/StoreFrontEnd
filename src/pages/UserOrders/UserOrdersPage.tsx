import React, { useEffect, useState } from 'react';
import axiosInstance from '../../api/axiosIntance';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import './UserOrdersPage.scss';

interface Order {
    id: number;
    total_price: number;
    order_status: string;
    payment_status: string;
    created_at: string;
}

const UserOrdersPage: React.FC = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [currentPage] = useState(1);
    const [ordersPerPage] = useState(5);
    const token = useSelector((state: RootState) => state.auth.token);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axiosInstance.get('/orders/my_orders', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const sortedOrders = response.data.sort((a: Order, b: Order) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
                setOrders(sortedOrders);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };
        fetchOrders();
    }, [token]);

    const indexOfLastOrder = currentPage * ordersPerPage;
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
    const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

    return (
        <div className={`user-orders-page ${currentOrders.length < 1 ? 'currentOrders-empty' : ''}`}>
            <h1 className="page-title">Mis Órdenes</h1>
            <ul className="orders-list">
                {currentOrders.length > 0 ? (
                    currentOrders.map((order) => (
                        <li key={order.id} className="order-card">
                            <div className="order-header">
                                <h2>Orden ID: {order.id}</h2>
                                <p className="order-date">{new Date(order.created_at).toLocaleDateString()}</p>
                            </div>
                            <div className="order-details">
                                <p>
                                    <span>Total:</span> ${order.total_price.toFixed(2)}
                                </p>
                                <p>
                                    <span>Estado de la Orden:</span> {order.order_status}
                                </p>
                                <p>
                                    <span>Estado de Pago:</span> {order.payment_status}
                                </p>
                            </div>
                        </li>
                    ))
                ) : (
                    <p className="no-orders">Aún no tienes órdenes realizadas.</p>
                )}
            </ul>
            {/* <Pagination
                ordersPerPage={ordersPerPage}
                totalOrders={orders.length}
                paginate={paginate}
                currentPage={currentPage}
            /> */}
        </div>
    );
};

export default UserOrdersPage;
