import React from 'react'
import Aux from '../hoc/Aux'

export const percentage = (star, total)  => {
    return (star * 100) / total 
}

export const reviewBar = (val) => {
    if (val === 1 || (val > 0 && val < 1) ) {
        return (
            <span className="zevioo-box-1"></span>
        );
    } else if (val === 2 || (val > 2 && val < 3)) {
        return (
            <Aux>
            <span className="zevioo-box-2"></span>
            <span className="zevioo-box-2"></span>
            </Aux>

        );
    } else if (val === 3 || (val > 3 && val < 4)) {
        return (
        <Aux>
        <span className="zevioo-box-3"></span>
        <span className="zevioo-box-3"></span>
        <span className="zevioo-box-3"></span>
        </Aux>
        );
    } else if (val === 4 || (val > 4 && val < 5)) {
        return (
        <Aux>
        <span className="zevioo-box-4"></span>
        <span className="zevioo-box-4"></span>
        <span className="zevioo-box-4"></span>
        <span className="zevioo-box-4"></span>
        </Aux>
        );
    
    } else if (val === 5) {
        return (
        <Aux>
        <span className="zevioo-box-5"></span>
        <span className="zevioo-box-5"></span>
        <span className="zevioo-box-5"></span>
        <span className="zevioo-box-5"></span>
        <span className="zevioo-box-5"></span>
        </Aux>
        );

    } else {
        return "";
    }

}

export const filterReview = (filter)  => {
       return (review) => review.RT === filter
}


export const sortReviews = (sortBy) => {
   return (a, b) => a.sortBy > b.sortBy
}



export const hasClass = (el, className) => {
    if (el.classList)
        return el.classList.contains(className)
    else
        return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'))
}
export const addClass = (el, className) => {
    if (el.classList)
        el.classList.add(className)
    else if (!hasClass(el, className)) el.className += " " + className
}
export const removeClass = (el, className) => {
    if (el.classList)
        el.classList.remove(className)
    else if (hasClass(el, className)) {
        var reg = new RegExp('(\\s|^)' + className + '(\\s|$)')
        el.className=el.className.replace(reg, ' ')
    }
}


