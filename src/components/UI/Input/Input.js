import React from 'react';
import Aux from '../../../hoc/Aux'

const input = ( props ) => {
    let inputElement = null;

    switch ( props.elementType ) {
            case ( 'input' ):
            inputElement = <input
            {...props.elementConfig}
            value={props.value}
            onChange={props.changed} />;
            break;

            case ( 'number' ):
            inputElement = <input
            type="number"
            {...props.elementConfig}
            value={props.value}
            onChange={props.changed} />;
            break;

            case ( 'checkbox' ):
            inputElement = <input
            type="checkbox"
            {...props.elementConfig}
            value={props.value}
            onChange={props.changed} />;
            break;

            case ( 'textarea' ):
            inputElement =
                <textarea
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} /> ;
            break;

            case ( 'select' ):
            inputElement = (
                <select
                    id={props.elementConfig.id}
                    className={props.elementConfig.className}
                    name={props.elementConfig.name}
                    value={props.value}
                    onChange={props.changed}
                    >
                    {props.elementConfig.options.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.displayValue}
                        </option>
                    ))}
                </select>
            );
            break;
            case ( 'radio' ):
            inputElement = (
                <div className={props.elementConfig.className}>
                {props.elementConfig.options.map(option => (
                    <Aux key={option.id}>
                        <label htmlFor={option.id} id={option.labelId}>{props.elementConfig.label}</label>
                        <input
                        id={option.id}
                        name={option.name}
                        type="radio"
                        value={option.displayValue}
                        onChange={props.changed} 
                        onClick={props.click}/>
                    </Aux>
                   
                ))}
                </div>
            );
            break;
            case ( 'radio box' ):
            inputElement = (
                <div className="zevioo-add-rating zevioo__quality">
                {props.elementConfig.options.map(option => (
                    <Aux>
                        <label htmlFor={option.id} id={option.labelId}><span className="zevioo-box"></span></label>
                        <input
                        key={option.id}
                        id={option.id}
                        name={option.name}
                        type="radio"
                        value={option.displayValue}
                        onChange={props.changed} 
                        onClick={props.click}/>
                    </Aux>
                   
                ))}
                </div>
            );
            break;
        default:
            inputElement = <input
                className="{classes.InputElement}"
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />;
    }

    return (
        <Aux>
            {inputElement}
        </Aux>
    );

};

export default input;