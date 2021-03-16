import React from 'react';
import Props from '../interfaces/TextPropsInterface';

const Text: React.FunctionComponent<Props> = (props) => {


  const textChanges = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.onChange(e);
  }

  const onkeypress = (e: React.KeyboardEvent<HTMLInputElement>) => {

    let charCode = e.charCode;
    if (charCode === 13) {
      if (props.onkeypress) {
        props.onkeypress(e);
      }
    }
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
        onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => onkeypress(e)}
      />
      {
        (props.is_success) ?
          <p className='form-input-hint'>{props.warningMsg}</p> : <></>
      }
    </div></>
};

Text.defaultProps = {
  style: {},
  readOnly: false,
  value: ''
};


export default Text;
