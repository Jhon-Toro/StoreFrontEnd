import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@store/index';
import { removeFromCart } from '@store/slices/cartSlice';

const CartDropdown: React.FC = () => {
    const items = useSelector((state: RootState) => state.cart.items);
    const dispatch = useDispatch();

    return (
        <div
            style={{
                position: 'absolute',
                top: '40px',
                right: '10px',
                border: '1px solid #ccc',
                padding: '10px',
                width: '250px',
                backgroundColor: 'white',
            }}
        >
            <h4>Cart Items</h4>
            {items.length > 0 ? (
                <ul>
                    {items.map((item) => (
                        <li key={item.id}>
                            <p>{item.title}</p>
                            <p>Quantity: {item.quantity}</p>
                            <p>Price: ${item.price * item.quantity}</p>
                            <button onClick={() => dispatch(removeFromCart(item.id))}>Remove</button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Your cart is empty</p>
            )}
        </div>
    );
};

export default CartDropdown;
