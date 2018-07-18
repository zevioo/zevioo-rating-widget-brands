import React from 'react';


const productInfos = (props) => {
    return (
        
        <div className="zevioo-rating__avg">
            <div className="zevioo-avg-text">{props.OR.toFixed(1)}<span> από 5 </span> </div>
            <div className="zevioo-counter__text">{props.RC} αξιολογήσεις</div>
        </div>
    )
}
export default productInfos;