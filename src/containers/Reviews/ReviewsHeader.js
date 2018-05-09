import React from 'react';
import '../../index.css';
import Aux from '../../hoc/Aux';
//Import Header components
import ProductRatingAvg from './Header/ProductRatingAvg';
import ProductRatingBars from './Header/ProductRatingBars';
import ProductScoreBars from './Header/ProductScoreBars';
import ProductReviewActions from './Header/ProductReviewActions';


const reviewsHeader = (props) => {
        return (
            <Aux>
            <div className="zevioo-product zevioo-none" style={{display: 'none !important'}}>
                <img src={props.product.IMG} alt={props.product.NM + " Image"} />
                <h2>{props.product.NM}</h2>
            </div>
            <div className="zevioo-product-review">
                <div className="zevioo-product-rating">
                    <ProductRatingAvg 
                        OR={props.headerStats.OR}
                        RC={props.headerStats.RC}
                        />
                    <ProductScoreBars 
                        stars={props.headerStats}
                        click={props.filterClick}
                        />
                    <ProductRatingBars 
                        qualityRT={props.headerStats.qualityRT}
                        valueRT={props.headerStats.valueRT}
                    />
                    <ProductReviewActions 
                        clickReview={props.writeReviewClick}
                        clickQuestion={props.askQuestionClick}
                        showQuestionsTab={props.showQuestionsTab}
                        {...props} />
                </div>
            </div>
            </Aux>
        );
}

export default reviewsHeader;