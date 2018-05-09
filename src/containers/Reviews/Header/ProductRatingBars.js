import React from 'react';
import '../../../index.css';
import {percentage} from '../../../helpers/Helpers'

const productRatingBars = (props) => {
    return (
        <div className="zevioo-product-score">
            <div className="zevioo-product-score-bars">
                <div className="zevioo-product-score-bar">
                    <div className="zevioo-product-bar-title">
                        <p>Ποιότητα</p>
                    </div>
                    <div className="zevioo-product-bar-box">
                        <div className="zevioo-score-graph">
                        <div className="zevioo-progress-score" style={{width: percentage(props.qualityRT, 5)+'%'}}></div>
                        </div>
                        <div className="zevioo-bar-value"><span> {props.qualityRT.toFixed(1)} </span></div>
                    </div>
                </div>
                <div className="zevioo-product-score-bar">
                    <div className="zevioo-product-bar-title">
                        <p>Αξίζει τα λεφτά του</p>
                    </div>
                    <div className="zevioo-product-bar-box">
                        <div className="zevioo-score-graph">
                        <div className="zevioo-progress-score" style={{width: percentage(props.valueRT, 5)+'%'}}></div>
                        </div>
                        <div className="zevioo-bar-value"><span> {props.valueRT.toFixed(1)} </span></div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default productRatingBars;