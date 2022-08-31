import React from 'react';
import { Row } from 'react-bootstrap';
import Task from '../task';

const TaskList = (props) => {

    let { taskList, deleteTaskFunction, updateTaskFunction, completeTaskFunction } = props;

    if (!taskList) {
        taskList = [];
    }

    return (
        <div id='taskList'>
            {taskList.map((task) => (
                <Row 
                    className='TaskBannerRow' 
                    key={`task[${task.index}]`}>
                    <Task 
                        key={task.uuid}
                        uuid={task.uuid}
                        index={task.index}
                        name={task.name}
                        summary={task.summary}
                        dateStarted={task.dateStarted}
                        expanded={task.expanded}
                        focused={task.focused}
                        totalTime={task.totalTime === null ? 0 : task.totalTime}
                        deleteTaskFunction={deleteTaskFunction}
                        updateTaskFunction={updateTaskFunction}
                        completeTaskFunction={completeTaskFunction}
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