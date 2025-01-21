import { useState, useEffect } from 'react';
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from 'react-router-dom';
import "./LoginPage.css"

function LoginPage() {
    const auth = useAuth();
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    
    useEffect(() => {
        if (localStorage.getItem("token")) {
            navigate("/login");
        }
    }, [navigate])


    function loginHandler(event) {
        const { key, type } = event;
        if (type === "click" || key === "Enter") {
            if (username && password) {
                auth.loginAction(username, password);
                setUsername("");
                setPassword("");
                setError("");
            } else {
                setError("Заполните все поля");
            }
        }
    }

    return (
        <div className="login-block">
            <h2>Логин</h2>
            <label htmlFor="name-input" className="label-input">Имя пользователя</label>
            <input id="name-input" className="login-input" onChange={e => setUsername(e.target.value)} value={username} onKeyDown={loginHandler} />
            <label htmlFor="password-input" className="label-input">Пароль</label>
            <input className="login-input" type="password" onChange={e => setPassword(e.target.value)} value={password} onKeyDown={loginHandler} />
            <button className="login-button" onClick={loginHandler}>Войти</button>
            <p>{error}</p>
        </div>
    )
}

export default LoginPage;
