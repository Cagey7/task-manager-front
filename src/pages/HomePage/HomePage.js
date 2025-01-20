import { useState, useEffect } from "react";
import AuthProvider from "../../contexts/AuthContext";
import NewTask from "../../components/NewTask/NewTask";
import Task from "../../components/Task/Task";
import "./HomePage.css";

function HomePage() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/tasks/", {
      headers: {
        Authorization: `Token ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        const newTasks = data.map((task) => ({
          task_id: task.id,
          task_header: task.title,
          task_desk: task.desc,
          completed: task.completed
        }));
        setTasks(newTasks);
      })
      .catch((error) => console.error("Ошибка при запросе:", error));
  }, []);

  function addTask(task_header, task_desk) {
    fetch("http://127.0.0.1:8000/create-task/", {
      method: "POST",
      headers: {
        Authorization: `Token ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: task_header,
        desc: task_desk
      }),
    })
    .then((response) => {
      console.log(response);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      const task_id = data.id
      setTasks([...tasks, { task_id, task_header, task_desk, completed: false }]);
    })
    .catch((error) => console.error("Ошибка при запросе:", error));
  }

  function removeTask(id) {
    fetch(`http://127.0.0.1:8000/delete-task/${id}/`, {
      method: "DELETE",
      headers: {
        Authorization: `Token ${localStorage.getItem("token")}`,
        'Content-Type': 'application/json',
      },
    })
    .then((response) => {
      if (response.ok) {
        setTasks(tasks.filter((task) => task.task_id !== id))
      } else {
        console.log('Ошибка удаления задачи:', response.status);
      }
    })
  }

  function addCompletedTask(id) {
    fetch(`http://127.0.0.1:8000/complete-task/${id}/`, {
      method: "PATCH",
      headers: {
        Authorization: `Token ${localStorage.getItem("token")}`,
        'Content-Type': 'application/json',
      },
    })
    .then((response) => {
      setTasks(tasks.map((task) =>
        task.task_id === id ? { ...task, completed: true } : task
      ));
    })
  }

  return (
    <AuthProvider>
      <>
        <NewTask addTask={addTask} />
        <div className="user-task-list">
          {tasks.filter((task) => !(task.completed)).map((task) => (
            <Task
              key={task.task_id}
              taskId={task.task_id}
              taskHeader={task.task_header}
              taskDesk={task.task_desk}
              removeTask={removeTask}
              addCompletedTask={addCompletedTask}
              taskStatus={task.completed}
            />
          ))}
        </div>
        <h3 className="complete-task-header">Выполненные задания</h3>
        <div className="user-task-list">
          {tasks.filter((task) => task.completed).map((task) => (
            <Task
              key={task.task_id}
              taskId={task.task_id}
              taskHeader={task.task_header}
              taskDesk={task.task_desk}
              removeTask={removeTask}
              taskStatus={task.completed}
            />
          ))}
        </div>
      </>
    </AuthProvider>
  );
}

export default HomePage;
