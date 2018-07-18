import React, { Component } from 'react';
import axios from 'axios';
import Input from '../../../components/UI/Input/Input';
import Loading from '../../../components/Loading/Loading';

class AskQuestion extends Component {
    state = {
        questionForm: {
            question: {
                
                elementType: 'textarea',
                elementConfig: {
                    id: 'zevioo-title-review',
                    className: 'zevioo-form-input',
                    name: 'question',
                    required: true,
                    type: 'text',
                    maxLength: '150'
                    
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
                    required: true,
                    name: 'user_nickname',
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
                    placeholder: 'giannis@mail.com'
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
        isValidAge: false
    }
    askHandler = ( event ) => {
        event.preventDefault();
        this.setState( { loading: true } );

        const formData = {};
        for (let formElementIdentifier in this.state.questionForm) {
            formData[formElementIdentifier] = this.state.questionForm[formElementIdentifier].value;
        }
        const render = document.getElementById('zevioo-reviews');
        const USR = document.getElementById('zevioo-reviews').getAttribute('data-usr');
        const PSW = document.getElementById('zevioo-reviews').getAttribute('data-psw');
        const EAN = render.getAttribute('data-ean');
        const questionForm = this.state.questionForm;
        
        const newQuestion = JSON.stringify({
            USR: USR,
            PSW: PSW,
            EML: questionForm.email.value,
            NN: questionForm.nickName.value,
            AG: questionForm.age.value,
            EAN: EAN,
            QT: questionForm.question.value,
            TM:true

        })
        if (questionForm.age.value >= 16) {
            this.setState( { isValidAge: true } );
            axios.post( '/postquestion', newQuestion )
            .then( response => {
                this.setState( { loading: false, showSuccess: true } );
                this.setState(this.state);
                
    
            } )
            .catch( error => {
                this.setState( { loading: false } );
            } );
         } else {
            this.setState( { isValidAge: false, loading: false, showSuccess: true } );
         }

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

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedquestionForm = {
            ...this.state.questionForm
        };
        const updatedFormElement = { 
            ...updatedquestionForm[inputIdentifier]
        };
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation)
        updatedquestionForm[inputIdentifier] = updatedFormElement;
        
        

        let formIsValid = true;
        for (let inputIdentifier in updatedquestionForm) {
            formIsValid = updatedquestionForm[inputIdentifier].valid && formIsValid;
        }

        this.setState({questionForm: updatedquestionForm, formIsValid: formIsValid, showUserInfo: true});
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
                    <div className="zevioo-close-icons" onClick={this.props.click}><img src='https://zevioo.com/widgets/media/close.svg'  className="zevioo-close-svg" alt="zevioo Close" height="30px"/></div>
                    <div className="zevioo-success-title">Ευχαριστούμε!</div>
                    <div className="zevioo-success-subTitle">
                    Σας έχουμε στείλει ένα email. Επιβεβαιώστε τον λογαριασμό σας
                    κάνοντας κλικ στο σύνδεσμο επιβεβαίωσης και η απάντησή σας θα δημοσιευθεί.
                    </div>
                </div>
            )
        }
        return (
            <div className="zevioo-write-review-wrapper">
                <div className="zevioo-write-review-box">
                <div className="zevioo-close-icons quest" onClick={this.props.click}><img src='https://zevioo.com/widgets/media/close.svg'  className="zevioo-close-svg" alt="zevioo Close" height="30px"/></div>
                <form id="zevioo-question-form" onSubmit={this.askHandler}>
                    <div className="zevioo-write-review-body">
                        <div className="zevioo-form">
                            <div className="zevioo-form-group">
                            <label className="zevioo-label-big">
                            Ποια είναι η ερώτησή σας?
                            </label>
                            <Input 
                            elementType={this.state.questionForm.question.elementType}
                            elementConfig={this.state.questionForm.question.elementConfig}
                            value={this.state.questionForm.question.value}
                            changed={(event) => this.inputChangedHandler(event, 'question')} />
                            </div>
                        </div>
                    </div>

                    <div className="zevioo-write-review-footer" style={{display: (this.state.showUserInfo)? 'inherit' : 'none'}}>
                        <div className="zevioo-user-info zevioo-form">
                            <div className="zevioo-form-group__flex_end">
                                <div className="zevioo-half__flex_end">
                                    <label className="zevioo-label-big">
                                    Ψευδώνυμο
                                    </label>
                                    <Input 
                                    elementType={this.state.questionForm.nickName.elementType}
                                    elementConfig={this.state.questionForm.nickName.elementConfig}
                                    value={this.state.questionForm.nickName.value}
                                    changed={(event) => this.inputChangedHandler(event, 'nickName')} />
                                </div>
                                <div className="zevioo-half__flex_end">
                                    <label className="zevioo-label-big">
                                    Ηλικία
                                    </label>
                                    <Input 
                                    elementType={this.state.questionForm.age.elementType}
                                    elementConfig={this.state.questionForm.age.elementConfig}
                                    value={this.state.questionForm.age.value}
                                    changed={(event) => this.inputChangedHandler(event, 'age')} />
                                </div>
                                <div className="zevioo-half__flex_end">
                                <span className="zevioo-label-big">
                                Email
                                </span>
                                <Input 
                                elementType={this.state.questionForm.email.elementType}
                                elementConfig={this.state.questionForm.email.elementConfig}
                                value={this.state.questionForm.email.value}
                                changed={(event) => this.inputChangedHandler(event, 'email')} />
                            </div>
                            <div className="zevioo-submit__button">
                            <button type="submit" className="zevioo-btn__ask zevioo-button zevioo-color__btn" form="zevioo-question-form" value="Submit">Δημοσιοποίηση</button>
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

export default AskQuestion;
