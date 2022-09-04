import React from 'react';
import { Row } from 'react-bootstrap';
import TaskCard from '../task_card';

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
                    <TaskCard
                        uuid={task.uuid}
                        index={task.index}
                        name={task.name}
                        summary={task.summary}
                        dateStarted={task.dateStarted}
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

TaskList.defaultProps = {
    taskList: [],
    deleteTaskFunction: null,
    updateTaskFunction: null,
    completeTaskFunction: null
};

export default TaskList;