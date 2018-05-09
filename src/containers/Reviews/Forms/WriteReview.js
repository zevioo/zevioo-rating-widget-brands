import React, { Component } from 'react';
import axios from 'axios';
import Input from '../../../components/UI/Input/Input';
import {userStarRating, userQualityRating, userValueRating} from'../../../helpers/Helpers';
import Loading from '../../../components/Loading/Loading';
import StarIcon from '../../../components/Svg/star';

class WriteReview extends Component {
     starSvg = <StarIcon 
        classs="stars-svg"
        fill="var(--lightGray)"
        stroke="var(--zeviooColor)"
        strokeWidth= "5px"/>

    state = {
        reviewForm: {
            rating: {
                elementType: 'radio',
                elementConfig: {
                    label: <StarIcon 
                    classs="stars-svg__big"
                    fill="var(--lightGray)"
                    stroke="var(--zeviooColor)"
                    strokeWidth= "5px"/>,
                    className: 'zevioo-add-rating',
                    required: true,
                    options: [
                        {id: 'star1', labelId: 'star-input-1', name: 'rating', displayValue: '1'},
                        {id: 'star2', labelId: 'star-input-2', name: 'rating', displayValue: '2'},
                        {id: 'star3', labelId: 'star-input-3', name: 'rating', displayValue: '3'},
                        {id: 'star4', labelId: 'star-input-4', name: 'rating', displayValue: '4'},
                        {id: 'star5', labelId: 'star-input-5', name: 'rating', displayValue: '5'}
                    ]
                },
                value: '',
                validation: {
                    required: false
                },
                valid: true
            },
            positiveReview: {
                elementType: 'textarea',
                elementConfig: {
                    id: 'zevioo-positive-review',
                    name: 'positive_review',
                    maxLength: '300',
                    className: 'zevioo-form-input',
                    type: 'text',
                    placeholder: 'πχ. Επιγραμματικά, τα δυνατά του σημεία.'
                },
                value: '',
                validation: {
                    required: false,
                    maxLength: 300,
                },
                valid: true
            },
            negativeReview: {
                elementType: 'textarea',
                elementConfig: {
                    id: 'zevioo-negative-review',
                    name: 'negative_review',
                    maxLength: '300',
                    className: 'zevioo-form-input',
                    type: 'text',
                    placeholder: 'πχ. Επιγραμματικά, τα αδύνατα, εάν υπάρχουν.'
                },
                value: '',
                validation: {
                    required: false,
                    maxLength: 300,
                },
                valid: true
            },
            qualityBox: {
                elementType: 'radio',
                elementConfig: {
                    label: this.starSvg,
                    className: 'zevioo-add-rating',
                    required: true,
                    options: [
                        {id: 'quality-1', labelId: 'quality-input-1', name: 'quality', displayValue: '1'},
                        {id: 'quality-2', labelId: 'quality-input-2', name: 'quality', displayValue: '2'},
                        {id: 'quality-3', labelId: 'quality-input-3', name: 'quality', displayValue: '3'},
                        {id: 'quality-4', labelId: 'quality-input-4', name: 'quality', displayValue: '4'},
                        {id: 'quality-5', labelId: 'quality-input-5', name: 'quality', displayValue: '5'}
                    ]
                },
                value: '',
                validation: {
                    required: false
                },
                valid: true
            },
            valueBox: {
                elementType: 'radio',
                elementConfig: {
                    label: this.starSvg,
                    className: 'zevioo-add-rating',
                    required: true,
                    options: [
                        {id: 'value-1', labelId: 'value-input-1', name: 'value', displayValue: '1'},
                        {id: 'value-2', labelId: 'value-input-2', name: 'value', displayValue: '2'},
                        {id: 'value-3', labelId: 'value-input-3', name: 'value', displayValue: '3'},
                        {id: 'value-4', labelId: 'value-input-4', name: 'value', displayValue: '4'},
                        {id: 'value-5', labelId: 'value-input-5', name: 'value', displayValue: '5'}
                    ]
                },
                value: '',
                validation: {
                    required: false
                },
                valid: true
            },
            titleReview: {
                
                elementType: 'textarea',
                elementConfig: {
                    id: 'zevioo-title-review',
                    className: 'zevioo-form-input',
                    name: 'title_review',
                    type: 'text',
                    maxLength: '150',
                    required: true,
                    placeholder: 'πχ. Περιγράψτε περιληπτικά την εμπειρία σας.'

                },
                value: '',
                validation: {
                    required: false,
                    maxLength: 150,
                },
                valid: true
            },
            nickName: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    id: 'user_nickname',
                    className: 'zevioo-form-input user-name',
                    name: 'user_nickname',
                    required: true,
                    placeholder: 'πχ. Γιάννης Π'
                },
                value: '',
                validation: {
                    required: false
                },
                valid: true
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    id: 'user_email',
                    className: 'zevioo-form-input user-name',
                    name: 'review_user_email', 
                    required: true,
                    type: 'email',
                    placeholder: 'πχ. giannis@email.com'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false
            },
            age: {
                elementType: 'number',
                elementConfig: {
                    className: 'zevioo-form-input user-age',
                    name: 'year_birth', 
                    required: true,
                    id: 'user_year',
                    placeholder: '20'
                },
                value: '',
                validation: {
                    required: false
                },
                valid: true
            }
        },
        formIsValid: false,
        loading: false,
        showSuccess: false,
        showUserInfo: false,
        termsChecked: true,
        isValidAge: false
    }
    orderHandler = ( event ) => {
        event.preventDefault();
        this.setState( { loading: true } );
        const formData = {};
        for (let formElementIdentifier in this.state.reviewForm) {
            formData[formElementIdentifier] = this.state.reviewForm[formElementIdentifier].value;
        }
        const render = document.getElementById('zevioo-reviews');
        const USR = document.getElementById('zevioo-reviews').getAttribute('data-usr');
        const PSW = document.getElementById('zevioo-reviews').getAttribute('data-psw');
        const EAN = render.getAttribute('data-ean');

        const reviewForm = this.state.reviewForm;
        
        const zeviooDate = () => {
            let today = new Date();
            let date = today.toLocaleDateString();
            let time = today.toLocaleTimeString();
            let val = date + " " + time ;
            return val;
        };
        const thisDate = zeviooDate();
        const newReview = JSON.stringify({
            USR: USR,
            PSW: PSW,
            EAN: EAN,
            EML: reviewForm.email.value,
            NN: reviewForm.nickName.value,
            GD: '',
            AG: reviewForm.age.value,
            DT: thisDate,
            RT: reviewForm.rating.value,
            TT: reviewForm.titleReview.value,
            NT: reviewForm.negativeReview.value,
            PT: reviewForm.positiveReview.value,
            KM: [{
                    NM: "Αξίζει τα λεφτά του",
                    RT: reviewForm.valueBox.value
                },
                {
                    NM: "Ποιότητα",
                    RT: reviewForm.qualityBox.value
                }
            ],

        })

        if (reviewForm.age.value >= 16) {
            this.setState( { isValidAge: true } );
            axios.post( '/savereview', newReview )
            .then( response => {
    
                this.setState( { loading: false, showSuccess: true  } );
                this.setState(this.state);
    
            } )
            .catch( error => {
                this.setState( { loading: false } );
            } );
        } else {
            this.setState( { isValidAge: false, loading: false, showSuccess: true } );
        }

    }
    componentDidMount(){
        userStarRating();
        userQualityRating();
        userValueRating();
    }

    checkValidity(value, rules) {
        let isValid = true;
        if (!rules) {
            return true;
        }
        
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }

        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }

        return isValid;
    }
    termsHandleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
    
        this.setState({
          [name]: value
        });
      }

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedReviewForm = {
            ...this.state.reviewForm
        };
        const updatedFormElement = { 
            ...updatedReviewForm[inputIdentifier]
        };
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation)
        updatedReviewForm[inputIdentifier] = updatedFormElement;
        
        

        let formIsValid = true;
        for (let inputIdentifier in updatedReviewForm) {
            formIsValid = updatedReviewForm[inputIdentifier].valid && formIsValid;
        }

        this.setState({reviewForm: updatedReviewForm, formIsValid: formIsValid, showUserInfo: true});
    }

    render() {
        if (this.state.loading) {
            return <Loading />
         }
         if (!this.state.isValidAge && this.state.showSuccess) {
            return (
                <div className="zevioo-form__success">
                    <div className="zevioo-close-icons" onClick={this.props.click}><img src='https://zevioo.com/widgets/media/close.svg' className="zevioo-close-svg" alt="zevioo Close" height="30px"/></div>
                    <div className="zevioo-success-title">Μας συγχωρείτε,</div>
                    <div className="zevioo-success-subTitle">
                    αλλά προκειμένου να διαφυλάξουμε τα προσωπικά σας δεδομένα, δεν δεχόμαστε αξιολογήσεις ή ερωτήσεις από άτομα κάτω των 16 ετών.
                    </div>
                </div>
            )
        }

        if (this.state.showSuccess) {
            return (
                <div className="zevioo-form__success">
                    <div className="zevioo-close-icons" onClick={this.props.click}><img src='https://zevioo.com/widgets/media/close.svg' className="zevioo-close-svg" alt="zevioo Close" height="30px"/></div>
                    <div className="zevioo-success-title">Ευχαριστούμε!</div>
                    <div className="zevioo-success-subTitle">
                    Σας έχουμε στείλει ένα email. Επιβεβαιώστε τον λογαριασμό σας
                    κάνοντας κλικ στο σύνδεσμο επιβεβαίωσης και η αξιολόγηση σας θα δημοσιευθεί.
                    </div>
                </div>
            )
        }

        return (
            <div className="zevioo-write-review-wrapper">
                <div className="zevioo-write-review-box">
                <div className="zevioo-close-icon" onClick={this.props.click}><img src='https://zevioo.com/widgets/media/close.svg' className="zevioo-close-svg" alt="zevioo Close" height="30px"/></div>
                <form id="zevioo-review-form" onSubmit={this.orderHandler}>
                    <div className="zevioo-write-review-header">
                        <div className="zevioo-rating__item">
                            <span className="zevioo-rating-title">
                                Τι βαθμολογία θα του δίνατε συνολικά; 
                            </span>
                            <Input 
                                elementType={this.state.reviewForm.rating.elementType}
                                elementConfig={this.state.reviewForm.rating.elementConfig}
                                value={this.state.reviewForm.rating.value}
                                changed={(event) => this.inputChangedHandler(event, 'rating')}
                                 />
                        </div>
                        <div className="zevioo-rating__quality__money">
                        <div className="zevioo-rating-group__flex">
                            <span className="zevioo-label-small zevioo-rating-subtitle">
                                Ποιότητα 
                            </span>
                            <Input 
                                elementType={this.state.reviewForm.qualityBox.elementType}
                                elementConfig={this.state.reviewForm.qualityBox.elementConfig}
                                value={this.state.reviewForm.qualityBox.value}
                                changed={(event) => this.inputChangedHandler(event, 'qualityBox')}
                               />
                        </div>
                        <div className="zevioo-rating-group__flex">
                            <span className="zevioo-label-small zevioo-rating-subtitle">
                                Αξίζει τα λεφτά του
                            </span>
                            <Input 
                                elementType={this.state.reviewForm.valueBox.elementType}
                                elementConfig={this.state.reviewForm.valueBox.elementConfig}
                                value={this.state.reviewForm.valueBox.value}
                                changed={(event) => this.inputChangedHandler(event, 'valueBox')}
                                />
                        </div>
                    </div>
                    </div>

                    <div className="zevioo-write-review-body">
                        <div className="zevioo-form">
                            <div className="zevioo-form-group__flex">
                                <span className="zevioo-review-title">
                                Τι τίτλο θα δίνατε στην αξιολόγηση σας;
                                </span>
                                <Input 
                                elementType={this.state.reviewForm.titleReview.elementType}
                                elementConfig={this.state.reviewForm.titleReview.elementConfig}
                                value={this.state.reviewForm.titleReview.value}
                                changed={(event) => this.inputChangedHandler(event, 'titleReview')} />
                            </div>
                            <div className="zevioo-form-group__flex">
                            <div className="zevioo-half__flex">
                            <span className="zevioo-label-big">
                            Τι σας άρεσε περισσότερο;
                            </span>
                                <Input 
                                    elementType={this.state.reviewForm.positiveReview.elementType}
                                    elementConfig={this.state.reviewForm.positiveReview.elementConfig}
                                    value={this.state.reviewForm.positiveReview.value}
                                    changed={(event) => this.inputChangedHandler(event, 'positiveReview')} />
                                </div>
                                <div className="zevioo-half__flex">
                                <span className="zevioo-label-big">
                               Τι δεν σας αρέσε;
                                </span>
                                    <Input 
                                        elementType={this.state.reviewForm.negativeReview.elementType}
                                        elementConfig={this.state.reviewForm.negativeReview.elementConfig}
                                        value={this.state.reviewForm.negativeReview.value}
                                        changed={(event) => this.inputChangedHandler(event, 'negativeReview')} />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="zevioo-write-review-footer" style={{display: (this.state.showUserInfo)? 'inherit' : 'none'}}>
                    <div className="zevioo-user-info zevioo-form">
                    <div className="zevioo-form-group__flex_end">
                        <div className="zevioo-half__flex_end">
                            <span className="zevioo-label-big">
                            Ψευδώνυμο
                            </span>
                            <Input 
                            elementType={this.state.reviewForm.nickName.elementType}
                            elementConfig={this.state.reviewForm.nickName.elementConfig}
                            value={this.state.reviewForm.nickName.value}
                            changed={(event) => this.inputChangedHandler(event, 'nickName')} />
                        </div>
                        <div className="zevioo-half__flex_end">
                            <span className="zevioo-label-big">
                            Ηλικία
                            </span>
                            <Input 
                            elementType={this.state.reviewForm.age.elementType}
                            elementConfig={this.state.reviewForm.age.elementConfig}
                            value={this.state.reviewForm.age.value}
                            changed={(event) => this.inputChangedHandler(event, 'age')} />
                        </div>
                        <div className="zevioo-half__flex_end">
                        <span className="zevioo-label-big">
                            Email
                            </span>
                        <Input 
                            elementType={this.state.reviewForm.email.elementType}
                            elementConfig={this.state.reviewForm.email.elementConfig}
                            value={this.state.reviewForm.email.value}
                            changed={(event) => this.inputChangedHandler(event, 'email')} />
                        </div>
                    </div>
                    <div className="zevioo-submit__flex">
                        <div className="zevioo-submit__text">Αν η κριτική σας είναι ενδιαφέρουσα, ενδέχεται να δημοσιευθεί (χωρίς τα προσωπικά σας δεδομένα φυσικά) και σε άλλες ιστοσελίδες που συνεργάζονται με το zevioo.</div>
                    </div>
                    <div className="zevioo-submit__action">
                    <div className="zevioo-submit__terms">
                    <input
                        name="terms"
                        type="checkbox"
                        required
                        checked={this.state.isGoing}
                    onChange={(e) => this.termsHandleInputChange(e)} />
                    <a href="https://www.zevioo.com/terms.aspx" target="_blank" rel="noopener noreferrer" className="zevioo-submit__terms-text">Αποδέχομαι την Πολιτική Απορρήτου Zevioo</a>
                    </div>
                    <div className="zevioo-submit__button">
                    <button type="submit" className="zevioo-button zevioo-color__btn" form="zevioo-review-form" value="Submit">Δημοσιοποίηση</button>
                    </div>
                    </div>
                </div>
                    </div>
                </form>
            </div>
        </div>
        )
    }

}

export default WriteReview;
