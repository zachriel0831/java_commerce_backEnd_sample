import React, { useRef } from 'react';
import Props from '../interfaces/SelectPropsInterface';
import utils from '../utils/utils';
import _ from 'lodash';

const Select: React.FC<Props> = (props) => {
    let options = [];
    options.push(<option key={utils.generateUID()} value=''>選擇種類</option>);

    let items: Array<any> = [];
    _.each(props.options, (v, k) => {
        let item: any = {
            "label": '',
            "value": '',
            "groupKey": "",
            "disabled": false
        };
        item.label = v.label;
        item.value = v.value;

        items.push(item);
    })

    let optionList = {
        "selected": "",
        "disabled": false,
        "items": [...items]
    };

    _.each(optionList.items, (v: any, k) => {
        

        if (props.value === v.value) {
            options.push(<option key={utils.generateUID()} value={v.value} selected>{v.label}</option>)

        } else {
            options.push(<option key={utils.generateUID()} value={v.value}>{v.label}</option>)
        }
    });

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {

        props.onChange(e);
    }

    return <>
        <div className="col-5">
            <label className="form-label">{props.label}</label>
        </div>
        <div className='col-9'>
            <select
                className='form-select select-lg'
                defaultValue={props.value}
                name={props.name}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleChange(e)}>{options}
            </select>
        </div>
    </>
}


export default Select;