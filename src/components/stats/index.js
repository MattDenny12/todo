import { Container, Row } from 'react-bootstrap';
import React from 'react';
import './index.css';

class Stats extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Container
                style={{
                    position: 'absolute',
                    bottom: 20,
                    right: 20,
                    width: 'auto',
                    height: 'auto',
                    padding: 0,
                    borderRadius: 5,
                    backgroundColor: '#f1f1f1',
                    boxShadow: '0px 4px 5px rgba(0, 0, 0, 0.3)'
                }}>

                <Row
                    style={{
                        padding: 5,
                        fontSize: 16,
                        textAlign: 'center'
                    }}>
                    <a>Stats</a>
                </Row>

                <Container
                    style={{
                        paddingTop: 10,
                        paddingBottom: 5,
                        backgroundColor: '#fafafa',
                        borderBottomLeftRadius: 5,
                        borderBottomRightRadius: 5
                    }}>
                    <Row
                        className='StatRow'>
                        {`Tasks Completed: ${this.props.tasksCompleted}`}
                    </Row>
                </Container>
            </Container>
        );
    }
}

Stats.defaultProps = {
    tasksCompleted: 0
}

export default Stats;