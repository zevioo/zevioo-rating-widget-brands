import React from 'react';
import '../../../index.css';

import Aux from '../../../hoc/Aux';
import {percentage} from '../../../helpers/Helpers';
const checkCountReviews = (key, val) => {
    if (key !== 0) {
        return val
    }
}
const productScoreBars = (props) => {


    
    return (
        <Aux>
        <div className="zevioo-product-score-details">
        <div className="zevioo-filter-bar">
            <div className="zevioo-tooltip">
                <div className="zevioo-tooltip-header">
                    <span> Filter </span>
                </div>
                <div className="zevioo-tooltip-body">
                    <span> double click to filter reviews </span>
                </div>
            </div>
            <div className="zevioo-clickable" onClick={checkCountReviews(props.stars.fiveRT, props.click)} style={{cursor: (props.stars.fiveRT !== 0)? 'pointer' : 'not-allowed'}} data-star='5' > 
                <div className="zevioo-star-num">
                    <span className="zevioo-single-star">★★★★★</span>
                </div>
                <div className="zevioo-score-graph">
                    <div className="zevioo-progress-score" style={{width: percentage(props.stars.fiveRT, props.stars.totalReviews)+'%'}}></div>
                </div>
                <div className="zevioo-star-value"><span> ({props.stars.fiveRT}) </span></div>
            </div>
            <div className="zevioo-clickable" onClick={checkCountReviews(props.stars.fourRT, props.click)} style={{cursor: (props.stars.fourRT !== 0)? 'pointer' : 'not-allowed'}} data-star='4'>
                <div className="zevioo-star-num">
                    <span className="zevioo-single-star">★★★★</span>
                </div>
                <div className="zevioo-score-graph">
                <div className="zevioo-progress-score" style={{width: percentage(props.stars.fourRT, props.stars.totalReviews)+'%'}}></div>
                </div>
                <div className="zevioo-star-value"><span> ({props.stars.fourRT}) </span></div>
            </div>
            <div className="zevioo-clickable" onClick={checkCountReviews(props.stars.threeRT, props.click)} style={{cursor: (props.stars.threeRT !== 0)? 'pointer' : 'not-allowed'}} data-star='3'>
                <div className="zevioo-star-num">
                    <span className="zevioo-single-star">★★★</span>
                </div>
                <div className="zevioo-score-graph">
                <div className="zevioo-progress-score" style={{width: percentage(props.stars.threeRT, props.stars.totalReviews)+'%'}}></div>
                </div>
                <div className="zevioo-star-value"><span> ({props.stars.threeRT}) </span></div>
            </div>
            <div className="zevioo-clickable" onClick={checkCountReviews(props.stars.twoRT, props.click)} style={{cursor: (props.stars.twoRT !== 0)? 'pointer' : 'not-allowed'}} data-star='2'>
                <div className="zevioo-star-num">
                    <span className="zevioo-single-star">★★</span>
                </div>
                <div className="zevioo-score-graph">
                <div className="zevioo-progress-score" style={{width: percentage(props.stars.twoRT, props.stars.totalReviews)+'%'}}></div>
                </div>
                <div className="zevioo-star-value"><span> ({props.stars.twoRT}) </span></div>
            </div>
            <div className="zevioo-clickable" onClick={checkCountReviews(props.stars.oneRT, props.click)} style={{cursor: (props.stars.oneRT !== 0)? 'pointer' : 'not-allowed'}} data-star='1'>
                <div className="zevioo-star-num">
                    <span className="zevioo-single-star">★</span>
                </div>
                <div className="zevioo-score-graph">
                <div className="zevioo-progress-score" style={{width: percentage(props.stars.oneRT, props.stars.totalReviews)+'%'}}></div>
                </div>
                <div className="zevioo-star-value"><span> ({props.stars.oneRT}) </span></div>
            </div>
            <div id="star-0" className="zevioo-clickable"  data-star="0">
                <p> Show All </p>
            </div>
        </div>
    </div>
    </Aux>
    )
}

export default productScoreBars;