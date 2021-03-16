import React from 'react'
// import _ from 'lodash'
import Props from '../interfaces/ButtonPropsInterface';
const Button: React.FunctionComponent<Props> = (props) => {
    let btnType = props.type;

    const btnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (props.onClick) {
            props.onClick(e);
        }
    }

    switch (btnType) {
        case 'query':
            break;
        case 'submit':
            break;

        case 'print':
            break

        case 'reset':

            break;
        default:
            break;
    }

    return (
        <div className='col-3'>
            <button
                disabled={props.disabled}
                type={props.type}
                className={props.className} onClick={btnClick}><i className={props.icon}></i> {props.displayName}</button>
        </div>
    )
}

Button.defaultProps = {
    type: 'button',
    className: '',
    icon: '',
    disabled: false
}

export default Button;
