import React from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import TaskForm from '../task_form';
import './index.css';

function padZero(str, targetLen) {
    str = '' + str;

    while (str.length < targetLen) {
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

class Task extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            expanded: false,
            editing: false,
            focused: props.focused || false,
            index: props.index,
            name: props.name,
            summary: props.summary,
            dateStarted: props.dateStarted || 0,
            totalTime: props.totalTime || 0
        };

        this.interval = null;

        this.toggleExpand = this.toggleExpand.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleCancelEdit = this.handleCancelEdit.bind(this);
        this.handleSubmitEdit = this.handleSubmitEdit.bind(this);
        this.handleFocus = this.handleFocus.bind(this);
        this.handleUnfocus = this.handleUnfocus.bind(this);
        this.tick = this.tick.bind(this);
        this.toJSON = this.toJSON.bind(this);
    }

    toJSON() {
        return {
            index: this.state.index,
            name: this.state.name,
            summary: this.state.summary,
            dateStarted: this.state.dateStarted,
            totalTime: this.state.totalTime,
            focused: this.state.focused
        };
    }

    componentDidMount() {
        if (this.state.focused) {
            this.interval = setInterval(() => this.tick(), 1000);
        }
    }

    handleDelete() {
        clearInterval(this.interval);
        this.props.deleteTaskFunction(this.state.index)
    }

    handleEdit() {
        this.setState({ editing: true });
    }

    handleCancelEdit() {
        this.setState({ editing: false });
    }

    handleSubmitEdit(newTaskDetails) {
        if (!newTaskDetails) {
            return;
        }

        let updatedTask = this.toJSON();
        updatedTask.name = newTaskDetails.name;
        updatedTask.summary = newTaskDetails.summary;
        updatedTask.editing = false;

        this.setState(updatedTask);
        this.props.updateTaskFunction(updatedTask);
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
        let updatedTask = this.toJSON();
        updatedTask.totalTime = this.state.totalTime + 1;

        this.setState({ totalTime: updatedTask.totalTime });
        this.props.updateTaskFunction(updatedTask);
    }

    toggleExpand() {
        this.setState({ expanded: !this.state.expanded });
    }

    render() {
        let { index, name, summary } = this.state;

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

        let expandButton = this.state.expanded
            ? <div className='TaskOverlay'>
                <button
                    className='TaskOverlayCollapseButton'
                    onClick={() => this.toggleExpand()}>
                    Collapse
                </button>
            </div>
            : <button
                className='TaskOverlayExpandButton'
                onClick={() => this.toggleExpand()} />

        let expandedForm = this.state.expanded
            ? <Row className='TaskButtonRow'>
                <Col>
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

        let card = this.state.editing
            ? <TaskForm
                title='Edit Todo:'
                id='editTaskForm'
                defaultName={this.state.name}
                defaultSummary={this.state.summary}
                cancelFunction={this.handleCancelEdit}
                submitFunction={this.handleSubmitEdit}
            />
            : <Container fluid
                id={`task[${index}]`}
                className='TaskCompact'>
                {expandButton}
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

        return card;
    }
}

Task.defaultProps = {
    focused: false,
    index: null,
    name: '',
    summary: '',
    dateStarted: require('moment').now(),
    totalTime: 0
};

export default Task;