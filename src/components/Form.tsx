import React, { useRef } from 'react';
import FormProps from '../interfaces/FormPropsInterface';


const Form: React.FunctionComponent<FormProps> = (props) => {

    const formRef = useRef<HTMLFormElement | null>(null);;
    const formSubmit = (e: any) => {
        props.onSubmit(e, formRef)
    }

    const formReset = (e: any) => {
        props.onReset(e, formRef)
    }
    const formKeyPress = (e: React.KeyboardEvent<HTMLFormElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            return;
        }

        props.formKeyPress(e);
    }
    return <div className='column col-12 col-sm-12'>
        <form
            className="form-horizontal"
            ref={formRef}
            onKeyPress={formKeyPress}
            onSubmit={formSubmit}
            onReset={formReset}>{props.children}</form>
    </div>

}

export default Form;