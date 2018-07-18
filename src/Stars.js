import React, { Component } from 'react';
import axios from 'axios';
import {percentage} from './helpers/Helpers'
import StarIcon from './components/Svg/star'

class Stars extends Component {

    state = {
        rating: [],
        reviews: [],
        reviewsCounter: []
    };

    starSvgTransparent = <StarIcon 
    classs="zevioo-stars-tr"
    fill="transparent"
    stroke="var(--darkGray)"
    strokeWidth= "15px"/>
    
    starSvg = <StarIcon 
    classs="zevioo-stars-color"
    fill="var(--darkGray)"
    stroke="var(--darkGray)"
    strokeWidth= "15px"/>

    componentDidMount() {
        const render = document.querySelector('.zevioo-rating');
        const zeviooRating = document.querySelectorAll('.zevioo-rating')
        const USR = render.getAttribute('data-usr');
        const PSW = render.getAttribute('data-psw');
        let array = [];
        for(var i = 0; i < zeviooRating.length; i++)
        {
            array.push(zeviooRating[i].getAttribute('data-ean'));
        }
        // zeviooRating.forEach(function (element, index) {
        //     array.push(element.getAttribute('data-ean'));
        // });
            axios.post('/getreviews', {
                USR: USR,
                PSW: PSW,
                EAN: this.props.ean
            })
                 .then(response => {
                   const obj = response.data;
                   const updatedObj = {...obj}
                    this.setState({
                        rating: updatedObj.OR,
                        reviews: updatedObj.RC,
                        reviewsCounter: updatedObj.RL.length
                     })
                 })
             };

    render() {
            if(this.state.reviewsCounter <= 0){
                return null 
            }
            return (
                <div className="zevioo-star-rating">
                <span className="zevioo-rating-value">{this.state.rating.toFixed(1)}</span>    
                    <div className="zevioo-stars-container">
                        <div className="zevioo-stars-up">
                            <span>{this.starSvgTransparent}</span>
                            <span>{this.starSvgTransparent}</span>
                            <span>{this.starSvgTransparent}</span>
                            <span>{this.starSvgTransparent}</span>
                            <span>{this.starSvgTransparent}</span>
                        </div>
                        <div className="zevioo-stars-down" style={{width: percentage(this.state.rating,5)+'%'}}>
                            <span>{this.starSvg}</span>
                            <span>{this.starSvg}</span>
                            <span>{this.starSvg}</span>
                            <span>{this.starSvg}</span>
                            <span>{this.starSvg}</span>
                        </div>
                    </div>
                    <div className="zevioo-rating-counter">{this.state.reviewsCounter} αξιολογήσεις </div>
                    <span className="zevioo-none">5</span>
                </div>
            );
    }
}

export default Stars;