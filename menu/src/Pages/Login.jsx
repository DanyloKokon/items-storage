import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, setUser } from '../redux/reducer';
import { useNavigate } from "react-router";

function Login() {
    const [userEmail, setEmail] = useState('');
    const [userPassword, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { error, status } = useSelector((state) => state.users);

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrorMsg('');
        
        if (userEmail && userPassword) {
            dispatch(loginUser({ email: userEmail, password: userPassword }))
                .unwrap()
                .then((user) => {
                    dispatch(setUser(user));
                    navigate('/items-storage/');
                })
                .catch((err) => {
                    setErrorMsg(err.message || 'Login failed. Please check your credentials.');
                });
        } else {
            setErrorMsg('Please fill in all fields');
        }
    };

    return (
        <div className="signup-container">
            <div className="signup-card">
                <h1>Login</h1>
                {errorMsg && <div className="error-message">{errorMsg}</div>}
                <form onSubmit={handleSubmit} className="signup-form">
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
                        onChange={(e) => setPassword(e.target.value)} 
                        required
                    />
                    <button 
                        type="submit" 
                        className="signup-submit-btn"
                        disabled={status === 'loading'}
                    >
                        {status === 'loading' ? 'Logging in...' : 'Login'}
                    </button>
                </form>
                <p className="signin-link">
                    Don't have an account? <a href="/items-storage/account/singup">Sign Up Here</a>
                </p>
            </div>
        </div>
    );
}

export default Login;