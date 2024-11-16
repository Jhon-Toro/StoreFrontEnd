import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@store/index";
import axiosInstance from "@api/axiosIntance";
import { clearCart } from "@store/slices/cartSlice";
import { setOrderDetails } from "@store/slices/orderSlice";
import "./CheckoutPage.scss";

const CheckoutPage = () => {
    const dispatch = useDispatch();
    const cartItems = useSelector((state: RootState) => state.cart.items);

    const handleCheckout = async () => {
        try {
            const response = await axiosInstance.post("/orders/", {
                items: cartItems.map((item) => ({
                    product_id: item.id,
                    quantity: item.quantity,
                })),
                total_price: cartItems.reduce(
                    (total, item) => total + item.price * item.quantity,
                    0
                ),
            });
            dispatch(
                setOrderDetails({
                    orderId: response.data.id,
                    approvalUrl: response.data.approval_url,
                })
            );
            dispatch(clearCart());
            window.location.href = response.data.approval_url;
        } catch (error) {
            console.error("Error initiating PayPal payment:", error);
        }
    };

    const totalAmount = cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );

    return (
        <div className="checkout-page">
            <h2 className="checkout-title">Confirm Your Order</h2>
            <div className="checkout-summary">
                <h3 className="summary-title">Order Summary</h3>
                {cartItems.length > 0 ? (
                    <ul className="item-list">
                        {cartItems.map((item) => (
                            <li key={item.id} className="item">
                                <span className="item-name">{item.title}</span>
                                <span className="item-quantity">
                                    Quantity: {item.quantity}
                                </span>
                                <span className="item-price">
                                    ${(item.price * item.quantity).toFixed(2)}
                                </span>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="empty-cart">Your cart is empty.</p>
                )}
                <div className="total-amount">
                    <span>Total:</span>
                    <span>${totalAmount.toFixed(2)}</span>
                </div>
            </div>
            <button onClick={handleCheckout} className="checkout-button">
                Proceed to PayPal
            </button>
        </div>
    );
};

export default CheckoutPage;
