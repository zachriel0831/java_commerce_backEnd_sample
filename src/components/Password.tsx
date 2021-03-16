import React from 'react';
import Props from '../interfaces/TextPropsInterface';

const Password: React.FunctionComponent<Props> = (props) => {
    const textChanges = (e: React.ChangeEvent<HTMLInputElement>) => {
        props.onChange(e);
    }

    return <>
        <div className="col-5">
            <label className="form-label">{props.label}</label>
        </div>
        <div className='col-9'>
            <input
                className={`form-input ${props.is_success}`}
                name={props.name}
                maxLength={props.maxLength}
                minLength={props.minLength}
                style={props.style}
                size={props.size}
                readOnly={props.readOnly}
                placeholder={props.placeholder}
                type='password'
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => textChanges(e)}
            />
            {
                (props.is_success) ?
                    <p className='form-input-hint'>{props.warningMsg}</p> : <></>
            }
        </div></>
};

Password.defaultProps = {
    style: {},
    readOnly: false,
    value: ''
};

export default Password;
