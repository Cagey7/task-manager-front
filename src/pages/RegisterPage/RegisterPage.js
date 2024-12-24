import { useState } from 'react';


function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [error, setError] = useState("");


  function registerHandler (event) {
      const { key, type } = event;

      if (type === "click" || key === "Enter") {
          if (username && password && password2) {
              if (password === password2) {
                  setUsername("");
                  setPassword("");
                  setPassword2("");
                  setError("");
              } else {
                  setError("Пароли отличаются");
              }
          } else {
              setError("Заполните все поля");
          }
      }
  }

  return (
      <>
          <h2>Регистрация</h2>
          <p>Имя пользователя</p>
          <input onChange={e => setUsername(e.target.value)} value={username} onKeyDown={registerHandler}/>
          <p>Пароль</p>
          <input type="password" onChange={e => setPassword(e.target.value)} value={password} onKeyDown={registerHandler} />
          <p>Подтверждение пароль</p>
          <input type="password" onChange={e => setPassword2(e.target.value)} value={password2} onKeyDown={registerHandler} />
          <br/>
          <button onClick={registerHandler}>Зарегистрироваться</button>
          <p>{error}</p>
      </>
  )
}

export default RegisterPage;
