import React, { useState, useEffect } from 'react';

const useForm = (initialFieldValues, validate, setCurrentId, setDays) => {
	const [values, setValues] = useState(initialFieldValues);
	const [errors, setErrors] = useState({});


	const handleChangeMultiple = (event) => {

		const { options } = event.target;
		const thevalue = [];
		for (let i = 0, l = options.length; i < l; i += 1) {
			if (options[i].selected) {
				thevalue.push(options[i].value);
			}
		}
		//validate(thevalue);
		//initialFieldValues.providers = thevalue;
		

		setValues({
			...values,
			"providerId": thevalue,
		})
		
		//setWeekvalue(thevalue);
		//eekDays.value = weekvalue;
	};

	const handleInputChange = (event) => {
		const providerId = values.providerId;
		const { name, value } = event.target;


		let fieldValue = { [name]: value }



		//console.log("handleInputChange2 : ", values);
		setValues({
			...values,
			...fieldValue,
			[name]: value,
		})
		validate(fieldValue);
	}

	const resetForm = () => {
		setValues({
			...initialFieldValues
		})
		//setErrors({})
		setCurrentId(0);
		if (!!initialFieldValues.weekvalue) {
			setDays([]);
			values.weekvalue = {};
		}
		setValues({
			"providerId": [],
		})


	}

	return {
		values,
		setValues,
		errors,
		setErrors,
		handleInputChange,
		handleChangeMultiple,
		resetForm
	};
};

export default useForm;