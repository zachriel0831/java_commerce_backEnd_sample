import { useState } from 'react';
import _ from 'lodash';
import CryptoJS from 'crypto-js';

const useForm = (resetCallback: any, callback: any, initialState: any) => {
    const [values, setValues] = useState<any>(initialState);

    const handleSubmit = (event: React.FormEvent<HTMLInputElement>, formRef: any) => {
        if (event) event.preventDefault();
        if (!formRef) formRef = {};

        callback(event, formRef);
    };

    const handleChange = (event: React.FormEvent<HTMLInputElement>) => {

        const target = event.target as HTMLInputElement;

        //讓值可以非同步的存取
        event.persist();
        //password直接加密
        if (target.type === 'password') {
            let encryptThisValue = CryptoJS.HmacMD5(target.value, target.value).toString();
            console.log(encryptThisValue)
            setValues((values: any) => ({ ...values, [target.name]: encryptThisValue }));

        } else {
            console.log(target.value);
            setValues((values: any) => ({ ...values, [target.name]: target.value }));
        }
    };

    const handleSelectChange = (event: React.FormEvent<HTMLSelectElement>) => {
        const target = event.target as HTMLSelectElement;
        event.persist();

        setValues((values: any) => ({ ...values, [target.name]: target.value }));
    };

    const handleReset = (event: React.FormEvent<HTMLInputElement>, formRef: any) => {
        event.persist();
        let formElements = formRef.current.elements;

        _.each(formElements, (v, k) => {
            let tagName = v.tagName;
            if (tagName === 'INPUT' || tagName === 'SELECT') {
                setValues((values: any) => ({ ...values, [v.name]: '' }));
            }
        });

        resetCallback();
    }

    const formKeyPress = (event: React.KeyboardEvent<HTMLFormElement>) => {

        if (event.key === 'Enter') {
            event.preventDefault();
            return;
        }
    }

    return {
        handleReset,
        handleChange,
        handleSelectChange,
        handleSubmit,
        values,
        formKeyPress
    }
};

export default useForm;