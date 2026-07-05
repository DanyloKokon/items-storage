import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContacts, putAmmount } from '../redux/reducer';
import { toggleToCart, logout, deleteItem } from '../redux/reducer';
import { Link } from 'react-router';

import '../App.css';
import Cart from '../Components/Cart';
import ItemForm from '../Components/ItemForm';


function Home() {
    const dispatch = useDispatch();
    const { items, status } = useSelector((state) => state.contacts);
    const { user } = useSelector((state) => state.users);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchContacts());
        }
    }, [dispatch, status]);

    const handleChange = (itemId, amm) => {
        dispatch(putAmmount({ itemId, amm }));
    }

    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', marginTop: '0' }}>
            <div className="header-bar">
                {user ? (
                    <div className="user-info">
                        <h3>Welcome, {user.name}!</h3>
                        <button className="logout-btn" onClick={() => dispatch(logout())}>Logout</button>
                    </div>
                ) : (
                    <div className="auth-buttons">
                        <Link to="/items-storage/account/login" className="signup-btn">Login</Link>
                        <Link to="/items-storage/account/singup" className="signup-btn">Sign Up</Link>
                    </div>
                )}
            </div>
            <Cart />
            <hr />
            <div className="menu-list">
                {items.map((item) => (
                    <div key={item.id} className="menu-item">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '10px' }}>
                            <h2 style={{ margin: 0 }}>{item.name}</h2>
                            <button className="delete-btn" onClick={() => dispatch(deleteItem(item.id))}>✕</button>
                        </div>
                        <p>Price: ${item.price}</p>
                        <p>In cart: {item.cart ? 'Yes' : 'No'}</p>
                        <div className="amount-controls">
                            <p>Amount: {item.Ammount}</p>
                            <button type='button' onClick={() => handleChange(item.id, Number(item.Ammount) + 1)}>+</button>
                            <button type='button' onClick={() => handleChange(item.id, Number(item.Ammount) - 1)}>-</button>
                        </div>
                        <input
                            type="checkbox"
                            name="cart"
                            checked={item.cart}
                            onChange={() => dispatch(toggleToCart(item.id))}
                        />
                    </div>
                ))}
            </div>
            <hr />
           {user && user.op && <ItemForm />}
        </div>
    );
}

export default Home;