import React, { useEffect, useState } from "react";
import axiosInstance from "@api/axiosIntance";
import { useSelector } from "react-redux";
import { RootState } from "@store/index";
import { Order } from "@interfaces/admin/orders/orders.interface";
import "./AdminOrdersPage.scss";

const AdminOrdersPage: React.FC = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const token = useSelector((state: RootState) => state.auth.token);

    useEffect(() => {
        fetchOrders();
    }, [token]);

    const fetchOrders = async () => {
        const response = await axiosInstance.get("/orders/", {
            headers: { Authorization: `Bearer ${token}` },
        });
        setOrders(response.data);
    };

    const updateOrderStatus = async (id: number, status: string) => {
        try {
            await axiosInstance.put(
                `/orders/${id}/status`,
                { new_status: status },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            fetchOrders();
        } catch (error) {
            console.error("Error al actualizar el estado de la orden:", error);
        }
    };

    return (
        <div
            className={`admin-orders-page ${
                orders.length < 1 ? "admin-orders-empty" : ""
            }`}
        >
            <h1 className="page-title">Admin - Orders</h1>
            <div className="orders-list">
                {orders.map((order) => (
                    <div key={order.id} className="order-card">
                        <h3 className="order-id">Order ID: {order.id}</h3>
                        <p className="order-info">
                            <span className="label">Status:</span>
                            <span className="status">{order.order_status}</span>
                        </p>
                        <p className="order-info">
                            <span className="label">Total:</span> $
                            {order.total_price.toFixed(2)}
                        </p>
                        <p className="order-info">
                            <span className="label">Created At:</span>{" "}
                            {new Date(order.created_at).toLocaleDateString()}
                        </p>
                        <div className="status-update">
                            <label
                                htmlFor={`status-${order.id}`}
                                className="label"
                            >
                                Update Status:
                            </label>
                            <select
                                id={`status-${order.id}`}
                                value={order.order_status}
                                onChange={(e) =>
                                    updateOrderStatus(order.id, e.target.value)
                                }
                                className="status-select"
                            >
                                <option value="Empacando">Empacando</option>
                                <option value="Enviando">Enviando</option>
                                <option value="Entregado">Entregado</option>
                            </select>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminOrdersPage;
