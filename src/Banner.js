import React, { Component } from 'react';
import axios from 'axios';
import ZeviooStar from './components/Svg/ZeviooStar';
import Close from './components/Svg/Close';
import Aux from './hoc/Aux';
import ZeviooLogo from './components/Svg/ZeviooLogo';

class Banner extends Component {

    state = {
        bannerObj: [],
        CPR: null,
        visibility: true
    };

    componentDidMount() {
        const render = document.getElementById('zevioo-banner');
        const USR = render.getAttribute('data-usr');
        const PSW = render.getAttribute('data-psw');
            axios.post('/credbadge', {
                USR: USR,
                PSW: PSW,
            })
                 .then(response => {
                   const obj = response.data;
                   const updatedObj = {...obj}
                   const CPR = this.format(updatedObj.CPR)
                    this.setState({
                        bannerObj: updatedObj,
                        CPR: CPR
                     })
                 })
             };
        bannerVisibility(e) {
            e.preventDefault();
            this.setState({
                visibility: false
            })
        }
        format(num) {
            var n = num.toString(), p = n.indexOf('.');
            return n.replace(/\d(?=(?:\d{3})+(?:\.|$))/g, function($0, i){
                return p<0 || i<p ? ($0+'.') : $0;
            });
        }

    render() {
        const closeIcon = (
            <Aux>
            <Close
            width="20px"
            fill="#fff"
            />
            </Aux>  
        )
        const rendering = ( 
            <div className="zevioo-banner">
            <div className="zevioo-banner__container zevioo-clearfix">
            <div className="zevioo-banner__left">
                <ZeviooStar
                fill='#fff'
                width="30px"
                height='30px'
                classN="zeviooStar-svg"
                />
                <span className="zevioo-PR__counter"><strong>{this.state.CPR} αξιολογήσεις προϊόντων </strong><span>από το</span> <span className="zevioo-logo-svg"><ZeviooLogo fill="#fff" width="50px"/></span></span>
            </div>
            <div className="zevioo-banner__right">
                <span className="zevioo-CX__score">Βαθμολογία e-shop <strong>{this.state.bannerObj.RCX}</strong>/10</span>
                <span className="zevioo-banner-close" onClick={e => this.bannerVisibility(e)}>{closeIcon}</span>
            </div>
            </div>
        </div>
        )
        return (
            <Aux>
            {this.state.visibility && rendering}
            </Aux>
        );
    }
}

export default Banner;