// Framework stuff
import React from 'react';
import { v4 as uuidv4 } from 'uuid';

// Components
import Card from '../../common/card';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { Container, Col, Row } from 'react-bootstrap';
import TaskForm from '../task_form';

// Styles
import './index.css';

function leftPadZero(str, targetLen) {
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

    return `${leftPadZero(time, 2)}:${leftPadZero(minutes, 2)}:${leftPadZero(seconds, 2)}`;
}

class TaskCard extends React.Component {
    #uuid;
    #interval;

    constructor(props) {
        super(props);

        this.state = {
            editing: false,
            completeHovered: false,
            expanded: false,
            focused: props.focused,
            index: props.index,
            name: props.name,
            summary: props.summary,
            dateStarted: props.dateStarted || 0,
            totalTime: props.totalTime || 0
        };

        this.#uuid = props.uuid;
        this.#interval = null;

        this.handleSubmitEdit = this.handleSubmitEdit.bind(this);
        this.toJSON = this.toJSON.bind(this);
    }

    /**
     * Updates the total time counter each time this is called. The interval for this will be set
     * when focusing the task, or when mounting a previously focused task.
     */
    #tick() {
        let updatedTask = this.toJSON();
        updatedTask.totalTime = this.state.totalTime + 1;

        this.setState({ totalTime: updatedTask.totalTime });
        this.props.updateTaskFunction(updatedTask);
    }

    /**
     * @returns The JSON representation of the task.
     */
    toJSON() {
        return {
            uuid: this.#uuid,
            index: this.state.index,
            name: this.state.name,
            summary: this.state.summary,
            dateStarted: this.state.dateStarted,
            totalTime: this.state.totalTime,
            focused: this.state.focused
        };
    }

    /**
     * Performs any setup that is required for this componant when it is mounted by react.
     */
    componentDidMount() {
        if (this.state.focused) {
            this.#interval = setInterval(() => this.#tick(), 1000);
        }
    }

    /**
     * Handles the completion process for this task. This currently means clearing any intervals and firing off a
     * completion call to the provided completeTaskFunction.
     */
    handleComplete() {
        clearInterval(this.#interval);
        this.props.completeTaskFunction(this.toJSON());
    }

    /**
     * Handles the deletion of the this task.
     */
    handleDelete() {
        clearInterval(this.#interval);
        this.props.deleteTaskFunction(this.state.index)
    }

    /**
     * Handles the submission of an edit of this task.
     * @param {Object} newTaskDetails The new details for this task
     */
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

    /**
     * Focuses the current task. This will also setup the interval for #tick.
     */
    handleFocus() {
        this.#interval = setInterval(() => this.#tick(), 1000);
        this.setState({ focused: true });

        let updatedTask = this.toJSON();
        updatedTask.focused = true;

        this.props.updateTaskFunction(updatedTask);
    }

    /**
     * Unfocuses the current task and removes the #tick interval.
     */
    handleUnfocus() {
        clearInterval(this.#interval);
        this.setState({ focused: false });

        let updatedTask = this.toJSON();
        updatedTask.focused = false;

        this.props.updateTaskFunction(updatedTask);
    }

    /**
     * Expands and collapses the task.
     */
    toggleExpand() {
        let expanded = !this.state.expanded;

        this.setState({ expanded: expanded });
    }

    /**
     * @returns The rendered task card.
     */
    render() {
        let { index, name, summary } = this.state;

        // Conditional rendering for the focus buttons
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

        // Conditional rendering for the collapse and expand buttons.
        let expandButton = this.state.expanded
            ? <button
                className='TaskOverlayCollapseButton'
                onClick={() => this.toggleExpand()} />
            : <button
                className='TaskOverlayExpandButton'
                onClick={() => this.toggleExpand()} />

        // Conditional rendering for the expanded form.
        let expandedForm = this.state.expanded
            ? <Row
                xs={1}
                sm={3}>
                <Col className='TaskButtonCol'>
                    <button
                        className='TaskDeleteButton'
                        onClick={() => this.handleDelete()}>
                        Delete
                    </button>
                </Col>
                <Col className='TaskButtonCol'>
                    <button
                        className='TaskEditButton'
                        onClick={() => this.setState({ editing: true })}>
                        Edit
                    </button>
                </Col>
                <Col className='TaskButtonCol'>
                    {focusButton}
                </Col>
            </Row>
            : null;

        // Conditional rendering for the task complete button
        let completeRadioButton = this.state.completeHovered
            ? <CheckBoxIcon
                style={{
                    fontSize: 'xx-large',
                    color: '#fafafa'
                }}
            />
            : <CheckBoxOutlineBlankIcon
                style={{
                    fontSize: 'xx-large',
                    color: '#fafafa'
                }}
            />;

        // Conditional rendering for the task form. We show the standard card unless the user is editing this task.
        let card = this.state.editing
            ? <TaskForm
                title='Edit Todo:'
                id='editTaskForm'
                defaultName={this.state.name}
                defaultSummary={this.state.summary}
                cancelFunction={() => this.setState({ editing: false })}
                submitFunction={this.handleSubmitEdit}
            />
            : <Card
                id={`task[${index}]`}
                style={{
                    paddingLeft: 75,
                    paddingRight: 0
                }}>
                <button
                    className='CompleteTaskButton'
                    onClick={() => this.handleComplete()}
                    onMouseOver={() => this.setState({ completeHovered: true })}
                    onMouseLeave={() => this.setState({ completeHovered: false })}>
                    {completeRadioButton}
                </button>
                <Container
                    style={{
                        position: 'relative'
                    }}>
                    <Row>
                        <div
                            className='TaskTitle'
                            id={`task[${index}].name`}>
                            {name}
                        </div>
                    </Row>
                    <Row
                        style={{
                            paddingTop: 5
                        }}>
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
                    <Row>
                        <div
                            id={`task[${index}].totalTime`}
                            style={{
                                textAlign: 'right'
                            }}>
                            {formatTime(this.state.totalTime)}
                        </div>
                    </Row>
                    {expandButton}
                    {expandedForm}
                </Container>
            </Card>

        return card;
    }
}

TaskCard.defaultProps = {
    uuid: uuidv4(),
    focused: false,
    expanded: false,
    index: null,
    name: '',
    summary: '',
    dateStarted: require('moment').now(),
    totalTime: 0
};

export default TaskCard;