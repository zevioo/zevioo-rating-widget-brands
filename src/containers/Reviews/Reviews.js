import React, { Component } from 'react';
import axios from 'axios';
import Aux from '../../hoc/Aux';



import ReviewsHeader from './ReviewsHeader';
import ReviewsHeaderNone from './ReviewsHeaderNone';
import ReviewList from '../Reviews/ReviewList/ReviewList';
import QuestionList from '../Reviews/ReviewList/QuestionList';
import WriteReview from '../Reviews/Forms/WriteReview';
import Loading from '../../components/Loading/Loading';
import AskQuestion from '../Reviews/Forms/AskQuestion';





class Reviews extends Component {

    state = {
        headerStats: [],
        stars: [],
        reviews: [],
        questions:[],
        product: [],
        QE: false,
        loading: true,
        haveReviews: false,
        writeReview: false,
        askQuestions: false,
        filterReview: false,
        filterReviewNum: 5,
        displayReviews: true,
        displayQuestions: false
        
    };

    
    componentDidMount() {
        const render = document.getElementById('zevioo-reviews');
        const USR = render.getAttribute('data-usr');
        const PSW = render.getAttribute('data-psw');
        const EAN = render.getAttribute('data-ean');

        axios.post('/getreviews', {
            USR: USR,
            PSW: PSW,
            EAN: EAN,
            ST: 0
        })
             .then(response => {
               const obj = response.data;
               const reviews = obj.RL;
               const questions = obj.QL;
               const updatedQuestions = [...questions]
               const updatedReviews = [...reviews]
               const updatedObj = {...obj}


               if (obj.RL.length){ //Check if we have a list of reviews
                this.setState({
                 reviews: updatedReviews,
                 QE: updatedObj.QE, //updatedObj.QE
                 headerStats: {
                     OR: updatedObj.OR,
                     RC: reviews.length,
                     qualityRT: updatedObj.OKM[0].RT,
                     valueRT: updatedObj.OKM[1].RT,
                     oneRC: updatedObj.RCL[0].RC,
                     oneRT: updatedObj.RCL[0].RT,
                     twoRC: updatedObj.RCL[1].RC,
                     twoRT: updatedObj.RCL[1].RT,
                     threeRC: updatedObj.RCL[2].RC,
                     threeRT: updatedObj.RCL[2].RT,
                     fourRC: updatedObj.RCL[3].RC,
                     fourRT: updatedObj.RCL[3].RT,
                     fiveRC: updatedObj.RCL[4].RC,
                     fiveRT: updatedObj.RCL[4].RT,
                     totalReviews: reviews.length
                 },
                 product: {IMG:updatedObj.IMG, NM:updatedObj.NM},
                 questions: updatedQuestions,
                 loading: false,
                 haveReviews: true
                 })
               } else {
                   this.setState({
                    loading: false,
                    haveReviews: false,
                    reviews: updatedReviews,
                    questions: updatedQuestions,
                    QE: updatedObj.QE //updatedObj.QE
                   })
               }
             })
             };

             // Append Structured Data 
             appendLdJson = (data) => {
                var script_tag = document.createElement('script');
                script_tag.setAttribute("type","application/ld+json");
                script_tag.innerHTML = JSON.stringify(data);
                (document.getElementsByTagName("head")[0] || document.documentElement).appendChild(script_tag);
             }


             askQuestionsHandler = (e) => {
                 e.preventDefault();
                 this.setState({
                    askQuestions: !this.state.askQuestions,
                    writeReview: false
                 })
             }

            writeReviewHandler = ( e ) => {
                e.preventDefault();                
                this.setState({
                    writeReview: !this.state.writeReview,
                    askQuestions: false
                })
            }

            filterHandlerClick( e ) {
                e.preventDefault();
                let filterVal = e.target.closest('.zevioo-clickable').getAttribute('data-star')      
                this.setState({
                    filterReview: true,
                    filterReviewNum: parseInt(filterVal, 10)
                })
              }


            // Display Reviews And Questions Handlers
            displayReviewsHandler = (e) => {
                e.preventDefault();
                this.setState({
                    displayReviews: true,
                    displayQuestions: false

                    })
                }
                displayQuestionsHandler = (e) => {
                    e.preventDefault();
                    this.setState({
                        displayReviews: false,
                        displayQuestions: true
    
                        })
                    }



