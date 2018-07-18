import React, { Component } from 'react';
import axios from 'axios';
import Aux from '../../../hoc/Aux';
import Backdrop from '../../../components/UI/Backdrop/Backdrop';


class ThumbsForm extends Component {
    state = {
        likeCounter: this.props.likeCount,
        dislikeCounter: this.props.dislikeCount,
        userIp: null,
        thumbable: true,
        showModal: false,
        showSuccess: false,
        postData: {             
            USR: null,
            PSW: null,
            EAN: null,
            RID: this.props.reviewId,
            LT: 0
        }
    }
    componentWillReceiveProps(nextProps) {
        if(nextProps.likeCount !== this.props.likeCount || nextProps.dislikeCount !== this.props.dislikeCount ) {
          this.setState({
              likeCounter: nextProps.likeCount,
              dislikeCounter: nextProps.dislikeCount
        });
        }
      }

    modalHandler = () => {
        this.setState({showModal: true});
    }
    modalCancelHandler = () => {
        this.setState({showModal: false});
    }
    thumbHandler =(e, val) => {
        e.preventDefault(e);
        const render = document.getElementById('zevioo-reviews');
        const USR = render.getAttribute('data-usr');
        const PSW = render.getAttribute('data-psw');
        const EAN = render.getAttribute('data-ean');

        const dataSend = {
            USR: USR,
            PSW: PSW,
            EAN: EAN,
            RID: this.props.reviewId,
            LT: val
        };
        if(val === '1') {

            if(this.state.thumbable) {
                this.setState({likeCounter: this.state.likeCounter + 1, thumbable:false})
                this.postForm(dataSend);
            }
        }
        if(val === '-1'){
            if(this.state.thumbable) {
            this.setState({dislikeCounter: this.state.dislikeCounter + 1, thumbable:false})
            this.postForm(dataSend);
            }
        }
        
    }

    postForm = (data) => {
        axios.post('/saveprdlike', data)
        .then( response => {
            this.setState({showSuccess: true});
        } )
        .catch( error => {
            this.setState( { loading: false } );
        } );
    }

    emailHandleChange(event) {
        this.setState({
            emailValue: event.target.value,
            postData: {             
                RID: this.props.reviewId,
                LT: this.state.postData.LT
            }
        });
      }
    
      emailHandleSubmit(event, data) {
        this.postForm(data);
        event.preventDefault();
      }
        showSuccessHtml = (
        <div className="zevioo-thumb__success">
        <div className="zevioo-success-title">Ευχαριστούμε!</div>
        <div className="zevioo-success-subTitle">
            Η προτίμηση σας έχει καταχωρηθεί.
        </div>
        </div>)

    render() {
       const showThumbForm = (
            (this.state.showSuccess) ? this.showSuccessHtml :
            <form className="zevioo-form__thumb" onSubmit={(e) => this.emailHandleSubmit(e , this.state.postData)}>
            <div className="zevioo-user-info zevioo-form">
                <div className="zevioo-form-group">
                    <div className="zevioo-thumb-title">Παρακαλώ εισάγετε το e-mail σας για να καταχωρηθεί η προτίμησή σας</div>
                    <input className='zevioo-form-input' type="email" value={this.state.emailValue} onChange={(e) => this.emailHandleChange(e)}  required />
                </div>
                <div className="zevioo-form-group zevioo-flex__right">
                    <input className="zevioo-button zevioo-color__btn" type="submit" value="Υποβολή" />
                </div>
            </div>
        </form>
        )

        
        return (
            <Aux>
            <Backdrop show={this.state.showModal} clicked={(e) => this.modalCancelHandler(e)} />
            <div className="zevioo-helpful">
                <div className={(this.state.showModal) ? "zevioo-helpful_on" : "" }>
                {(this.state.showModal) ? showThumbForm : null}
                </div>
            <span className="zevioo-helpful-title">Σας φάνηκε χρήσιμη;</span>
            <span className="zevioo-thumb-up" onClick={(e) => this.thumbHandler(e, '1')}>
                <img src='https://zevioo.com/widgets/media/thumbUp.svg' className="zevioo-thumb" alt="zevioo Thumb up" height="20px"/> {this.state.likeCounter}
            </span>
            <span className="zevioo-thumb-down" onClick={(e) => this.thumbHandler(e, '-1')}>
                <img src='https://zevioo.com/widgets/media/thumbDown.svg'  className="zevioo-thumb" alt="zevioo Thumb Down" height="20px"/> {this.state.dislikeCounter}
            </span>    
            </div>
            </Aux>
        )
    }


}

export default ThumbsForm;