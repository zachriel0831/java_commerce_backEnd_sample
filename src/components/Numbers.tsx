import React from 'react';
import Props from '../interfaces/TextPropsInterface';
import _ from 'lodash';
import utils from '../utils/utils'
const Numbers: React.FunctionComponent<Props> = (props) => {
    const textChanges = (e: React.ChangeEvent<HTMLInputElement>) => {
        let val = e.currentTarget.value;
        
        console.log(utils.isNumber(val));

        if (utils.isNumber(val)) {
            props.onChange(e);
        };
    }

    return <>
        <div className="col-5">
            <label className="form-label">{props.label}</label>
        </div>
        <div className='col-9'>
            <input
                className={`form-input ${props.is_success}`}
                name={props.name}
                value={props.value}
                maxLength={props.maxLength}
                minLength={props.minLength}
                style={props.style}
                size={props.size}
                readOnly={props.readOnly}
                placeholder={props.placeholder}
                type='text'
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => textChanges(e)}
            />
            {
                (props.is_success) ?
                    <p className='form-input-hint'>{props.warningMsg}</p> : <></>
            }
        </div></>
};

Numbers.defaultProps = {
    style: {},
    readOnly: false,
    value: ''
};

export default Numbers;
