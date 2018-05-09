import React, {Component} from 'react';
import '../../../index.css';
import Aux from '../../../hoc/Aux';
import {percentage,filterReview,dateToDay} from '../../../helpers/Helpers';
import ThumbsForm from '../Forms/ThumbsForm';
import Verify from '../../../components/Svg/verify';
import Negative from '../../../components/Svg/Negative';
import Positive from '../../../components/Svg/Positive';



class ReviewList extends Component {
        
    state = {
            currentPage: 1,
            lastPager: null, //click
            showReviews:2,
            loadReviews: 2, //click
            showLoadMore: true,
            sortValue: 'default'
        };

      pageHandleClick(e) {
        this.setState({
          currentPage: Number(e.target.id)
        });
      }

render(){
        const negativeIcon = (
            <Aux>
            <Negative
            width="15px"
            height="15px"
            fill="#ff0202"
            />
            </Aux>  
        )
        const positiveIcon = (
            <Aux>
            <Positive
                width="15px"
                height="15px"
                fill="#7bcc70"
            />
            </Aux>  
        )
        const verifyIcon = ( 
            <Aux> 
            <span className="zevioo-verify__icon">
            <Verify
            width="17px"
            height="17px"
            fill="var(--green)"
            stroke="var(--green)"
            strokeWidth= "5px" />
            </span>                             
            <span className="zevioo-verify__text">Επιβεβαιωμένη αγορά</span>
            </Aux> 
        )

        //Sort reviews
        const handleChange = (e) => {
            e.preventDefault()
            this.setState({sortValue: e.target.value});

        }

        const sortedValue = this.state.sortValue;
        let sortedReviews = null;
        if (sortedValue === 'new') {
            sortedReviews = (a,b) => {
                const convertDigitIn = (date) => date.slice(0, 10).split('/').reverse().join('/');
                const d1 = new Date(convertDigitIn(a.DT));
                const d2 = new Date(convertDigitIn(b.DT));
                if (d1  > d2) {return -1;}
                if (d1  < d2) {return 1;}
                return 0;
            }
        }else if (sortedValue === 'older'){
            sortedReviews = (a,b) => {
                const convertDigitIn = (date) => date.slice(0, 10).split('/').reverse().join('/');
                const d1 = new Date(convertDigitIn(a.DT));
                const d2 = new Date(convertDigitIn(b.DT));

                if (d1 < d2) {return -1;}
                if (d1 > d2) {return 1;}
                return 0;
            }
        }else if (sortedValue === 'text'){
            sortedReviews = (a,b) => {
                const x = a.TT.length;
                const y = b.TT.length;
                if (x > y) {return -1;}
                if (x < y) {return 1;}
                return 0;
            }
        }else if (sortedValue === 'better'){
            sortedReviews = (a,b) => b.RT - a.RT
        }else if (sortedValue === 'worst'){
            sortedReviews = (a,b) => a.RT - b.RT
        }


        // Filter Reviews
        const filterNum = this.props.filterNum;
        const isFilter = this.props.isFilter;
        let filteredReviews = null;
        if (isFilter && sortedValue !== 'default') {
            filteredReviews = this.props.reviews.filter(filterReview(filterNum)).sort(sortedReviews);
        }
        else if (isFilter && sortedValue === 'default') {
            filteredReviews = this.props.reviews.filter(filterReview(filterNum));
        }
        else if (sortedValue === 'default') {
            filteredReviews = this.props.reviews
        }
        else {
            filteredReviews = this.props.reviews.sort(sortedReviews)
        }

        const {currentPage, loadReviews } = this.state;

        // Logic for displaying current reviews
        const indexOfLastReview = currentPage * loadReviews;
        const currentReviews = filteredReviews.slice(0, indexOfLastReview);

        // Logic for displaying page numbers
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(filteredReviews.length / loadReviews); i++) {
            pageNumbers.push(i);
        }
        // Next Pager Func
        const pageNextHandleClick = (e) => {
            const currentPager = this.state.currentPage
            const lastPager = Math.ceil(filteredReviews.length / loadReviews);
            if (currentPager < lastPager){
              this.setState({
                  currentPage: currentPager + 1,
                  lastPager: lastPager
              })
            }
        }

        // render Value And Quality Bars 
        const bars = (val, position) => {
            if (val.length > 0){
                return (
                    <div className="zevioo-product-score-bar">
                        <div className="zevioo-product-bar-title">
                            <p>{val[position].NM}</p>
                        </div>
                        <div className="zevioo-product-bar-box">
                            <div className="zevioo-score-graph">
                                <div className="zevioo-progress-score" style={{width: percentage(val[position].RT, 5)+'%'}}></div>
                            </div>
                            <div className="zevioo-bar-value"><span> {val[position].RT} </span></div>
                        </div>
                    </div>
                )
            }else {
                return null;
            }
        }

