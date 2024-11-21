import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { removeFromCart, updateQuantity, clearCart } from '../../store/slices/cartSlice';
import { useNavigate } from 'react-router-dom';
import { TrashIcon, ShoppingCartIcon } from '@heroicons/react/24/solid';
import './CartPage.scss';

interface CartItem {
    id: number;
    title: string;
    price: number;
    quantity: number;
    image: string;
}

const CartPage: React.FC = () => {
    const cartItems = useSelector((state: RootState) => state.cart.items);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleQuantityChange = (id: number, quantity: number) => {
        dispatch(updateQuantity({ id, quantity }));
    };

    const handleRemoveItem = (id: number) => {
        dispatch(removeFromCart(id));
    };

    const handleClearCart = () => {
        dispatch(clearCart());
    };

    const handleProceedToCheckout = () => {
        navigate('/checkout');
    };

    return (
        <div className={`cart-page ${cartItems.length < 1 ? 'empty-cart' : ''}`}>
            <h2 className="cart-title">Carrito de compras</h2>
            {cartItems.length === 0 ? (
                <p className="empty-cart">Tú carrito está vacío.</p>
            ) : (
                <div className="cart-content">
                    <ul className="cart-items">
                        {cartItems.map((item: CartItem) => (
                            <li key={item.id} className="cart-item">
                                <img
                                    src={item.image && item.image.length > 0 ? item.image : 'https://www.shutterstock.com/image-vector/no-photo-image-viewer-thumbnail-600nw-2495883211.jpg'}
                                    alt={item.title}
                                    className="item-image"
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).src = 'https://www.shutterstock.com/image-vector/no-photo-image-viewer-thumbnail-600nw-2495883211.jpg';
                                    }}
                                />
                                <div className="item-details">
                                    <h3 className="item-title">{item.title}</h3>
                                    <p className="item-price">${item.price.toFixed(2)}</p>
                                    <div className="item-quantity">
                                        <label>Quantity:</label>
                                        <input type="number" min="1" value={item.quantity} onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))} className="quantity-input" />
                                    </div>
                                </div>
                                <button onClick={() => handleRemoveItem(item.id)} className="remove-item">
                                    <TrashIcon className="icon" /> Remove
                                </button>
                            </li>
                        ))}
                    </ul>
                    <div className="cart-actions">
                        <button onClick={handleClearCart} className="clear-cart">
                            <TrashIcon className="icon" /> Clear Cart
                        </button>
                        <button onClick={handleProceedToCheckout} className="checkout-btn">
                            <ShoppingCartIcon className="icon" /> Checkout
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CartPage;
