import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "./RegisterPage.css"

function RegisterPage() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        if (localStorage.getItem("token")) {
            navigate("/");
        }
    }, [navigate])

    function registerHandler(event) {
        const { key, type } = event;

        if (type === "click" || key === "Enter") {
            if (username && password && password2) {
                if (password === password2) {
                    setUsername("");
                    setPassword("");
                    setPassword2("");
                    setError("");


                    fetch("http://127.0.0.1:8000/auth/users/", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            username: username,
                            password: password
                        })
                    })
                        .then((response) => {
                            if (response.ok) {
                                navigate("/login");
                            }
                        })
                    

                } else {
                    setError("Пароли отличаются");
                }
            } else {
                setError("Заполните все поля");
            }
        }
    }

    return (
        <div className="register-block">
            <h2>Регистрация</h2>
            <label htmlFor="name-input" className="label-input">Имя пользователя</label>
            <input id="name-input" className="register-input" onChange={e => setUsername(e.target.value)} value={username} onKeyDown={registerHandler} />
            <label htmlFor="password-input" className="label-input">Пароль</label>
            <input className="register-input" type="password" onChange={e => setPassword(e.target.value)} value={password} onKeyDown={registerHandler} />
            <label htmlFor="password-input" className="label-input">Подтвердите пароль</label>
            <input className="register-input" type="password" onChange={e => setPassword2(e.target.value)} value={password2} onKeyDown={registerHandler} />
            <button className="register-button" onClick={registerHandler}>Зарегистрироваться</button>
            <p>{error}</p>
        </div>
    )
}

export default RegisterPage;
