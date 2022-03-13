import React, { useState, useEffect } from 'react';

const useForm = (initialFieldValues, validate, setCurrentId, workingDays) => {
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
		//initialFieldValues.weekvalue = thevalue;
		//values.weekvalue = thevalue;
		//setWeekvalue(thevalue);
		//eekDays.value = weekvalue;
	};

	const handleInputChange = (event) => {
		const { name, value } = event.target;
		const fieldValue = { [name]: value }

		console.log("handleInputChange2 : ", values);	
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