import { useState } from "react";
import AuthProvider from "../../contexts/AuthContext";
import NewTask from "../../components/NewTask/NewTask";
import Task from "../../components/Task/Task";
import "./HomePage.css"


function HomePage() {
  const [tasks, setTasks] = useState([]);
  const [CompletedTask, setCompletedTask] = useState([]);

  function addTask(task_header, task_desk) {
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