    render() {
        let JsonLd = {
        "@context": "http://schema.org",
            "@type": "Product",
            "name": this.state.product.NM,
            "image": this.state.product.IMG,
            "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": this.state.headerStats.OR,
            "ratingCount": this.state.headerStats.RC
            },
            "review": this.state.reviews.map((review, index) =>{ return {
                "@type": "Review",
                "description": review.NT && review.PT,
                "name": review.TT,
                "itemReviewed": {
                  "@type": "Product",
                  "name": this.state.product.NM
                },
                "author": {
                  "@type": "Person",
                  "name": review.FN
                },
                "datePublished": review.DT.slice(0,10),
                "reviewRating": {
                  "@type": "Rating",
                  "bestRating": "5",
                  "ratingValue": review.RT,
                  "worstRating": "1"
                }
              }
                  })
            
        }
        if (this.state.loading) {
           return <Loading /> ;
        } else {
            if(this.state.haveReviews === false){
                return (
                    <Aux>
                        <h3 className="zevioo-h3">
                        Αυθεντικές αξιολογήσεις 
                        <span className="zevioo-title">από το</span> 
                        <img src='https://zevioo.com/widgets/media/Logo.svg' className="zevioo-logo" alt="zevioo logo" height="16px"/>
                        </h3>
                        <ReviewsHeaderNone 
                        headerStats={this.state.headerStats} 
                            writeReviewClick={( e )=> this.writeReviewHandler(e)}
                            askQuestionClick={( e )=> this.askQuestionsHandler(e)}
                            filterClick={( e )=> this.filterHandlerClick(e)}
                            reviewBtn={this.state.writeReview}
                            questionBtn={this.state.askQuestions}
                            showQuestionsTab = {this.state.QE}
                            />

                            {this.state.writeReview? <WriteReview click={( e )=> this.writeReviewHandler(e)}/> : null }
                            {this.state.askQuestions? <AskQuestion click={( e )=> this.askQuestionsHandler(e)}/> : null }
                            {this.state.displayReviews ?
                                <ReviewList 
                                    reviews={this.state.reviews}
                                    reviewCount={this.state.reviews.length}
                                    questionCount={this.state.questions.length}
                                    isFilter={this.state.filterReview}
                                    filterNum={this.state.filterReviewNum}
                                    displayReviewsClick={( e )=> this.displayReviewsHandler(e)}
                                    displayQuestionsClick={( e )=> this.displayQuestionsHandler(e)}
                                    showQuestionsTab = {this.state.QE}
                                    clickReview={( e )=> this.writeReviewHandler(e)}
                                    reviewBtn={this.state.writeReview}
                                /> : null }
                            
                            {this.state.displayQuestions && this.state.QE ? 
                                <QuestionList 
                                    reviewCount={this.state.reviews.length}
                                    questions={this.state.questions}
                                    displayReviewsClick={( e )=> this.displayReviewsHandler(e)}
                                    displayQuestionsClick={( e )=> this.displayQuestionsHandler(e)}
                                    clickQuestion={( e )=> this.askQuestionsHandler(e)}
                                    questionBtn={this.state.askQuestions}
                                />: null }

                    </Aux>
                )
            }
            return (
                
                <Aux>
                {this.appendLdJson(JsonLd)}
                
                <h3 className="zevioo-h3">
                Αυθεντικές αξιολογήσεις 
                <span className="zevioo-title">από το</span> 
                <img src='https://zevioo.com/widgets/media/Logo.svg' className="zevioo-logo" alt="zevioo logo" height="16px"/>
                </h3>
                <ReviewsHeader 
                headerStats={this.state.headerStats} 
                product={this.state.product}
                    writeReviewClick={( e )=> this.writeReviewHandler(e)}
                    askQuestionClick={( e )=> this.askQuestionsHandler(e)}
                    filterClick={( e )=> this.filterHandlerClick(e)}
                    reviewBtn={this.state.writeReview}
                    questionBtn={this.state.askQuestions}
                    showQuestionsTab = {this.state.QE}
                    />
                {this.state.writeReview? <WriteReview click={( e )=> this.writeReviewHandler(e)}/> : null }
                
                {this.state.askQuestions? <AskQuestion click={( e )=> this.askQuestionsHandler(e)}/> : null }

                {this.state.displayReviews ?
                    <ReviewList 
                        reviews={this.state.reviews}
                        reviewCount={this.state.reviews.length}
                        questionCount={this.state.questions.length}
                        isFilter={this.state.filterReview}
                        filterNum={this.state.filterReviewNum}
                        displayReviewsClick={( e )=> this.displayReviewsHandler(e)}
                        displayQuestionsClick={( e )=> this.displayQuestionsHandler(e)}
                        showQuestionsTab = {this.state.QE}
                    /> : null }
                
                {this.state.displayQuestions && this.state.QE ? 
                    <QuestionList 
                        reviewCount={this.state.reviews.length}
                        questionCount={this.state.questions.length}
                        questions={this.state.questions}
                        displayReviewsClick={( e )=> this.displayReviewsHandler(e)}
                        displayQuestionsClick={( e )=> this.displayQuestionsHandler(e)}
                        clickQuestion={( e )=> this.askQuestionsHandler(e)}
                        questionBtn={this.state.askQuestions}
                    />: null }
                </Aux>
            )
        }
    }
}

export default Reviews;