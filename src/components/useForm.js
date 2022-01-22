import React, { useState, useEffect } from 'react';

const useForm = (initialFieldValues, validate, setCurrentId) => {
	const [values, setValues] = useState({});
	const [errors, setErrors] = useState({});	
	const [weekvalue, setWeekvalue] = useState();

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
		values.weekvalue = thevalue;
		setWeekvalue(thevalue);
		//eekDays.value = weekvalue;
		//console.log("thevalue", weekvalue);
	};

	const handleInputChange = (event) => {
		const { name, value } = event.target;
		const fieldValue = { [name]: value }

		const { options } = event.target;

		//console.log("event.target", event.target)

		/* if (event.target.name == "weekvalue") {
			const thevalue = [];
			for (let i = 0, l = options.length; i < l; i += 1) {
				if (options[i].selected) {
					thevalue.push(options[i].value);
				}
			}
			initialFieldValues.weekvalue = thevalue;
			setWeekvalue(thevalue);
		}
		else { */
			setValues({
				...values,
				...fieldValue,
				[name]: value,
			})
			validate(fieldValue);
		/* }	 */	
	};

	const resetForm = () => {
		//initialFieldValues.weekvalue = []
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
		weekvalue,
		errors,
		setErrors,
		handleInputChange,
		handleChangeMultiple,
		resetForm
	};
};

export default useForm;