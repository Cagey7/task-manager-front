import './Task.css';

function Task({ taskHeader, taskDesk, taskId, removeTask, addCompletedTask, taskStatus }) {

    function addCompletedTaskHandler () {
            addCompletedTask(taskId);
        }

    return (
            <div className={`item item-${taskId}`}>
                <h3 className="user-task-header">{taskHeader}</h3>
                <p className="user-task-desc">{taskDesk}</p>
                {!(taskStatus) ? (
                <div className="task-buttons">
                    <button className="complete-button" onClick={addCompletedTaskHandler}>Выполнено</button>
                    <button className="delete-button" onClick={() => removeTask(taskId)}>Удалить</button>
                </div>
                ) : (
                <div className="task-buttons">
                    <button className="delete-button" onClick={() => removeTask(taskId)}>Удалить</button>
                </div>
                )}
            </div>
        );
    }
  
export default Task;