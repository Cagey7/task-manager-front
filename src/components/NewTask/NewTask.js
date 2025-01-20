import { useState } from "react";
import "./NewTask.css";

function NewTask({ addTask }) {
  const [inputHeader, setInputHeader] = useState("");
  const [inputDesk, setInputDesk] = useState("");
  const [error, setError] = useState(false);

  function addTaskHandler() {
    if (inputHeader.trim() && inputDesk.trim()) {
      addTask(inputHeader, inputDesk);
      setInputHeader("");
      setInputDesk("");
      setError(false);
    } else {
      setError(true);
    }
  }

  function inputKeyPress(event) {
    if (event.key === "Enter") {
      addTaskHandler();
    }
  }

  return (
    <div className="main-new-task-container">
      <h2>Введите новое задание</h2>
      <label className="task-header-name" htmlFor="task-header-input">
        Заголовок задания
      </label>
      <input
        id="task-header-input"
        className="task-header-input"
        onChange={(e) => setInputHeader(e.target.value)}
        onKeyDown={inputKeyPress}
        value={inputHeader}
      />
      <label className="task-desc-name" htmlFor="task-desc-input">
        Описание задания
      </label>
      <textarea
        id="task-desc-input"
        className="task-desc-input"
        onChange={(e) => setInputDesk(e.target.value)}
        onKeyDown={inputKeyPress}
        value={inputDesk}
      />

      <button className="new-task-button" onClick={addTaskHandler}>
        Добавить
      </button>

      {error ? (
        <p className="error-message">Введите данные о задании</p>
      ) : (
        <p></p>
      )}
    </div>
  );
}

export default NewTask;
