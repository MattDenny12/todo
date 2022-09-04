// Frameworks and such
import React from "react";

// Components
import Card from "../../common/card";
import { Container, Row } from "react-bootstrap";

class CompletedTaskCard extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let { task } = this.props;

        return (
            <Card>
                <Container>
                    <Row>
                        <div>
                            {task.name}
                        </div>
                    </Row>
                </Container>
            </Card>
        );
    }
}

CompletedTaskCard.defaultProps = {
    task: {
        name: '',
        summary: ''
    }
}

export default CompletedTaskCard;