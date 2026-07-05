import { useDispatch, useSelector } from 'react-redux';
import { toggleToCart, clearCart } from '../redux/reducer';

function Cart() {
    const dispatch = useDispatch();
    const { items } = useSelector((state) => state.contacts);
    const cartItems = items.filter((item) => item.cart);
    const total = cartItems.reduce((sum, item) => sum + Number(item.price || 0), 0);

    return (
        <div className="cart-container">
            <h2>Shopping Cart</h2>
            {cartItems.length === 0 ? (
                <p className="cart-empty">Your cart is empty.</p>
            ) : (
                <>
                    <div className="cart-items">
                        {cartItems.map((item) => (
                            <div key={item.id} className="menu-item cart-item">
                                <h2>{item.name}</h2>
                                <p>Price: ${item.price}</p>
                                <p>Quantity: {item.Ammount || 1}</p>
                                <input
                                    type="checkbox"
                                    name="cart"
                                    checked={item.cart}
                                    onChange={() => dispatch(toggleToCart(item.id))}
                                />
                            </div>
                        ))}
                    </div>
                    <div className="cart-total">Total: ${total.toFixed(2)}</div>
                    <button className="cart-clear-btn" onClick={() => dispatch(clearCart())}>
                        Clear Cart
                    </button>
                </>
            )}
        </div>
    );
}

export default Cart;