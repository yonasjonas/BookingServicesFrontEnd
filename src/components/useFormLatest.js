import React, { useState, useEffect } from 'react';

const useForm = (initialFieldValues, validate, setCurrentId) => {
  const [values, setValues] = useState(initialFieldValues);
  const [errors, setErrors] = useState({});

  const handleInputChange = event => {
    const { name, value } = event.target;
    const fieldValue = { [name]: value } 
    
    setValues({
      ...values,
      ...fieldValue,
      [name]: value,
    })
    
    validate(fieldValue);

    const { options } = event.target;
        const dayvalues = "";
        for (let i = 0, l = options.length; i < l; i += 1) {
            if (options[i].selected) {

                value += options[i].value + ",";                
            }
        }        
    initialFieldValues.weekvalue = dayvalues;

    

    
  };

  /* const handleChangeMultiple = (event) => {
    const { options } = event.target;
    const value = [];
    for (let i = 0, l = options.length; i < l; i += 1) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    setPersonName(value);
    initialFieldValues.weekvalue = value;
    console.log(initialFieldValues);
  }; */

  const resetForm = () => {
    setValues({
      ...initialFieldValues
    })
    setErrors({})
    setCurrentId(0);
  }

  /* const handleSubmit = (event) => {
    event.preventDefault();
    console.log(values);
  }; */

  return {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
    //handleChangeMultiple,
    resetForm
  };
};

export default useForm;