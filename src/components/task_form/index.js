import React from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import './index.css';

class TaskForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            nameValidationError: false
        }

        this.getFormElements = this.getFormElements.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this._resetForm = this._resetForm.bind(this);
    }

    /**
     * @returns the elements within the form.
     */
    getFormElements() {
        let form = document.getElementById(this.props.id);

        return {
            name: form.elements[0],
            summary: form.elements[1]
        }
    }

    /**
     * Handles the submission of the add task form.
     * @param {Event} event The submit event.
     */
    handleSubmit(event) {
        event.preventDefault();

        let formElements = this.getFormElements();

        if (formElements.name.value.trim() === '') {
            this.setState({ nameValidationError: true })
            return false;
        }

        this.props.submitFunction({
            name: formElements.name.value,
            summary: formElements.summary.value
        });

        this._resetForm(formElements);
        return false;
    }

    /**
     * Handles the cancellation of the add todo form.
     */
    handleCancel() {
        this._resetForm(this.getFormElements());
        this.props.cancelFunction();
    }

    /**
     * Resets all fields on the form so that they are empty.
     * @param {Object} formElements 
     */
    _resetForm(formElements) {
        formElements.name.value = '';
        formElements.summary.value = '';
    }

    /**
     * Render method for the task creation form.
     * @returns the form that should be rendered.
     */
    render() {
        let nameErrorMessage = this.state.nameValidationError
            ? <Row className='FormRow'>
                <Col xs='auto'>
                    <div className='FormLabel' />
                </Col>
                <Col>
                    <div className='FromErrorMessage'>
                        The name field must not be empty.
                    </div>
                </Col>
            </Row>
            : null;

        return (
            <Container
                fluid
                className='TaskFormContainer'>
                <form
                    id={this.props.id}
                    onSubmit={(event) => this.handleSubmit(event)}>
                    <Row className='FormTopRow'>
                        <h1 className='FormTitle'>
                            {this.props.title}
                        </h1>
                    </Row>
                    <Row className='FormRow'>
                        <Col xs='auto'>
                            <div className='FormLabel'>
                                name:
                                </div>
                        </Col>
                        <Col className='FormInputContainer'>
                            <input
                                autoFocus
                                defaultValue={this.props.defaultName}
                                name='name'
                                className='FormInput' />
                        </Col>
                    </Row>
                    {nameErrorMessage}
                    <Row className='FormRow'>
                        <Col xs='auto'>
                            <div className='FormLabel'>
                                summary:
                                </div>
                        </Col>
                        <Col className='FormInputContainer'>
                            <textarea
                                rows={3}
                                name='summary'
                                defaultValue={this.props.defaultSummary}
                                className='FormInput' />
                        </Col>
                    </Row>
                    <Row className='FormButtonRow'>
                        <Col />
                        <Col xs='auto'>
                            <button
                                type='button'
                                onClick={() => this.handleCancel()}
                                className='FormCancelButton'>
                                Cancel
                                </button>
                        </Col>
                        <Col xs='auto'>
                            <button
                                type='submit'
                                className='FormSubmitButton'>
                                Submit
                                </button>
                        </Col>
                    </Row>
                </form>
            </Container>
        );
    }
}

TaskForm.defaultProps = {
    title: 'Create a New Todo:',
    defaultName: '',
    defaultSummary: '',
    id: 'addTaskForm',
    submitFunction: null,
    cancelFunction: null
}

export default TaskForm;