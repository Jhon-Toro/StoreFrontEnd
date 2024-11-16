import React from "react";
import { Link } from "react-router-dom";
import "./AdminDashboardPage.scss";

const AdminDashboardPage: React.FC = () => {
    return (
        <div className="admin-dashboard">
            <h1 className="dashboard-title">Admin Dashboard</h1>
            <p className="dashboard-subtitle">
                Seleccione una de las opciones de administración:
            </p>
            <div className="dashboard-cards">
                <Link to="/admin/products" className="dashboard-card">
                    <h2>Administrar Productos</h2>
                    <p>Gestiona, edita y elimina productos</p>
                </Link>
                <Link to="/admin/categories" className="dashboard-card">
                    <h2>Administrar Categorías</h2>
                    <p>Gestiona las categorías de productos</p>
                </Link>
                <Link to="/admin/orders" className="dashboard-card">
                    <h2>Administrar Pedidos</h2>
                    <p>Gestiona y actualiza el estado de los pedidos</p>
                </Link>
                <Link to="/admin/reviews" className="dashboard-card">
                    <h2>Administrar Reseñas</h2>
                    <p>Modera y elimina reseñas de usuarios</p>
                </Link>
            </div>
        </div>
    );
};

export default AdminDashboardPage;
