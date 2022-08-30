// Ducks and such
import React from 'react';
import { Container, Row } from 'react-bootstrap';

// Components
import TaskList from './components/task/task_list';
import TaskForm from './components/task/task_form';

// Styles
import './app.css';

/**
 * Stores the current task list in cookies.
 * @param {*} taskList The task list to be stored in the cookies.
 */
function storeTasks(taskList) {
    document.cookie = `taskList=${JSON.stringify(taskList)}`;
}

/**
 * Loads the task list from the cookies, or returns the generic task list if no cookies could be found.
 */
function loadTasks() {
    let name = 'taskList=';
    let decodedCookie = decodeURIComponent(document.cookie);
    let cookieList = decodedCookie.split(';');

    for (let i = 0; i < cookieList.length; i++) {
        let cookie = cookieList[i];

        while (cookie.charAt(0) == ' ') {
            cookie = cookie.substring(1);
        }

        if (cookie.indexOf(name) == 0) {
            return JSON.parse(cookie.substring(name.length, cookie.length));
        }
    }

    return [
        {
            name: 'Create a new Todo!',
            summary: 'Edit this Todo by clicking on it or create a new one by clicking on the button below.',
            dateStarted: require('moment').now(),
            totalTime: 0,
            focused: false
        }
    ];
}

class App extends React.Component {

    /**
     * Constructor for the react application.
     * @param {Object} props Not needed here but React requires it.
     */
    constructor(props) {
        super(props);

        this.state = {
            taskList: loadTasks(),
            addingTask: false
        }

        this.handleAddTask = this.handleAddTask.bind(this);
        this.handleAddTaskCancel = this.handleAddTaskCancel.bind(this);
        this.handleDeleteTask = this.handleDeleteTask.bind(this);
        this.handleUpdateTask = this.handleUpdateTask.bind(this);
        this._updateTaskList = this._updateTaskList.bind(this);
    }

    /**
     * Handles the addition of a new task. This should be the only method used to add tasks.
     * @param {Object} newTask The new task to be added to the task list.
     */
    handleAddTask(newTask) {
        let newTaskList = this.state.taskList;
        newTaskList.push(newTask);

        this._updateTaskList(newTaskList);
        this.setState({ addingTask: false });
    }

    handleAddTaskCancel() {
        this.setState({ addingTask: false });
    }

    /**
     * Handles the removal of a task. This should be the only method used to delete tasks.
     * @param {int} index The index of the task to be removed. If the index is not valid, than the list will remain unmodified.
     */
    handleDeleteTask(index) {
        let newTaskList = this.state.taskList;

        if (index in newTaskList) {
            newTaskList.splice(index, 1);
            this._updateTaskList(newTaskList);
        }
    }

    /**
     * @param {Task} updatedTask 
     */
    handleUpdateTask(updatedTask) {
        let newTaskList = this.state.taskList;

        if (updatedTask.index in newTaskList) {
            newTaskList[updatedTask.index] = updatedTask;
            this._updateTaskList(newTaskList);
        }
    }

    /**
     * Updates the task list and stores the new task list in the cookies.
     * @param {Array} newTaskList The new task list that will be used to updated the current task list.
     */
    _updateTaskList(newTaskList) {
        this.setState({ taskList: newTaskList });
        storeTasks(newTaskList);
    }

    /**
     * Renders the application.
     */
    render() {
        let addTaskForm =
            this.state.addingTask
                ? <Row className='TaskBannerRow'>  
                    <TaskForm 
                        submitFunction={this.handleAddTask} 
                        cancelFunction={this.handleAddTaskCancel}/>
                </Row>
                : null;

        let addTaskButton =
            !this.state.addingTask
                ? <Row
                    className='TaskBannerRow'>
                    <button
                        onClick={() => {this.setState({ addingTask: true })}}
                        className='AddTaskButton'
                        id='addTaskButton'>
                        + Add New Todo
                    </button>
                </Row>
                : null;

        return (
            <Container 
                fluid
                className='AppContainer'>
                <TaskList 
                    taskList={this.state.taskList} 
                    deleteTaskFunction={this.handleDeleteTask}
                    updateTaskFunction={this.handleUpdateTask}
                />
                {addTaskForm}
                {addTaskButton}
            </Container>
        )
    }
}

export default App;