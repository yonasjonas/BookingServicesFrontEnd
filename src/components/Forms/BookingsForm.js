import * as actions from "../../actions/businessServices";
import * as providerActions from "../../actions/businessProvidersActions";
import * as serviceActions from "../../actions/businessServices";
import { connect } from "react-redux";
import React, { useState, useEffect } from "react";
import { Grid, InputLabel, Select, MenuItem, withStyles, FormControl, Button, TextField, OutlinedInput } from '@material-ui/core';
import useForm from '../useForm';
import { useToasts } from "react-toast-notifications";
import BusinessBookings from "../../Pages/Member/BusinessBookings";


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
    name: "",
    email: "",
    phone: "",
    provider: "",
    service: "",
    timeDate: "",
}



const BookingsForm = ({ classes, ...props }) => {

    const { addToast } = useToasts();
    const [businessId, setBusinessId ] = useState(0);

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ("serviceName" in fieldValues)
            temp.name = fieldValues.name.length > 0 ? "" : "Service Name is required"
        if ("price" in fieldValues)
            temp.email = fieldValues.email.toString().length > 0 ? "" : "Price is required"
        if ("timeSlotDuration" in fieldValues)
            temp.phone = fieldValues.phone.toString().length > 0 ? "" : "Time Slot Duration is required"
        if ("weekvalue" in fieldValues)
            temp.weekvalue = fieldValues.weekvalue.length > 0 ? "" : "Week is required"
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
                props.createProvider(values, onSuccess);
            }
            else {
                props.updateProvider(props.currentId, values, onSuccess);
            }

        }

    }

    useEffect(() => {
        //console.log("props.currentId", props.currentId);
        props.fetchAllProviders();
        props.fetchAllBusinessServices();
        if (props.currentId !== 0) {
            let temp = props.providersList.find(x => x.id == props.currentId);

            setValues({
                ...temp
            })
            setErrors({})
        }
        console.log("props", props);
    }, [props.currentId])

    let businessIds = [];

    return (
        <form
            autoComplete="off"
            noValidate
            className={classes.root}
            onSubmit={handleSubmit}
        >
            <Grid container>
                <TextField
                    name="name"
                    variant="outlined"
                    label="Full Name"
                    value={values.name}
                    onChange={handleInputChange}
                />
                <TextField
                    name="email"
                    variant="outlined"
                    label="Email"
                    value={values.name}
                    onChange={handleInputChange}
                />
                <TextField
                    name="phone"
                    variant="outlined"
                    label="Phone Number"
                    value={values.name}
                    onChange={handleInputChange}
                />
                <Select
                    
                    native
                    variant="outlined"
                    label="Services"
                    name="service"
                    value={values.service}
                    // @ts-ignore Typings are not considering `native`
                    onChange={handleInputChange}
                    inputProps={{
                        id: 'select-multiple-native',
                    }}
                    
                >
                    
                    {props.businessServices && props.businessServices.map((service) => (
                        
                        <option key={service.id} value={service.id}>
                            {service.serviceName}
                            {businessIds.push(service.businessId)}
                            {console.log("providersIds", businessIds)}
                        </option>
                    ))}
                </Select>
                <Select
                    
                    native
                    variant="outlined"
                    label="Service Provider"
                    name="provider"
                    value={values.provider}
                    // @ts-ignore Typings are not considering `native`
                    onChange={handleInputChange}
                    inputProps={{
                        id: 'select-multiple-native',
                    }}
                    {...(errors.weekvalue && { error: true, helperText: errors.weekvalue })}
                >
                    {props.businessProviders.map((provider) => (
                        <option key={provider.id} value={provider.id}>
                            {provider.name}
                        </option>
                    ))}
                </Select>



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
    businessServices: state.businessService.list,
    businessProviders: state.businessProvider.list,
    businessBookings: state.businessBooking.list
});


const mapActionsToProps = {    
    fetchAllProviders: providerActions.fetchAll,
    fetchAllBusinessServices: serviceActions.fetchAll,
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(BookingsForm));