        // if we dont have review
        const firstReview = (
            <div className="zevioo-review__first">
                <div className="zevioo-review__first__title">Γράψτε εσείς την πρώτη αξιολόγηση</div>
                <div className="zevioo-review__first__btn">
                <div className="zevioo-button zevioo-make-review zevioo-none" style={this.props.reviewBtn?{backgroundColor: "var(--zeviooColor)"}: null} onClick={this.props.clickReview}>
                <span className="zevioo-button-icon">
                    <img src='https://zevioo.com/widgets/media/star.svg'  className="zevioo-icons" alt="zevioo Review" height="20px"/>
                </span>
                <span className="zevioo-button-text"> Αξιολογήστε το </span>
            </div>
                </div>
            </div>
        )
        const exportReviews = currentReviews.map((review,index) => {
            return (
               <div key={index} className="zevioo-single-review" > 
               <div className="zevioo-single-review-header zevioo-clearfix">
                   <div className="zevioo-pull__left">
                    {
                      (review.TT)? <h2 className="zevioo-review-title">
                       {review.TT}
                       </h2> : null
                    }
                       
                       <div className="zevioo-star-ratings">
                           <div className="zevioo-star-ratings-top" style={{width: percentage(review.RT ,5)+'%'}}><span>★</span><span>★</span><span>★</span><span>★</span><span>★</span></div>
                           <div className="zevioo-star-ratings-bottom"><span>★</span><span>★</span><span>★</span><span>★</span><span>★</span></div>
                           <span className="zevioo-none">{review.RT}</span>
                           <span className="zevioo-none">5</span>
                       </div>
                       {(review.CPF === true) && 
                        <div className="zevioo-verify-buyer">
                            {verifyIcon }
                         </div>
                        }
                       
                   </div>
                   <div className="zevioo-pull__right">
                       <div content={review.DT} className="zevioo-review-date">
                       {dateToDay(review.DT)}
                       </div>
                       <div className="zevioo-buyer-info">
                       <div className="zevioo-buyer-name">
                        {review.FN + " " + review.LN}
                       </div>
                    </div>
                   </div>
               </div>
               <div className="zevioo-single-review-body">
                   <div className="zevioo-review-content">
                       <div className="zevioo-review-pn">
                       {review.PT &&
                           <p className="zevioo-review-positive">
                           <span className="zevioo-positive"> {positiveIcon} </span><span> {review.PT} </span>
                           </p>
                       }
                       {review.NT &&
                           <p className="zevioo-review-negative">
                           <span className="zevioo-negative"> {negativeIcon} </span><span> {review.NT} </span>
                           </p>
                       }
                       </div>
                       <div className="zevioo-container__flex ">
                            <div className="zevioo-review-bars">
                                {review.KM[1] ? bars(review.KM, 1) : null}
                                {review.KM[0] ? bars(review.KM, 0) : null}                              
                            </div>
                            <ThumbsForm 
                                likeCount={review.LCN} 
                                dislikeCount={review.DCN}
                                reviewId={review.ID}/>
                       </div>
                    </div>
                </div>
             </div>
            )
        })
        const exportReviewComponent = (

            <div className="zevioo-product-review">
                <div className="zevioo-action-filter">
                    <div className="zevioo-filter__review">
                        <span className="zevioo-reviews__btn-active" onClick={this.props.displayReviewsClick}>Αξιολογήσεις ({this.props.reviewCount})</span>
                        {this.props.showQuestionsTab ? <span className="zevioo-questions__btn" onClick={this.props.displayQuestionsClick}>Ερωτήσεις ({this.props.questionCount})</span> : ''}
                    </div>
                    <div className="zevioo-filter__dropdown" style={this.props.reviewCount === 0 ? {display: 'none'} : {display: 'block'}} >
                        <label className="zevioo-dropdown__label">
                        Ταξινόμηση:
                        </label>
                        <select className="zevioo-select__first" value={this.state.value} onChange={(e) => handleChange(e)}>
                            <option value="default">Πιο χρήσιμη</option>    
                            <option value="new">Πιο πρόσφατη</option>
                        </select>
                    </div>
                </div>
                <div className="zevioo-reviews-list">
                {currentReviews.length ? exportReviews : firstReview}
                </div>
                <div className="zevioo-paggination">
                    <div id="zevioo-pager">
                        {(this.state.lastPager !== this.state.currentPage && this.props.reviews.length > 2 ) ? <a onClick={(e) => pageNextHandleClick(e)} >Περισσότερες αξιολογήσεις</a> : ''}
                    </div>
                </div>
            </div>
        );


        return (
            <Aux>
                {exportReviewComponent}
            </Aux>
            
        )
    }
}
export default ReviewList;