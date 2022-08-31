// Framework stuff
import React from 'react';

// Components
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Container, Col, Row } from 'react-bootstrap';
import TaskForm from '../task_form';

// Styles
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

        this._uuid = props.uuid || crypto.randomUUID();

        this.state = {
            editing: false,
            expanded: props.expanded,
            focused: props.focused,
            index: props.index,
            name: props.name,
            summary: props.summary,
            dateStarted: props.dateStarted || 0,
            totalTime: props.totalTime || 0
        };

        this.interval = null;

        this.toggleExpand = this.toggleExpand.bind(this);
        this.handleComplete = this.handleComplete.bind(this);
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
            uuid: this._uuid,
            index: this.state.index,
            name: this.state.name,
            summary: this.state.summary,
            dateStarted: this.state.dateStarted,
            totalTime: this.state.totalTime,
            focused: this.state.focused,
            expanded: this.state.expanded
        };
    }

    componentDidMount() {
        if (this.state.focused) {
            this.interval = setInterval(() => this.tick(), 1000);
        }
    }

    handleComplete() {
        clearInterval(this.interval);
        this.props.completeTaskFunction(this.toJSON());
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

        this.setState({
            name: newTaskDetails.name,
            summary: newTaskDetails.summary,
            editing: false
        });

        let updatedTask = this.toJSON();
        updatedTask.name = newTaskDetails.name;
        updatedTask.summary = newTaskDetails.summary;

        this.props.updateTaskFunction(updatedTask);
    }

    handleFocus() {
        this.interval = setInterval(() => this.tick(), 1000);
        this.setState({ focused: true });
        
        let updatedTask = this.toJSON();
        updatedTask.focused = true;

        this.props.updateTaskFunction(updatedTask);
    }

    handleUnfocus() {
        clearInterval(this.interval);
        this.setState({ focused: false });

        let updatedTask = this.toJSON();
        updatedTask.focused = false;

        this.props.updateTaskFunction(updatedTask);
    }

    tick() {
        let updatedTask = this.toJSON();
        updatedTask.totalTime = this.state.totalTime + 1;

        this.setState({ totalTime: updatedTask.totalTime });
        this.props.updateTaskFunction(updatedTask);
    }

    toggleExpand() {
        let expanded = !this.state.expanded;

        this.setState({ expanded: expanded });

        let updatedTask = this.toJSON();
        updatedTask.expanded = expanded;

        this.props.updateTaskFunction(updatedTask);
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
            ? <button
                className='TaskOverlayCollapseButton'
                onClick={() => this.toggleExpand()}/>
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
            : <div
                id={`task[${index}]`}
                className='TaskCompact'
                style={{
                    paddingLeft: 75
                }}>
                <button 
                    className='CompleteTaskButton'
                    onClick={() => this.handleComplete()}>
                    <CheckCircleIcon 
                        style={{
                            fontSize: 'xx-large',
                            color: '#f1f1f1'
                        }}
                    />
                </button>
                <Container 
                    style={{
                        position: 'relative'
                    }}>
                    {expandButton}
                    <Row 
                        style={{
                            height: 'auto'
                        }}>
                        <Col 
                            style={{
                                padding: 0,
                                paddingLeft: 10
                            }}>
                            <div className='TaskTitle'
                                id={`task[${index}].name`}>
                                {name}
                            </div>
                        </Col>
                        <Col 
                            xs='auto'
                            style={{
                                paddingRight: 0
                            }}>
                            <div className='TimedTaskTimeContainer'
                                id={`task[${index}].totalTime`}>
                                {formatTime(this.state.totalTime)}
                            </div>
                        </Col>
                    </Row>
                    <Row style={{ paddingTop: 5 }}>
                        <div 
                            style={{
                                maxHeight: this.state.expanded ? 'none' : '4em'
                            }}
                            className="TaskSummary"
                            xs="auto"
                            id={`task[${index}].summary`}>
                            {summary}
                        </div>
                    </Row>
                    {expandedForm}
                </Container>
            </div>

        return card;
    }
}

Task.defaultProps = {
    uuid: crypto.randomUUID(),
    focused: false,
    expanded: false,
    index: null,
    name: '',
    summary: '',
    dateStarted: require('moment').now(),
    totalTime: 0
};

export default Task;