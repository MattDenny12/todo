import React from 'react';
import { Container, Row } from 'react-bootstrap';
import TaskList from './components/task/task_list';
import './app.css';

function storeTasks(taskJson) {
    document.cookie = `taskList=${JSON.stringify(taskJson)}`;
}

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

    return [];
}

function App() {

    let taskList = loadTasks();

    if (taskList.length == 0) {
        taskList.push({
            name: 'Create a new Todo!',
            summary: 'Edit this Todo by clicking on it or create a new one by clicking on the button below.',
            dateStarted: require('moment').now(),
            totalTime: 0
        })
    }

    return (
        <Container fluid>
            <TaskList taskList={taskList}/>
            <Row 
                className='TaskBannerRow'>
                <button 
                    className='AddTaskButton'
                    id='addTaskButton'>
                    + Add New Todo
                </button>
            </Row>
        </Container>
    )
}

export default App;