export const userStarRating = () => {
    let star1 = document.getElementById("star-input-1");
    let star2 = document.getElementById("star-input-2");
    let star3 = document.getElementById("star-input-3");
    let star4 = document.getElementById("star-input-4");
    let star5 = document.getElementById("star-input-5");
    
    star1.addEventListener('click', function() {
        addClass(star1, "star-choosen");
        removeClass(star2, "star-choosen");
        removeClass(star3, "star-choosen");
        removeClass(star4, "star-choosen");
        removeClass(star5, "star-choosen");
    })
    star2.addEventListener('click', function() {
        addClass(star2, "star-choosen");
        addClass(star1, "star-choosen");
        removeClass(star3, "star-choosen");
        removeClass(star4, "star-choosen");
        removeClass(star5, "star-choosen");
    })
    star3.addEventListener('click', function() {
        addClass(star3, "star-choosen");
        addClass(star2, "star-choosen");
        addClass(star1, "star-choosen");
        removeClass(star4, "star-choosen");
        removeClass(star5, "star-choosen");
    })
    star4.addEventListener('click', function() {
        addClass(star4, "star-choosen");
        addClass(star2, "star-choosen");
        addClass(star3, "star-choosen");
        addClass(star1, "star-choosen");
        removeClass(star5, "star-choosen");
    })
    star5.addEventListener('click', function() {
        addClass(star5, "star-choosen");
        addClass(star2, "star-choosen");
        addClass(star3, "star-choosen");
        addClass(star4, "star-choosen");
        addClass(star1, "star-choosen");
    })
}
export const userQualityRating = () => {
    let box1 = document.getElementById("quality-input-1");
    let box2 = document.getElementById("quality-input-2");
    let box3 = document.getElementById("quality-input-3");
    let box4 = document.getElementById("quality-input-4");
    let box5 = document.getElementById("quality-input-5");

    box1.addEventListener('click', function() {
        addClass(box1, "quality-choosen");
        removeClass(box2, "quality-choosen");
        removeClass(box3, "quality-choosen");
        removeClass(box4, "quality-choosen");
        removeClass(box5, "quality-choosen");
    })
    box2.addEventListener('click', function() {
        addClass(box2, "quality-choosen");
        addClass(box1, "quality-choosen");
        removeClass(box3, "quality-choosen");
        removeClass(box4, "quality-choosen");
        removeClass(box5, "quality-choosen");
    })
    box3.addEventListener('click', function() {
        addClass(box3, "quality-choosen");
        addClass(box2, "quality-choosen");
        addClass(box1, "quality-choosen");
        removeClass(box4, "quality-choosen");
        removeClass(box5, "quality-choosen");
    })
    box4.addEventListener('click', function() {
        addClass(box4, "quality-choosen");
        addClass(box2, "quality-choosen");
        addClass(box3, "quality-choosen");
        addClass(box1, "quality-choosen");
        removeClass(box5, "quality-choosen");

    })
    box5.addEventListener('click', function() {
        addClass(box5, "quality-choosen");
        addClass(box2, "quality-choosen");
        addClass(box3, "quality-choosen");
        addClass(box4, "quality-choosen");
        addClass(box1, "quality-choosen");

    })
}
export const userValueRating = () => {
    let box1 = document.getElementById("value-input-1");
    let box2 = document.getElementById("value-input-2");
    let box3 = document.getElementById("value-input-3");
    let box4 = document.getElementById("value-input-4");
    let box5 = document.getElementById("value-input-5");
    
    box1.addEventListener('click', function() {
        addClass(box1, "value-choosen");
        removeClass(box2, "value-choosen");
        removeClass(box3, "value-choosen");
        removeClass(box4, "value-choosen");
        removeClass(box5, "value-choosen");

    })
    box2.addEventListener('click', function() {
        addClass(box2, "value-choosen");
        addClass(box1, "value-choosen");
        removeClass(box3, "value-choosen");
        removeClass(box4, "value-choosen");
        removeClass(box5, "value-choosen");
    })
    box3.addEventListener('click', function() {
        addClass(box3, "value-choosen");
        addClass(box2, "value-choosen");
        addClass(box1, "value-choosen");
        removeClass(box4, "value-choosen");
        removeClass(box5, "value-choosen");
    })
    box4.addEventListener('click', function() {
        addClass(box4, "value-choosen");
        addClass(box2, "value-choosen");
        addClass(box3, "value-choosen");
        addClass(box1, "value-choosen");
        removeClass(box5, "value-choosen");
    })
    box5.addEventListener('click', function() {
        addClass(box5, "value-choosen");
        addClass(box2, "value-choosen");
        addClass(box3, "value-choosen");
        addClass(box4, "value-choosen");
        addClass(box1, "value-choosen");
    })
}

/* Date Clac */
export const dateToDay = (date) => {
    //Convert The Date Format 
    const convertDigitIn = (date) => date.split('/').reverse().join('/');
    
     const convertedDate = convertDigitIn(date.slice(0, 10));
    /* Date Finder Function */
    const today= new Date() //Today
    const day= new Date(convertedDate) //Review Date

    const one_day=1000*60*60*24
    
    //Calculate difference btw the two dates, and convert to days
    const x = (Math.ceil((today.getTime() - day.getTime())/(one_day)))

    const y = 365; //Set the year count
    const y2 = 30; //Set day count
    const remainder = x % y; // the remainder
    const dayCount = remainder % y2; // day count
    const year = (x - remainder) / y;
    const month = (remainder - dayCount) / y2;
    if(year !== 0){
        if(year === 1){
            return (year + ' χρόνος πριν')
        } else {
            return (year + ' χρόνια πριν')
        }
        
    }
    if(month !== 0){
        if(month === 1){
            return (month + ' μήνας πριν')
        } else {
            return (month + ' μήνες πριν')
        }
        
    }
    if(dayCount !== 0){
        if(dayCount === 1){
            return (' Σήμερα')
        } else {
            return (dayCount + ' μέρες πριν')
        }
        
    }


    }
    
