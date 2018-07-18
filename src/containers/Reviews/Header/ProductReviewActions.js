import React from 'react';
import '../../../index.css';

const productReviewActions = (props) => {
    const questionButton = (
        <div className="zevioo-button zevioo-ask" style={props.questionBtn?{backgroundColor: "var(--zeviooColor)"}: null} onClick={props.clickQuestion}>
            <span className="zevioo-button-icon">
                <img src='https://zevioo.com/widgets/media/comment.svg'  className="zevioo-icons" alt="zevioo Comment" height="20px"/>
            </span>
            <span className="zevioo-button-text"> Ερώτηση </span>
        </div>
    )
    const reviewButton = (
        <div className="zevioo-button zevioo-make-review" style={props.reviewBtn?{backgroundColor: "var(--zeviooColor)"}: null} onClick={props.clickReview}>
            <span className="zevioo-button-icon">
                <img src='https://zevioo.com/widgets/media/star.svg'  className="zevioo-icons" alt="zevioo Review" height="20px"/>
            </span>
            <span className="zevioo-button-text"> Αξιολογήστε το </span>
        </div>
    )

    return (
        
        <div className="zevioo-product-review-actions">
        {props.showQuestionsTab ? questionButton : ''}
        {reviewButton}
        </div>
    )

}

export default productReviewActions;