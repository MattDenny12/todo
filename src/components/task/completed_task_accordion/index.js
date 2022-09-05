// Frameworks and such
import React from "react";

// Components
import Accordion from '../../common/accordion';
import CompletedTaskCard from '../completed_task_card';

class CompletedTaskAccordion extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let { completedTaskList } = this.props;

        let content = completedTaskList.length > 0
            ? completedTaskList.map((task, index) =>
                <div key={task.uuid}>
                    {index != 0 && <div style={{ height: 10 }} />}
                    <CompletedTaskCard 
                        task={task}
                    />
                </div>
            )
            : <a
                style={{
                    whiteSpace: 'pre-wrap'
                }}>
                {"Nothing here... yet.\n"
                    + "Any completed tasks will be placed here so you can marvel over everything " 
                    + "you have accomplished!"}
            </a>

        return (
            <Accordion
                header={`Completed Tasks ( ${completedTaskList.length} )`}>
                {content}
            </Accordion>
        );
    }
}

CompletedTaskAccordion.defaultProps = {
    completedTaskList: []
}

export default CompletedTaskAccordion;