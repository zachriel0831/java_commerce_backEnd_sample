import React, { useEffect, useRef } from 'react';
import _ from 'lodash';

type RadioBtn = {
    checked: boolean,
    onClick: (value: string) => void,
    disabled: boolean,
    value: string,
    name: string,
    ref?: React.RefObject<HTMLInputElement>
    label: string
}

type ItemType = {
    items: Array<RadioBtn>,
}

type RadioGroupType = {
    name: string,
    onClick: (val: any) => void,
    // radioData: {
    //     "items": {
    //         "label": string;
    //         "value": string;
    //         "groupKey": string;
    //         "disabled": boolean;
    //     }[];
    //     "selectedValue": string;
    // }
    radioData: Array<string>,
    value?: string,
    label?: string,
    disabled?: boolean,
    checked?: boolean,
    selectedValue?: string,

}


const RadioBtn: React.FC<RadioBtn> = React.memo((props) => {
    // const [state, setState] = useState(props.checked);
    let radioRef = useRef<any>();

    const clickValue = (e: React.FormEvent<HTMLInputElement>) => {

        const target = e.target as HTMLInputElement;

        let currentValue: string = target.value;

        if (_.isFunction(props.onClick)) {
            // setState(!state);
            props.onClick(currentValue);
        }
    }

    useEffect(() => {
        if (props.checked) {
            // $(`#${props.value}`).click();
            let clickThisRef = radioRef.current as HTMLInputElement;

            //i'm certain clickThisRef won't be undefined
            clickThisRef!.checked = true;
        }
    }, [])

    return (
        <label className={` form-radio ${props.disabled ? 'disabled' : ''}`}>
            <input type="radio"
                disabled={props.disabled}
                ref={radioRef}
                id={props.value}
                name={props.name}
                value={props.value}
                onClick={clickValue} />
            <i className="form-icon"></i>{props.label}
        </label>

    )
})

const RadioGroup: React.FC<RadioGroupType> = React.memo((props) => {
    const clickValue = (currentValue: string) => {
        if (_.isFunction(props.onClick)) {
            props.onClick(currentValue);
        }
    }

    let orgTypeRadioItem: Array<any> = [];
    _.each(props.radioData, (v, k) => {
        let item: any = {
            "label": '',
            "value": '',
            "groupKey": "",
            "disabled": false
        };
        item.label = v;
        item.value = v;
        orgTypeRadioItem.push(item);
    })
    const orgTypeRadioGroupItem = {
        "items": [...orgTypeRadioItem],
        "selectedValue": props.selectedValue
    }

    let radioContents: Array<any> = [];

    if (orgTypeRadioGroupItem.items) {
        _.each(orgTypeRadioGroupItem.items, (v: any, k: any) => {
            let checked = orgTypeRadioGroupItem.selectedValue === v.value ? true : false;
            radioContents.push(
                <RadioBtn
                    key={k + '_radio'}
                    value={v.value}
                    label={v.label}
                    name={props.name}
                    checked={checked}
                    onClick={clickValue}
                    disabled={v.disabled}
                />
            )
        })
    }

    return (
        <>
            <div className="col-5">
                <label className="form-label">{props.label}</label>
            </div>
            <div className='col-9'>
                {radioContents}
            </div>
        </>

    );
});

//props 預設值
RadioGroup.defaultProps = {
    name: '',
    checked: false,
    disabled: false,
    label: '',
    value: '',
    selectedValue: ''
}

export default RadioGroup;