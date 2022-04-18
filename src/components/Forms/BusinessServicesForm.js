import * as actions from "../../actions/businessServices";
import * as provideractions from "../../actions/businessProvidersActions";
import { connect } from "react-redux";
import React, { useState, useEffect } from "react";
import { Grid, InputLabel, Select, MenuItem, withStyles, FormControl, Button, TextField, OutlinedInput } from '@material-ui/core';
import useForm from '../useForm';
import { useToasts } from "react-toast-notifications";
import FileUpload from "../FormElements/FileUpload";



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


const initialFieldValues = {
    serviceName: "",
    price: "",
    timeSlotDuration: "",
    providerId: [],
    businessId: "",
}



const BusinessServicesForm = ({ classes, state, ...props }) => {

    const { addToast } = useToasts();
    const [editing, setEditing] = useState(false);

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

    const user = JSON.parse(localStorage.getItem('user'));

    const handleSubmit = e => {
        e.preventDefault();
        //console.log("works", state);
        values.providerId  = values.providerId && typeof values.providerId !== 'string' ? values.providerId.join(',') : values.providerId;
        setValues({
            "providerId": values.providerId,
        })
        values.businessId = user.id;
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

    const showForm = () => {
        setEditing(true)
    }
    const hideForm = () => {
        setEditing(false)
        resetForm();
        props.currentId = 0;
        console.log(props.currentId)
    }

    useEffect(() => {
        props.fetchAllProviders(props.user.id);
        if (props.currentId !== 0 && props.currentId !== "") {
            setEditing(true)
            let temp = props.businessServicesList.find(x => x.id == props.currentId);

            setValues({
                ...temp
            })
            /* values.providerId = temp.providerId ? temp.providerId.split(',') : [];
            setValues({
                "providerId": values.providerId,
            }) */
            setErrors({})

        }

    }, [props.currentId])

    return (
        <>
            {console.log({ editing })}
            {editing ?

                <form
                    autoComplete="off"
                    noValidate
                    className={classes.root}
                    onSubmit={handleSubmit}
                >
                    <Grid container>
                        {props.currentId !== 0 ? <>
                            <strong>Upload image</strong><br />
                            <FileUpload class="serviceImage" type="serviceImage" providerId={props.currentId} /></> : "Save Service to upload image"}
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
                        <FormControl variant="outlined" className={classes.formControl}>


                            <Select
                                multiple
                                native
                                variant="outlined"
                                label="Days of service"
                                name="providerId"
                                value={typeof values.providerId === 'string' ? values.providerId.split(',') : values.providerId}
                                // @ts-ignore Typings are not considering `native`
                                onChange={handleChangeMultiple}
                                inputProps={{
                                    id: 'select-multiple-native',
                                }}
                            >
                                {props.businessProviders.map((provider) => (
                                    <option key={provider.id} value={provider.id}>
                                        {provider.name}
                                    </option>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Button
                        className={classes.smMargin + " buttonBlue"}
                        variant="outlined"
                        type="submit"
                        color="primary" 
                    >
                        Submit
                    </Button>
                    <Button
                        variant="outlined"
                        className={classes.smMargin + " buttonBlue"}
                        onClick={resetForm}
                    >
                        Reset
                    </Button>
                    <Button variant="outlined" className={classes.smMargin + " buttonBlue"} onClick={hideForm}>Hide Form</Button>
                </form> :

                <Button variant="outlined" color="primary" className={classes.smMargin + " fullWidth buttonBlue"} onClick={showForm}>Add new Service</Button>

            }
        </>
    )
}

const mapStateToProps = state => ({
    businessServicesList: state.businessService.list,
    businessProviders: state.businessProvider.list,
    businessInformation: state.businessInformation,
    user: state.authentication.user
});

const mapActionsToProps = {
    createBusinessService: actions.create,
    updateBusinessService: actions.update,
    deleteBusinessService: actions.deleteData,
    fetchAllProviders: provideractions.fetchAll
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(BusinessServicesForm));