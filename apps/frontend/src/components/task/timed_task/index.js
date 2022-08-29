import React from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import './index.css';
import Task from '../../../ducks/task';

function padZero(str, targetLen) {
    str = '' + str;

    while(str.length < targetLen) {
        str = '0' + str;
    }

    return str;
}

function formatTime(time) {
    let seconds = time % 60;
    time = (time - seconds) / 60;

    let minutes = time % 60;
    time = (time - minutes) / 60;

    return `${padZero(time, 2)}:${padZero(minutes, 2)}:${padZero(seconds, 2)}`;
}

class TimedTask extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            expanded: false,
            focused: false,
            index: props.index,
            name: props.name,
            summary: props.summary,
            dateStarted: props.dateStarted,
            totalTime: props.totalTime
        };

        this.interval = null;

        this.toggleExpand = this.toggleExpand.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleFocus = this.handleFocus.bind(this);
        this.handleUnfocus = this.handleUnfocus.bind(this);
        this.getTaskObject = this.getTaskObject.bind(this);
        this.tick = this.tick.bind(this);
    }

    getTaskObject() {
        return new Task()
            .name(this.state.name)
            .summary(this.state.summary)
            .dateStarted(this.state.dateStarted)
            .totalTime(this.state.totalTime)
            .task;
    }

    handleDelete() {
        this.props.deleteTaskFunction(this.state.index)
    }

    handleEdit() {
        
    }

    handleFocus() {
        this.interval = setInterval(() => this.tick(), 1000);
        this.setState({ focused: true });
    }

    handleUnfocus() {
        clearInterval(this.interval);
        this.setState({ focused: false });
    }

    tick() {
        let newTime = this.state.totalTime + 1;

        this.setState({ totalTime: newTime });

        let updatedTask = this.getTaskObject();
        updatedTask.totalTime = newTime;

        this.props.updateTaskFunction(
            this.state.index, 
            updatedTask);
    }

    toggleExpand() {
        this.setState({ expanded: !this.state.expanded });
    }

    render() {
        let { index, name, summary, dateStarted } = this.state;

        let focusButton = this.state.focused
            ? <button
                className='TaskFocusButton'
                onClick={() => this.handleUnfocus()}>
                Unfocus
            </button>
            : <button
                className='TaskFocusButton'
                onClick={() => this.handleFocus()}>
                Focus
            </button>

        let expandedForm = this.state.expanded
            ? <Row className='TaskButtonRow'>
                <Col />
                <Col xs='auto'>
                    <button
                        className='TaskDeleteButton'
                        onClick={() => this.handleDelete()}>
                        Delete
                    </button>
                </Col>
                <Col xs='auto'>
                    <button
                        className='TaskEditButton'
                        onClick={() => this.handleEdit()}>
                        Edit
                    </button>
                </Col>
                <Col xs='auto'>
                    {focusButton}
                </Col>
            </Row>
            : null;

        return (
            <Container fluid
                id={`task[${index}]`}
                className='TaskCompact'
                onDoubleClick={() => this.toggleExpand()}>
                <Container>
                    <Row className='TaskTopRow'>
                        <Col xs="auto"
                            className="TaskTopCol">
                            <div className='TaskCompleteContainer'>
                                <div className='TaskCompleteIndicator'>
                                    {/* Finish Radio Button */}
                                </div>
                            </div>
                        </Col>
                        <Col className='TaskTopCol'>
                            <div className='TaskTitle'
                                id={`task[${index}].name`}>
                                {name}
                            </div>
                        </Col>
                        <Col className="TaskTopCol">
                            <div className='TimedTaskTimeContainer'
                                id={`task[${index}].totalTime`}>
                                {formatTime(this.state.totalTime)}
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <div className="TaskCol TaskSummary"
                            xs="auto"
                            id={`task[${index}].summary`}>
                            {summary}
                        </div>
                    </Row>
                    <Row>
                        {/* 
                        <div
                            className="TaskCol TaskStartDate"
                            id={`task[${index}].dateStarted`}>
                            {moment(dateStarted).format('YYYY-MM-DD')}
                        </div>
                        */}
                    </Row>
                    {expandedForm}
                </Container>
            </Container>
        )
    }
}

export const defaultProps = {
    index: 0,
    name: '',
    summary: '',
    dateStarted: null,
    totalTime: 0
};

export default TimedTask;