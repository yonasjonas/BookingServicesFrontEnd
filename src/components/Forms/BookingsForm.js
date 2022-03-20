import * as actions from "../../actions/businessServices";
import * as providerActions from "../../actions/businessProvidersActions";
import * as serviceActions from "../../actions/businessServices";
import { connect } from "react-redux";
import { styled } from '@mui/material/styles';
import React, { useState, useEffect } from "react";
import { Grid, InputLabel, Select, MenuItem, withStyles, FormControl, Button, TextField, OutlinedInput } from '@material-ui/core';
import useForm from '../useForm';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { useToasts } from "react-toast-notifications";
import { Scheduler } from "@aldabil/react-scheduler";



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

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

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
    const [currentProvider, setCurrentProvider] = useState(props.businessProviders);
    const [serviceId, setServiceId] = useState(null);

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
        if (validate()) {
            const onSuccess = () => {
                addToast("Submitted successfully", { appearance: 'success' });
                resetForm();
            }
            if (props.currentId == 0) {
                props.createBooking(values, onSuccess);
            }
            else {
                props.updateBooking(props.currentId, values, onSuccess);
            }
        }
    }

    useEffect(() => {
        //console.log("props.currentId", props.currentId);
        props.fetchAllProviders();
        props.fetchAllBusinessServices();
        //setCurrentProvider(props.businessProviders);
        if (props.currentId !== 0) {

            let temp = props.providersList.find(x => x.id == props.currentId);
            setValues({
                ...temp
            })
            setErrors({})
        }
    }, [props.currentId])


    const renderProviders = (providerId) => {
        console.log({ providerId })

        //providerId = providerId ? providerId.split(",") : [];

        let currentProv = {};


        currentProv = props.businessProviders.filter(x => providerId.includes(x.id.toString()));


        if (providerId.length > 0) {
            setCurrentProvider(currentProv);
        }

        //setServiceId(serviceId);


    }

    const getProviderNames = (providerId) => {
        const providerIdList = typeof providerId === 'string' ? providerId.split(',') : providerId;
        let lproNames = [];

        providerIdList.map(pId => {
            const providerName = !!props.businessProviders.filter(x => x.id == pId).map(x => x.name)
                ? props.businessProviders.filter(x => x.id == pId).map(x => x.name) : "";
            lproNames.push(providerName);

        });
        return lproNames;
    };

    return (
        <form
            autoComplete="off"
            noValidate
            className={classes.root}
            onSubmit={handleSubmit}
        >
            <Grid container>
                <div className="services-bookform">
                    <Box
                        sx={{
                            minWidth: '1200px',
                            height: 80,
                        }}>
                        <Grid container spacing={2}>
                            <Grid item xs={2} md={2}>

                            </Grid>
                            <Grid item xs={2} md={2}>
                                Service Name
                            </Grid>
                            <Grid item xs={2} md={2}>
                                Price
                            </Grid>
                            <Grid item xs={2} md={2}>
                                Provider unique id
                            </Grid>
                            <Grid item xs={2} md={2}>
                                Service Duration
                            </Grid>
                            <Grid item xs={2} md={2}>
                                <strong>Select Service to Proceed</strong>
                            </Grid>
                        </Grid>
                    </Box>
                    {props.businessServices.length > 0 && props.businessServices.map((service) => (
                        <Box key={service.id} value={service.id}
                            sx={{
                                minWidth: '1200px',
                                border: '1px solid lightgrey',
                                height: 100,
                            }}
                        >
                            <Grid container spacing={2}>
                                <Grid item xs={2} md={2}>
                                    <img height="50px" src="serviceImage.png" />
                                </Grid>
                                <Grid item xs={2} md={2}>
                                    {service.serviceName}
                                </Grid>
                                <Grid item xs={2} md={2}>
                                    {service.price}
                                </Grid>
                                <Grid item xs={2} md={2}>
                                    {getProviderNames(service.providerId)}
                                </Grid>
                                <Grid item xs={2} md={2}>
                                    {service.timeSlotDuration} minutes
                                </Grid>
                                <Grid item xs={2} md={2}>
                                    <Button onClick={() => { renderProviders(service.providerId.split(",")) }} className="bookButton" color="primary" size="large">Select</Button>
                                </Grid>
                            </Grid>
                        </Box>

                    ))}
                </div>
                {currentProvider.length > 1 ?
                    <h6> Please Select a provider: </h6>

                    : <h6> Only one provider available: </h6>
                }

                {currentProvider ? currentProvider.map((providers) => (
                    <div className="services-bookform">

                        <Box
                            sx={{
                                minWidth: '1200px',
                                border: '1px solid lightgrey',
                                height: 100,
                                position: 'relative',
                            }}
                            label="Service Provider"
                            name="provider"
                            value={values.provider}
                            // @ts-ignore Typings are not considering `native`
                            onChange={handleInputChange}

                        >


                            <Grid container key={providers.id} spacing={2}>
                                <Grid item xs={2} md={2}>
                                    <img height="50px" src="serviceImage.png" />
                                </Grid>
                                <Grid item xs={2} md={2}>
                                    <h5>{providers.name}</h5>
                                </Grid>
                                <Grid item xs={4} md={4}>
                                    <strong>{providers.email}</strong>
                                </Grid>
                                <Grid item xs={4} md={4}>
                                    <strong>{providers.phone}</strong>
                                </Grid>
                                <Grid item xs={12} md={12}>

                                    {1 == 0 && <Scheduler
                                        height={200}
                                        view="week"
                                        week={{
                                            weekDays: [0, 1, 2, 3],
                                            weekStartOn: 0,
                                            startHour: 13,
                                            endHour: 23,
                                            step: 60,
                                            cellRenderer: ({ height, start, onClick }) => {
                                                // Fake some condition up
                                                const hour = start.getHours();
                                                const disabled = hour === 11;
                                                return (
                                                    <Button
                                                        style={{
                                                            height: "100%",
                                                            background: disabled ? "#eee" : "transparent"
                                                        }}
                                                        onClick={() => {
                                                            if (true) {
                                                                return console.log(start, height);
                                                            }
                                                            onClick();
                                                        }}
                                                        disableRipple={disabled}
                                                    // disabled={disabled}
                                                    ></Button>
                                                );
                                            }
                                        }}

                                    />}
                                </Grid>

                            </Grid>
                        </Box>
                    </div>

                )) : <h6> No provider available </h6>
                }

                {
                    0 == 1 ? <><TextField
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
                        /></> : <></>}



            </Grid>
            <Button
                className={classes.smMargin}
                variant="contained"
                color="secondary"
                type="submit"
            >
                Reserve a Service
            </Button>
        </form >
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