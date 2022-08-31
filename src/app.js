// Ducks and such
import React from 'react';
import { Container, Row } from 'react-bootstrap';

// Components
import TaskList from './components/task_list';
import TaskForm from './components/task_form';
import NavMenu from './components/nav_menu';
import Stats from './components/stats';

// Styles
import './app.css';
import moment from 'moment';

function getCookie(cookieName) {
    cookieName = cookieName + '=';

    let decodedCookie = decodeURIComponent(document.cookie);
    let cookieList = decodedCookie.split(';');

    for (let i = 0; i < cookieList.length; i++) {
        let cookie = cookieList[i];

        while (cookie.charAt(0) == ' ') {
            cookie = cookie.substring(1);
        }

        if (cookie.indexOf(cookieName) == 0) {
            return cookie.substring(cookieName.length, cookie.length);
        }
    }

    return null;
}

/**
 * Stores the current task list in cookies.
 * @param {JSON} taskList The task list to be stored in the cookies.
 */
function storeTasks(taskList) {
    document.cookie = `taskList=${JSON.stringify(taskList)}`;
}

/**
 * Loads the task list from the cookies, or returns the generic task list if no cookies could be found.
 */
function loadTasks() {
    let cookie = getCookie('taskList');
    
    if (cookie) {
        return JSON.parse(cookie);
    }

    return [
        {
            index: 0,
            name: 'Create a new Todo!',
            summary: 'Edit this Todo by clicking on it or create a new one by clicking on the button below.',
            dateStarted: require('moment').now(),
            totalTime: 0,
            focused: false,
            expanded: false,
            uuid: crypto.randomUUID()
        }
    ];
}

/**
 * Stores the completed tasks as a cookie.
 * @param {JSON} taskList The list of completed tasks.
 */
function storeCompletedTasks(taskList) {
    document.cookie = `completedTasks=${JSON.stringify(taskList)}`;
}

/**
 * @returns The completed task list from the cookies, if it exists.
 */
function loadCompletedTasks() {
    let cookie = getCookie('completedTasks')

    if (cookie) {
        return JSON.parse(cookie);
    } else {
        return [];
    }
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
            completedTaskList: loadCompletedTasks(),
            addingTask: false
        }

        this.taskCompleteAudio = document.getElementById('taskCompleteAudio');

        this.handleAddTask = this.handleAddTask.bind(this);
        this.handleAddTaskCancel = this.handleAddTaskCancel.bind(this);
        this.handleDeleteTask = this.handleDeleteTask.bind(this);
        this.handleUpdateTask = this.handleUpdateTask.bind(this);
        this.handleCompleteTask = this.handleCompleteTask.bind(this);
        this._updateTaskList = this._updateTaskList.bind(this);
    }

    /**
     * Handles the addition of a new task. This should be the only method used to add tasks.
     * @param {Object} newTask The new task to be added to the task list.
     */
    handleAddTask(newTask) {
        let newTaskList = this.state.taskList;
        newTask.index = newTaskList.length;
        newTask.uuid = crypto.randomUUID();
        newTask.dateStarted = moment.now();
        newTask.totalTime = 0;
        newTask.focused = false;
        newTask.expanded = false;

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
        let newTaskList = [];
        let currentTaskList = this.state.taskList;
        let newIndex = 0;

        for (let i = 0; i < currentTaskList.length; i++) {
            if (i != index) {
                let task = currentTaskList[i];
                task.index = newIndex++;

                newTaskList.push(task);
            }
        }

        this._updateTaskList(newTaskList);
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

    handleCompleteTask(task) {
        let newTaskList = [];
        let currentTaskList = this.state.taskList;
        let newCompletedTaskList = this.state.completedTaskList;
        let newIndex = 0;

        for (let i = 0; i < currentTaskList.length; i++) {
            if (i != task.index) {
                let task = currentTaskList[i];
                task.index = newIndex++;

                newTaskList.push(task);
            }
        }

        let completedTask = {
            uuid: task.uuid,
            name: task.name,
            summary: task.summary,
            totalTime: task.totalTime,
            dateStated: task.dateStarted,
            dateCompleted: moment.now()
        }

        newCompletedTaskList.push(completedTask);

        this.setState({
            taskList: newTaskList,
            completedTaskList: newCompletedTaskList
        });

        storeCompletedTasks(newCompletedTaskList);
        storeTasks(newTaskList);
        this.taskCompleteAudio.play();
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
                        cancelFunction={this.handleAddTaskCancel} />
                </Row>
                : null;

        let addTaskButton =
            !this.state.addingTask
                ? <Row
                    className='TaskBannerRow'>
                    <button
                        onClick={() => { this.setState({ addingTask: true }) }}
                        className='AddTaskButton'
                        id='addTaskButton'>
                        + Add New Todo
                    </button>
                </Row>
                : null;

        return (
            <div id='app'>
                <NavMenu />
                <Stats 
                    tasksCompleted={this.state.completedTaskList.length}
                />
                <Container
                    fluid
                    className='AppContainer'
                    style={{
                        paddingLeft: 0,
                        paddingRight: 0,
                        minHeight: '100%'
                    }}
                    >
                    <TaskList
                        taskList={this.state.taskList}
                        deleteTaskFunction={this.handleDeleteTask}
                        updateTaskFunction={this.handleUpdateTask}
                        completeTaskFunction={this.handleCompleteTask}
                    />
                    {addTaskForm}
                    {addTaskButton}
                </Container>
            </div>
        )
    }
}

export default App;