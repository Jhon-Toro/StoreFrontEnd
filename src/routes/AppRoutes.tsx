import { Routes, Route, Navigate } from 'react-router-dom';
import { PrivateAdminRoute } from '@shared-components/private-admin-route/PrivateAdminRoute';
import CategoriesPage from '@pages/home/CategoriesPage';
import ProductListPage from '@pages/ProductList/ProductListPage';
import ProductDetailPage from '@pages/ProductDetail/ProductDetailPage';
import UserOrdersPage from '@pages/UserOrders/UserOrdersPage';
import AdminCategoriesPage from '@pages/admin/Categories/AdminCategoriesPage';
import AdminReviewsPage from '@pages/admin/Reviews/AdminReviewsPage';
import LoginPage from '@pages/auth/login-page';
import RegisterPage from '@pages/auth/RegisterPage';
import OrderDetailPage from '@pages/UserOrders/Detail/OrderDetailPage';
import CartPage from '@pages/cart/CartPage';
import CheckoutPage from '@pages/checkout/CheckoutPage';
import OrderSuccessPage from '@pages/UserOrders/Success/OrderSuccessPage';
import OrderCancelPage from '@pages/UserOrders/Cancel/OrderCancelPage';
import AdminDashboardPage from '@pages/admin/AdminDashbordPage';
import Products from '@pages/products/Products';
import NotFoundPage from '@pages/not-found/NotFound';
import AdminOrdersPage from '@pages/admin/Orders/AdminOrdersPage';
import AdminProductsPage from '@pages/admin/Products/AdminProductsPage';
import AdminProductEditPage from '@pages/admin/Products/Edit/AdminProductEditPage';
import { useSelector } from 'react-redux';
import { RootState } from '@store/index';
import Contact from '@pages/contact/Contact';
import AboutUs from '@pages/about/AboutUs';

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
    return isAuthenticated ? children : <Navigate to="/auth/login" />;
};

const AppRoutes = ({ isAuthenticated }: { isAuthenticated: boolean }) => {
    return (
        <Routes>
            <Route path="/" element={<Products />} />
            <Route path="/categories" element={<CategoriesPage />} />
            <Route path="/products" element={<Products />} />
            <Route path="/ours" element={<AboutUs />} />
            <Route
                path="/categories/category/:categoryId/products"
                element={
                    <PrivateRoute>
                        <ProductListPage />
                    </PrivateRoute>
                }
            />
            <Route path="/Contact" element={<Contact />} />
            <Route
                path="/product/:productId"
                element={
                    <PrivateRoute>
                        <ProductDetailPage />
                    </PrivateRoute>
                }
            />
            <Route
                path="/orders"
                element={
                    <PrivateRoute>
                        <UserOrdersPage />
                    </PrivateRoute>
                }
            />
            <Route
                path="/order/:orderId"
                element={
                    <PrivateRoute>
                        <OrderDetailPage />
                    </PrivateRoute>
                }
            />
            <Route
                path="/cart"
                element={
                    <PrivateRoute>
                        <CartPage />
                    </PrivateRoute>
                }
            />
            <Route
                path="/checkout"
                element={
                    <PrivateRoute>
                        <CheckoutPage />
                    </PrivateRoute>
                }
            />
            <Route path="/order/success" element={<OrderSuccessPage />} />
            <Route path="/order/cancel" element={<OrderCancelPage />} />

            <Route path="/auth/login" element={isAuthenticated ? <Navigate to="/" /> : <LoginPage />} />
            <Route path="/auth/register" element={isAuthenticated ? <Navigate to="/" /> : <RegisterPage />} />

            <Route
                path="/admin/dashboard"
                element={
                    <PrivateAdminRoute>
                        <AdminDashboardPage />
                    </PrivateAdminRoute>
                }
            />
            <Route
                path="/admin/products"
                element={
                    <PrivateAdminRoute>
                        <AdminProductsPage />
                    </PrivateAdminRoute>
                }
            />
            <Route
                path="/admin/product/:id"
                element={
                    <PrivateAdminRoute>
                        <AdminProductEditPage />
                    </PrivateAdminRoute>
                }
            />
            <Route
                path="/admin/categories"
                element={
                    <PrivateAdminRoute>
                        <AdminCategoriesPage />
                    </PrivateAdminRoute>
                }
            />
            <Route
                path="/admin/orders"
                element={
                    <PrivateAdminRoute>
                        <AdminOrdersPage />
                    </PrivateAdminRoute>
                }
            />
            <Route
                path="/admin/reviews"
                element={
                    <PrivateAdminRoute>
                        <AdminReviewsPage />
                    </PrivateAdminRoute>
                }
            />
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    );
};

export default AppRoutes;
