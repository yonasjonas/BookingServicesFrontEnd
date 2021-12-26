import React, { useState, useEffect } from 'react';

const useForm = (initialFieldValues, validate, setCurrentId) => {
  const [values, setValues] = useState(initialFieldValues);
  const [errors, setErrors] = useState({});

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    const fieldValue = { [name]: value }  

    setValues({
      ...values,
      ...fieldValue,
      [name]: value,
    })
    validate(fieldValue);
  };

  

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
    resetForm
  };
};

export default useForm;