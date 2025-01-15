import { useState, useEffect } from "react";
import AuthProvider from "../../contexts/AuthContext";
import NewTask from "../../components/NewTask/NewTask";
import Task from "../../components/Task/Task";
import "./HomePage.css";

function HomePage() {
  const [tasks, setTasks] = useState([]);
  const [CompletedTask, setCompletedTask] = useState([]);

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
          task_header: task.title,
          task_desk: task.desc,
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
      console.log(response)
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .catch((error) => console.error("Ошибка при запросе:", error));

    setTasks([...tasks, { task_header, task_desk }]);
  }

  function removeTask(i) {
    const updatedTasks = [...tasks];
    updatedTasks.splice(i, 1);
    setTasks(updatedTasks);
  }

  function addCompletedTask(task_header, task_desk) {
    setCompletedTask([...CompletedTask, { task_header, task_desk }]);
  }

  return (
    <AuthProvider>
      <>
        <NewTask addTask={addTask} />
        <div className="user-task-list">
          {tasks.map((task, index) => (
            <Task
              key={`task-${index}`}
              taskId={index}
              taskHeader={task.task_header}
              taskDesk={task.task_desk}
              removeTask={removeTask}
              addCompletedTask={addCompletedTask}
              taskStatus="in_process"
            />
          ))}
        </div>
        <h3 className="complete-task-header">Выполненные задания</h3>
        <div className="user-task-list">
          {CompletedTask.map((task, index) => (
            <Task
              taskId={index}
              taskHeader={task.task_header}
              taskDesk={task.task_desk}
              taskStatus="completed"
            />
          ))}
        </div>
      </>
    </AuthProvider>
  );
}

export default HomePage;
