import React from 'react';
import '../../../index.css';

const productRatingAvg = (props) => {
    return (
        
        <div className="zevioo-rating__avg">
            <div className="zevioo-avg-text">{props.OR ? props.OR.toFixed(1) : 0 }<span> από 5 </span> </div>
            {props.RC ? <div className="zevioo-counter__text"><span>{props.RC}</span> αξιολογήσεις</div> : null}
        </div>
    )
}
export default productRatingAvg;