// Frameworks and stuff
import React from "react";

// Components
import { Container } from "react-bootstrap";

// Styling
import './index.css';

const Card = (props) => {
    let { id, className, style } = props;

    return (
        <div
            id={id}
            style={style}
            className={className}>
            {props.children}
        </div>
    );
}

Card.defaultProps = {
    className: 'DefaultCard'
}

export default Card;