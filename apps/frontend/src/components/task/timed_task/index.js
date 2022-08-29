import React from 'react';
import moment from 'moment';
import { Container, Col, Row } from 'react-bootstrap';
import './index.css';

const TimedTask = (props) => {
    let { index, name, summary, dateStarted, totalTime, deleteTaskFunction } = props;

    if (!dateStarted) {
        dateStarted = moment.now();
    }

    /*
        TODO:
        - Add full view
        - Add delete button
        - Add edit button
    */

    return (
        <Container fluid
            id={`task[${index}]`}
            className='TaskCompact'>
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
                    <Col className="TaskTopCol">
                        <div className='TaskTitle'
                            id={`task[${index}].name`}>
                            {name}
                        </div>
                    </Col>
                    <Col className="TaskTopCol">
                        <div className='TimedTaskTimeContainer'
                            id={`task[${index}].totalTime`}>
                            {totalTime}
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col className="TaskCol TaskSummary" 
                        xs="auto"
                        id={`task[${index}].summary`}>
                        {summary}
                    </Col>
                    <Col className="TaskCol TaskStartDate" 
                        id={`task[${index}].dateStarted`}
                        xs>
                        {moment(dateStarted).format('YYYY-MM-DD')}
                    </Col>
                </Row>
            </Container>
        </Container>
    )
};

export const defaultProps = {
    index: 0,
    name: '',
    summary: '',
    dateStarted: null,
    totalTime: 0
};

export default TimedTask;