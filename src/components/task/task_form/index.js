// Frameworks and such
import React from 'react';

// Components
import Card from '../../common/card';
import { Container, Col, Row } from 'react-bootstrap';

// Styling
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
        this._resetForm = this.#resetForm.bind(this);
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

        this.#resetForm(formElements);
        return false;
    }

    /**
     * Handles the cancellation of the add todo form.
     */
    handleCancel() {
        this.#resetForm(this.getFormElements());
        this.props.cancelFunction();
    }

    /**
     * Resets all fields on the form so that they are empty.
     * @param {Object} formElements 
     */
    #resetForm(formElements) {
        formElements.name.value = '';
        formElements.summary.value = '';
    }

    /**
     * Render method for the task creation form.
     * @returns the form that should be rendered.
     */
    render() {
        // Conditional Rendering for the name form validation error
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

        // Mainline rendering for the form
        return (
            <Card
                style={{
                    paddingLeft: 0,
                    paddingRight: 0
                }}>
                <Container>
                    <form
                        id={this.props.id}
                        onSubmit={(event) => this.handleSubmit(event)}>
                        <Row>
                            <div>
                                <h2>
                                    {this.props.title}
                                </h2>
                            </div>
                        </Row>
                        <Row>
                            <div className='FormLabel'>
                                Name:
                            </div>
                        </Row>
                        <Row>
                            <Col className='FormInputContainer'>
                                <input
                                    autoFocus
                                    defaultValue={this.props.defaultName}
                                    name='name'
                                    className='FormInput' />
                            </Col>
                        </Row>
                        {nameErrorMessage}
                        <Row>
                            <div className='FormLabel'>
                                Summary:
                            </div>
                        </Row>
                        <Row>
                            <Col className='FormInputContainer'>
                                <textarea
                                    rows={3}
                                    name='summary'
                                    defaultValue={this.props.defaultSummary}
                                    className='FormInput' />
                            </Col>
                        </Row>
                        <Row
                            xs={1}
                            sm={2}>
                            <Col>
                                <button
                                    type='button'
                                    onClick={() => this.handleCancel()}
                                    className='FormCancelButton'>
                                    Cancel
                                </button>
                            </Col>
                            <Col>
                                <button
                                    type='submit'
                                    className='FormSubmitButton'>
                                    Submit
                                </button>
                            </Col>
                        </Row>
                    </form>
                </Container>
            </Card>
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