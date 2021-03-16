import React, { useEffect } from 'react';
import areaJson from '../configs/districts';
import Select from '../components/Select';
import _ from 'lodash';
const TWZipCode: React.FC<any> = (props) => {
    let cities: Array<any> = [];
    _.each(areaJson, (v, k) => {
        let item: any = {
            "label": '',
            "value": '',
            "groupKey": "",
            "disabled": false
        };

        item.label = v.name;
        item.value = v.name;
        cities.push(item);
    });
    const options = {
        "selected": "",
        "disabled": false,
        "items": [...cities]
    };

    const selectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        props.onCityChange(e);
    }
    const districtChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        props.onDistrictChange(e);
    }
    let districtsArray: Array<any> = [];
    let areaCodeArray: Array<any> = [];
    
    if (props.citiValue) {
        let districtsFilter = areaJson.filter((item) => {
            return item.name === props.citiValue;
        })
        _.each(districtsFilter[0].districts, (v, k) => {
            let item: any = {
                "label": '',
                "value": '',
                "groupKey": "",
                "disabled": false
            };
            let areaMap: any = {};
            item.label = v.name;
            item.value = v.name;

            areaMap.key = v.name;
            areaMap.value = v.zip;

            districtsArray.push(item);
            areaCodeArray.push(areaMap);
        })
    }

    let districtOptions = {
        "selected": "",
        "disabled": false,
        "items": [...districtsArray]
    };

    let areaCode: string = '';

    if (props.districtValue) {
        let areaCodeFilter = areaCodeArray.filter((item) => {
            return item.key === props.districtValue;
        });

        areaCode = areaCodeFilter ? areaCodeFilter[0].value : '';
        props.handleZipCodeChange(areaCode);
    }

    return <>
        <Select
            label='選擇城市'
            value={props.citiValue}
            name='cities'
            options={options}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => selectChange(e)} />

        <Select
            label='選擇區域'
            value={props.districtValue}
            name='district'
            options={districtOptions}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => districtChange(e)} />
        <input name='areaCode' value={areaCode} disabled />
    </>
}


TWZipCode.defaultProps = {

}

export default TWZipCode;
