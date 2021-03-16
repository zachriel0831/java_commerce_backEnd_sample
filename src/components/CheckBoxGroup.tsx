import React, { useRef, useState, useEffect } from 'react';
import _ from 'lodash';

type CheckBoxWLabel = {
    checkBoxRef?: React.RefObject<HTMLInputElement>,
    id: string,
    name: string,
    value: string,
    label: string,
    checked: boolean,
    onClick: (value: string) => void,
    disabled: boolean
}
type checkboxItem = {
    "items": {
        "label": string;
        "value": string;
        "groupKey": string;
        "disabled": boolean;
        "checked": boolean,
    }[];
}

type CheckBoxGroupType = {
    checkBoxRef?: React.RefObject<HTMLInputElement>,
    id?: string,
    name: string,
    value?: string,
    label?: string,
    checked?: boolean,
    onClick: (value: string) => void,
    disabled?: boolean,
    checkBoxData: Array<string>
}

const CheckBoxWLabel: React.FC<CheckBoxWLabel> = React.memo((props) => {
    const [state, setState] = useState(props.checked ? true : false);

    const clickValue = () => {
        let checkBoxGroupRef = props.checkBoxRef;
        let checkBoxValue: Array<string> = [];
        if (checkBoxGroupRef) {

            let refCurrent = checkBoxGroupRef.current as HTMLInputElement;
            let groupChildren = refCurrent.children;

            _.each(groupChildren, (v: any, k) => {
                let checked = v.firstChild.checked;
                let val = v.firstChild.value;
                if (checked) {
                    checkBoxValue.push(val);
                }
            })
        }

        setState(!state);

        if (_.isFunction(props.onClick)) {
            props.onClick(checkBoxValue);
        }
    }
    return (
        <label className={`form-checkbox ${props.disabled ? 'disabled' : ''}`}>
            <input type="checkbox"
                id={props.id}
                checked={state}
                disabled={props.disabled}
                name={props.name}
                value={props.value}
                onClick={clickValue} />
            <i className="form-icon"></i>
            {props.label}
        </label>

    )
});

const CheckBoxGroup: React.FC<CheckBoxGroupType> = React.memo((props) => {
    let checkBoxContents: Array<any> = [];
    const checkBoxRef = useRef<any>();
    const clickValue = (checkboxValue: string) => {
        if (_.isFunction(props.onClick)) {
            props.onClick(checkboxValue);
        }
    }

    let checkBoxItem: checkboxItem = { "items": [] };
    let defaultChecked: Array<any> = [];
    _.each(props.checkBoxData, (v, k) => {
        let checkFlag = defaultChecked.includes(v);

        let item: any = {
            "label": "",
            "value": "",
            "groupKey": "_none",
            "checked": checkFlag,
            "disabled": false
        }
        item.label = v;
        item.value = v;
        checkBoxItem.items.push(item);
    });


    if (checkBoxItem.items) {
        _.each(checkBoxItem.items, (v, k) => {

            checkBoxContents.push(
                <CheckBoxWLabel
                    checkBoxRef={checkBoxRef}
                    id={`${props.name}_${v.value}`}
                    name={props.name}
                    value={v.value}
                    label={v.label}
                    checked={v.checked}
                    onClick={clickValue}
                    disabled={v.disabled}
                />
            )
        })
    }

    return (
        <div ref={checkBoxRef} className="form-group">
            {checkBoxContents}
        </div>
    );
});

//props 預設值
CheckBoxGroup.defaultProps = {
    name: '',
    disabled: false,
    label: '',
    value: '',
    checkBoxData: [],
}

export default CheckBoxGroup;