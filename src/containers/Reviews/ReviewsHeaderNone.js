import React from 'react';
import '../../index.css';
import Aux from '../../hoc/Aux';
//Import Header components
import ProductRatingAvg from './Header/ProductRatingAvg';
import ProductReviewActions from './Header/ProductReviewActions';


const reviewsHeaderNone = (props) => {
        return (
            <Aux>
            <div className="zevioo-product-review">
                <div className="zevioo-product-rating">
                    <ProductRatingAvg 
                        OR={props.headerStats.OR}
                        RC={props.headerStats.RC}
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

export default reviewsHeaderNone;