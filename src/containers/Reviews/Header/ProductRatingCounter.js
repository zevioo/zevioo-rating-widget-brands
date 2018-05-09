import React from 'react';
import '../../../index.css';

const productRatingCounter = (props) => {
    return (
        
        <div className="zevioo-rating__counter">
            <div className="zevioo-counter__text">{props.RC} αξιολογήσεις</div>
        </div>
    )
}
export default productRatingCounter;