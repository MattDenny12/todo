// Frameworks and such
import React from "react";

// Components
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

// Styling
import './index.css';

class Accordion extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            active: false
        }
    }

    setActive(isActive) {
        this.setState({ active: isActive });
    }

    render() {
        let { header } = this.props;

        let content = this.state.active
            ? <div className="AccordionContent">
                {this.props.children}
            </div>
            : null;

        return (
            <div
                className="Accordion"
                style={{
                    padding: 0
                }}>
                <button 
                    className="AccordionHeader"
                    onClick={() => this.setActive(!this.state.active)}
                    style={this.state.active 
                        ? {
                            borderBottomWidth: 2
                        } 
                        : null}>
                    {header}
                    <div className="AccordionIcon">
                        {this.state.active ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                    </div>
                </button>
                {content}
            </div>
        )
    }
}

Accordion.defaultProps = {
    header: ''
}

export default Accordion;