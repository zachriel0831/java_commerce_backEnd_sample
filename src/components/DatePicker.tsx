import React from 'react'
import Datepicker, { registerLocale } from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import _ from 'lodash';
import moment from 'moment';

import { zhTW } from 'date-fns/locale';
registerLocale("zhTW", zhTW);
type DatePickerType = {
    onChange?: (val: Date) => void,
    labelStyle?: {
        width: string,
    },
    label: string,
    selected: Date | null,
    is_success?: string,
    warningMsg?: string,

};

const DatePicker: React.FC<DatePickerType> = (props) => {

    const changeValue = (val: Date) => {
        let currentValue = moment(val).format('YYYY/MM/DD');

        if (_.isFunction(props.onChange)) {
            props.onChange(val);
        }
    }

    return (
        <>
            <div className="col-5">
                <label className="form-label">{props.label}</label>
            </div>

            <div className='col-9'>
                <Datepicker
                    name='datepicker'
                    locale="zhTW"
                    selected={props.selected}
                    dateFormat='yyyy/MM/dd'
                    onChange={changeValue} 
                    popperPlacement="bottom-start"
                    />
                {
                    (props.is_success) ?
                        <p className='form-input-hint'>{props.warningMsg}</p> : <></>
                }
            </div>
        </>
    )
}
//props 預設值
DatePicker.defaultProps = {
    label: '',
    selected: null,
}

export default DatePicker;