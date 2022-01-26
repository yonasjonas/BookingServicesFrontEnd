import * as actions from "../actions/businessServices";
//import * as provideractions from "../actions/businessProviders";
import { connect } from "react-redux";
import React, { useState, useEffect } from "react";
import { Grid, InputLabel, Select, MenuItem, withStyles, FormControl, Button, TextField, OutlinedInput } from '@material-ui/core';
import useForm from './useForm';
import { useToasts } from "react-toast-notifications";


const styles = theme => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            minWidth: '400px'
        }
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: '400px',
        minHeigth: '400px'

    },

    selectEmpty: {
        marginTop: theme.spacing(1),
        minWidth: '400px'
    },
    smMargin: {
        margin: theme.spacing(1),
    }

});

const allWeekdays = [
    'John',
    'Jack',
    'Jane',
    'Julia',
    'Jackson',
    'Jessica',
    'Jennifer',
];

const initialFieldValues = {
    serviceName: "",
    price: "",
    timeSlotDuration: "",
    providers: [],
}



const BusinessServicesForm = ({ classes, ...props }) => {

    const { addToast } = useToasts();

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ("serviceName" in fieldValues)
            temp.serviceName = fieldValues.serviceName.length > 0 ? "" : "Service Name is required"
        if ("price" in fieldValues)
            temp.price = fieldValues.price.toString().length > 0 ? "" : "Price is required"
        if ("timeSlotDuration" in fieldValues)
            temp.timeSlotDuration = fieldValues.timeSlotDuration.toString().length > 0 ? "" : "Time Slot Duration is required"
        if ("providers" in fieldValues)
            temp.weekvalue = fieldValues.providers.length > 0 ? "" : "Week is required"
        setErrors({
            ...temp
        });
        if (fieldValues == values)
            return Object.values(temp).every(x => x == "");
    }
    const {
        values,
        setValues,
        errors,
        weekvalue,
        setErrors,
        handleInputChange,
        handleChangeMultiple,
        resetForm
    } = useForm(initialFieldValues, validate, props.setCurrentId)


    const handleSubmit = e => {
        e.preventDefault();
        //console.log("works", values);
        if (validate()) {
            const onSuccess = () => {
                addToast("Submitted successfully", { appearance: 'success' });
                resetForm();
            }

            if (props.currentId == 0) {
                props.createBusinessService(values, onSuccess);
            }
            else {
                props.updateBusinessService(props.currentId, values, onSuccess);
            }
        }
    }

    useEffect(() => {
        
        if (props.currentId !== 0) {
            let temp = props.businessServicesList.find(x => x.id == props.currentId);           
            
            setValues({
                ...temp
            })
            setErrors({})
        }
    }, [props.currentId])

    return (
        <form
            autoComplete="off"
            noValidate
            className={classes.root}
            onSubmit={handleSubmit}
        >
            <Grid container>
                <TextField
                    name="serviceName"
                    variant="outlined"
                    label="Service Name"
                    value={values.serviceName}
                    onChange={handleInputChange}
                    {...(errors.serviceName && { error: true, helperText: errors.serviceName })}
                />
                <TextField
                    name="price"
                    variant="outlined"
                    label="Price"
                    value={values.price}
                    onChange={handleInputChange}
                    {...(errors.price && { error: true, helperText: errors.price })}
                />
                <TextField
                    name="timeSlotDuration"
                    variant="outlined"
                    label="Time Slot Duration"
                    value={values.timeSlotDuration}
                    onChange={handleInputChange}
                    {...(errors.timeSlotDuration && { error: true, helperText: errors.timeSlotDuration })}
                />
                {/* <FormControl variant="outlined" className={classes.formControl}>
                    <InputLabel id="demo-multiple-checkbox-label">Tag</InputLabel>
                    <Select
                        name="weekvalue"
                        variant="outlined"
                        value={values.weekvalue}
                        className={classes.formControl}
                        onChange={handleInputChange}
                        defaultValue="Please Select"
                        {...(errors.weekvalue && { error: true, helperText: errors.weekvalue })}
                    >
                        <MenuItem value={allWeekdays[0]}>{allWeekdays[0]}</MenuItem>
                        <MenuItem value={allWeekdays[1]}>{allWeekdays[1]}</MenuItem>
                        <MenuItem value={allWeekdays[2]}>{allWeekdays[2]}</MenuItem>
                        <MenuItem value={allWeekdays[3]}>{allWeekdays[3]}</MenuItem>
                        <MenuItem value={allWeekdays[4]}>{allWeekdays[4]}</MenuItem>
                        <MenuItem value={allWeekdays[5]}>{allWeekdays[5]}</MenuItem>
                        <MenuItem value={allWeekdays[6]}>{allWeekdays[6]}</MenuItem>
                    </Select>
                </FormControl> */}
                <FormControl variant="outlined" className={classes.formControl}>

                    <Select
                        multiple
                        native
                        variant="outlined"
                        label="Days of service"
                        name="weekvalue"
                        value={values.weekvalue}
                        // @ts-ignore Typings are not considering `native`
                        onChange={handleInputChange}
                        label="Native"
                        inputProps={{
                            id: 'select-multiple-native',
                        }}
                        {...(errors.weekvalue && { error: true, helperText: errors.weekvalue })}
                    >
                        {allWeekdays.map((name) => (
                            <option key={name} value={name}>
                                {name}
                            </option>
                        ))}
                    </Select>
                </FormControl>
            </Grid>
            <Button
                className={classes.smMargin}
                variant="contained"
                color="primary"
                type="submit"
            >
                Submit
            </Button>
            <Button
                variant="contained"
                color="primary"
                type="submit"
                className={classes.smMargin}
                onClick={resetForm}
            >
                Reset
            </Button>
        </form>
    )
}

const mapStateToProps = state => ({
    businessServicesList: state.businessService.list,
    //providersList: state.businessProviders.list,
});

const mapActionsToProps = {
    createBusinessService: actions.create,
    updateBusinessService: actions.update,
    deleteBusinessService: actions.deleteData,
    //fetchAllProviders: provideractions.fetchAll
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(BusinessServicesForm));