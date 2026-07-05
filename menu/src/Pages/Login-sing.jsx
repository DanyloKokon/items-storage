import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { postAccounts, setUser } from '../redux/reducer';
import { useNavigate } from "react-router";

function SingUp() {
    const [userName, setUserName] = useState('');
    const [userEmail, setEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (userName && userEmail && userPassword) {
            const newUser = { name: userName, email: userEmail, password: userPassword, op: false };
            dispatch(postAccounts(newUser));
            dispatch(setUser(newUser));
            setUserName('');
            setEmail('');
            setUserPassword('');
            // Navigate back to home after signup
            navigate('/');
        }
    };

    return (
        <div className="signup-container">
            <div className="signup-card">
                <h1>Create Account</h1>
                <form onSubmit={handleSubmit} className="signup-form">
                    <input 
                        type="text" 
                        placeholder="Full Name" 
                        name="name" 
                        value={userName} 
                        onChange={(e) => setUserName(e.target.value)} 
                        required
                    />
                    <input 
                        type="email" 
                        placeholder="E-mail" 
                        name="email" 
                        value={userEmail} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required
                    />
                    <input 
                        type="password" 
                        placeholder="Password" 
                        name="password" 
                        value={userPassword} 
                        onChange={(e) => setUserPassword(e.target.value)} 
                        required
                    />
                    <button type="submit" className="signup-submit-btn">Sign Up</button>
                </form>
                <p className="signin-link">
                    Already have an account? <a href="/items-storage/account/login">Login Here</a>
                </p>
            </div>
        </div>
    );
}

export default SingUp;