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
    const [currentProvider, setCurrentProvider] = useState(null);

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

        const currentProv = props.businessProviders.filter(x => x.id == providerId);
        setCurrentProvider(currentProv);

        console.log({ currentProvider });
    }

    return (
        <form
            autoComplete="off"
            noValidate
            className={classes.root}
            onSubmit={handleSubmit}
        >
            <Grid container>


                <div className="services-bookform">
                    {props.businessServices && props.businessServices.map((service) => (
                        <Box key={service.id} value={service.id}
                            sx={{
                                minWidth: '1200px',
                                border: '1px solid lightgrey',
                                height: 100,
                            }}
                        >
                            <Grid container spacing={2}>
                                <Grid item xs={4} md={4}>
                                    {service.serviceName}
                                </Grid>
                                <Grid item xs={2} md={2}>
                                    {service.price}
                                </Grid>
                                <Grid item xs={2} md={2}>
                                    {service.timeSlotDuration}
                                    {service.providerId}
                                </Grid>
                                <Grid item xs={4} md={4}>
                                    <Button onClick={() => { renderProviders(service.providerId) }} className="bookButton" color="secondary" >Select</Button>
                                </Grid>
                            </Grid>
                        </Box>

                    ))}
                </div>
                <Box
                    className="providers-bookform"
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

                    {currentProvider < -99 ?
                        <Grid container spacing={2}>
                            <Grid item xs={6} md={3}>
                                {currentProvider[0].name}
                            </Grid>
                            <Grid item xs={6} md={3}>
                                {currentProvider[0].email}
                            </Grid>
                            <Grid item xs={6} md={3}>
                                {currentProvider[0].phone}
                            </Grid>
                            <Grid item xs={6} md={3}>
                                {currentProvider[0].phone}
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <Scheduler
                                    height={200}
                                    view="month"
                                    events={[
                                        {
                                            event_id: 1,
                                            title: "Event 1",
                                            start: new Date("2021 5 2 09:30"),
                                            end: new Date("2022 5 2 10:30"),
                                        },
                                        {
                                            event_id: 2,
                                            title: "Event 2",
                                            start: new Date("2022 1 4 10:00"),
                                            end: new Date("2022 9 4 11:00"),
                                        },
                                    ]}
                                />
                            </Grid>

                        </Grid>

                        :

                        props.businessProviders.map((providers) => (

                            <Grid container key={providers.id} spacing={2}>
                                <Grid item xs={4} md={4}>
                                    {providers.name}
                                </Grid>
                                <Grid item xs={4} md={4}>
                                    {providers.email}
                                </Grid>
                                <Grid item xs={4} md={4}>
                                    {providers.phone}
                                </Grid>
                                <Grid item xs={12} md={12}>
                                    {console.log("providers", JSON.parse(providers.weekvalue))}
                                    <Scheduler
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

                                    />
                                </Grid>

                            </Grid>

                        ))
                    }
                </Box>
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



            </Grid>
            <Button
                className={classes.smMargin}
                variant="contained"
                color="secondary"
                type="submit"
            >
                Reserve a Service
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