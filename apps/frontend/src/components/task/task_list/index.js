import React from 'react';
import { Container, Row } from 'react-bootstrap';
import TimedTask from '../timed_task';

const TaskList = (props) => {

    let { taskList, deleteTaskFunction, updateTaskFunction } = props;

    if (!taskList) {
        taskList = [];
    }

    return (
        <div id='taskList'>
            {taskList.map((task, index) => (
                <Row 
                    className='TaskBannerRow' 
                    key={`task[${index}]`}>
                    <TimedTask 
                        index={index}
                        name={task.name}
                        summary={task.summary}
                        dateStarted={task.dateStarted}
                        totalTime={task.totalTime === null ? 0 : task.totalTime}
                        deleteTaskFunction={deleteTaskFunction}
                        updateTaskFunction={updateTaskFunction}
                    />
                </Row>
            ))}
        </div>
    );
}

export const defaultProps = {
    taskList: []
};

export default TaskList;