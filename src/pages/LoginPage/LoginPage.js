import { useState } from 'react';
import { useAuth } from "../../contexts/AuthContext";
import "./LoginPage.css"

function LoginPage() {
    const auth = useAuth();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    
    // useEffect(() => {
    //     if (localStorage.getItem("token")) {
    //         navigate("/dashboard");
    //     }
    // }, [navigate])


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
        <>
            <h2>Логин</h2>
            <p>Имя пользователя</p>
            <input onChange={e => setUsername(e.target.value)} value={username} onKeyDown={loginHandler} />
            <p>Пароль</p>
            <input type="password" onChange={e => setPassword(e.target.value)} value={password} onKeyDown={loginHandler} />
            <button onClick={loginHandler}>Войти</button>
            <p>{error}</p>
        </>
    )
}

export default LoginPage;
