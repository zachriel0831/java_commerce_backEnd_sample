import React, { useEffect, useState } from 'react';
import Props from '../interfaces/AmountPropsInterface';
import _ from 'lodash';
import utils from '../utils/utils'

const Amount: React.FunctionComponent<Props> = (props) => {

    const [state, setState] = useState<string | undefined>(props.value);

    const transferToAmountFormat = (val: any, decimalPoint: number) => {
        if (!val)
            return;

        let justNumbers: string = val.replace(/[^01234567890\.]/g, "");
        let decimalRegex = /(\d{0,})(\.(\d{1,})?)?/g

        let decimalPartMatches: Array<string> | null = decimalRegex.exec(justNumbers);
        let decimalPart = "";
        let withoutDecimal = "";

        if (decimalPartMatches !== null) {
            if (props.decimal) {

                //先把小數點分隔出來
                if (decimalPartMatches[2]) {
                    decimalPart = decimalPartMatches[2];
                }
            }
            withoutDecimal = decimalPartMatches[1];
        }

        let final: string = '';

        //加上千分位
        final += withoutDecimal.replace(/\B(?=(\d{3})+(?!\d))/g, ",")

        if (props.decimal) {
            final += decimalPart ? decimalPart : '.00';
        }
        return final;
    }


    const blurValue = (e: React.FocusEvent<HTMLInputElement>) => {
        let currentValue: string | undefined = e.currentTarget.value;
        // if (currentValue.indexOf('.') <= -1) {
        currentValue = transferToAmountFormat(currentValue, 1);

        // }
        setState(currentValue);
        if (props.onBlur) {
            props.onBlur(e, currentValue);
        }
    }

    const changeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        let currentValue: string | undefined = e.currentTarget.value;
        // var acceptDeciaml = 0;
        // if (props.decimal) {
        //     acceptDeciaml = props.decimalLength;
        // } else {
        currentValue = transferToAmountFormat(currentValue, 1);
        // }

        console.log('currentValue ', currentValue);
        setState(currentValue);
        //若有Change事件，在此時觸發
        if (props.onChange) {
            props.onChange(e);
        }
    }

    useEffect(() => {

        setState(props.value);

        return () => {
        }
    }, [props.value])
    return (
        <>
            <div className="col-5">
                <label className="form-label">{props.label}</label>
            </div>

            <div className='col-9'>
                <input
                    className={`form-input ${props.is_success}`}
                    type='text'
                    value={state}
                    name={props.name}
                    minLength={props.minLength}
                    maxLength={props.maxLength}
                    onBlur={blurValue}
                    onChange={changeValue}
                    placeholder={props.label}
                    readOnly={props.disabled}
                    size={props.size}
                    style={{ textAlign: 'right' }}
                    disabled={props.disabled}
                />
                {
                    (props.is_success) ?
                        <p className='form-input-hint'>{props.warningMsg}</p> : <></>
                }

            </div>
        </>
    );
};

//props 預設值
Amount.defaultProps = {
    componentType: 'amount',
    maxLength: 10,
    name: '',
    minLength: 0,
    disabled: false,
    placeholder: '',
    value: '',
    decimal: false,
    decimalLength: 2,
    size: 10,
}

export default Amount;