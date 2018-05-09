import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Stars from './Stars'
import Banner from './Banner'
import axios from 'axios';

//Config 
axios.defaults.baseURL = 'https://api.zevioo.com/main.svc';
axios.defaults.headers.post['Content-Type'] = 'application/json';




// Append Style 
var style_tag = document.createElement('link');
style_tag.setAttribute("rel","stylesheet");
style_tag.setAttribute("href","https://zevioo.com/widgets/css/zeviooRatingWidget.css");
(document.getElementsByTagName("head")[0] || document.documentElement).appendChild(style_tag);

const zeviooRating = document.querySelectorAll('.zevioo-rating')
const zeviooReviews = document.getElementById('zevioo-reviews')
const zeviooBanner = document.getElementById('zevioo-banner')


if(zeviooRating) {
    // zeviooRating.forEach(function (element, index) {
    //     ReactDOM.render(<Stars key={index} ean={element.getAttribute('data-ean')} />, element);
    // });
    for(var i = 0; i < zeviooRating.length; i++)
    {
    ReactDOM.render(<Stars key={i} ean={zeviooRating[i].getAttribute('data-ean')} />, zeviooRating[i]);
    }
}

if(zeviooReviews) {
    ReactDOM.render(<App />, zeviooReviews);
}
if(zeviooBanner) {
    ReactDOM.render(<Banner />, zeviooBanner);
}

