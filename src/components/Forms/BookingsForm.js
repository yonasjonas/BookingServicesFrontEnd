import * as bookingActions from "../../actions/businessBookings";
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

const weekdays = [
    {
        value: 0,
        label: 'Monday',
    },
    {
        value: 1,
        label: 'Tuesday',
    },
    {
        value: 2,
        label: 'Wednesday',
    },
    {
        value: 3,
        label: 'Thursday',
    },
    {
        value: 4,
        label: 'Friday',
    },
    {
        value: 5,
        label: 'Saturday',
    },
    {
        value: 6,
        label: 'Sunday',
    }
]

let initialFieldValues = {
    name: "",
    email: "",
    phone: "",
    providerId: "",
    providerName: "",    
    serviceId: "",    
    serviceName: "",
    bookingStartTime: "",
    bookingDuration: 0,
    accepted: null,
}

const BookingsForm = ({ classes, ...props }) => {

    const { addToast } = useToasts();
    const [currentProviders, setCurrentProviders] = useState(props.businessProviders);
    const [currentProvider, setCurrentProvider] = useState(null);
    const [currentService, setCurrentService] = useState(null);
    const [providerTimes, setProviderTimes] = useState(null);
    const [providerWeekDays, setProviderWeekDays] = useState(null);
    const [calendarDays, setCalendarDays] = useState([]);
    const [selectedBookingTime, setSelectedBookingTime] = useState(new Date());
    const [calendarHours, setCalendarHours] = useState([0, 23]);
    const [timeSlotDuration, setTimeSlotDuration] = useState(0);
    const [serviceId, setServiceId] = useState(0);
    const [businessServices, setBusinessServices] = useState(props.businessServices);
    const [isLoading, setIsLoading] = useState(false);
    const [booked, setBooked] = useState(false);




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
    } = useForm(initialFieldValues, validate, props.setCurrentId)

    const onAccept = (bookingId, data) => {
        if (window.confirm('Email will be sent to the customer about you accepting the booking')) {
            props.updateBooking(bookingId, data);
        }
    }
    const onReject = id => {
        if (window.confirm('Are you sure?')) {
            props.deleteBooking(id, () => addToast("Submitted successfully", { appearance: 'info' }));
        }
    }


    const handleSubmit = e => {
        e.preventDefault();
        setIsLoading(true);
        values.BusinessId = props.businessInfo && props.businessInfo.list && props.businessInfo.list[0] && props.businessInfo.list[0].id && props.businessInfo.list[0].id;
        values.serviceName = !!currentService && currentService.serviceName;
        values.providerName = currentProviders && currentProviders[0] && currentProviders[0].name



        if (validate()) {
            const onSuccess = () => {
                addToast("Submitted successfully", { appearance: 'success' });
                setValues({ ...initialFieldValues });
                setServiceId(0);                
                setCurrentService(null);
                setProviderTimes(null);
                window.scrollTo({ top: 0, behavior: 'smooth' });
                setBooked(true);
                setIsLoading(false);
            }
            
            props.createBooking(values, onSuccess);
            
            /* }
            else {
                props.updateBooking(props.currentId, values, onSuccess);
            } */
        }
    }

    useEffect(() => {
        //console.log("props.currentId", props.currentId);

        props.id &&
            props.fetchAllBusinessServices(props.id);
        props.fetchAllProviders(props.id);

        console.log("here: ", props.currentId)



        

        setBusinessServices(props.businessServices);
        //setCurrentProviders(props.businessProviders);
        if (props.currentId !== 0 && props.currentId !== undefined) {

            let temp = props.businessBookings && props.businessBookings.length && props.businessBookings.find(x => x.id == props.currentId);

            initialFieldValues = temp;
            initialFieldValues.accepted = props.accept;
            initialFieldValues.BusinessId = props.businessInfo && props.businessInfo.list && props.businessInfo.list[0] && props.businessInfo.list[0].id && props.businessInfo.list[0].id;

            onAccept(props.currentId, temp);

            
            setErrors({})
        }
        if (props.id) {
            //console.log("props.id", props.id);
        }
    }, [props.currentId])


    const showBookingSummary = (start, duration) => {
        setValues({
            ...values,
            "bookingStartTime": JSON.stringify(start),
            "bookingDuration": duration,
        })
    };
    const renderProviders = (providerId, serviceId) => {
        setProviderTimes(null);
        {window.scrollTo(0, document.body.scrollHeight)}
        const curService = props.businessServices.filter(x => x.id == serviceId)[0];
        curService.timeSlotDuration
            ? setTimeSlotDuration(curService.timeSlotDuration)
            : setTimeSlotDuration(0);
        setServiceId(serviceId);
        setCurrentService(curService)
        setValues({
            ...values,
            "serviceId": serviceId
        })

        let currentProv = {};
        currentProv = props.businessProviders.filter(x => providerId.includes(x.id.toString()));
        if (providerId.length > 0) {
            //console.log("provide rid is: ", providerId);
            setCurrentProviders(currentProv);
        }
    };
    let oldId
    const renderProviderTimes = (providerId) => { 
        setCurrentProvider(props.businessProviders.filter(x => x.id === providerId));

        if (oldId !== providerId && props.businessProviders.filter(x => x.id === providerId) !== null) {
            //setCurrentProviders( props.businessProviders.filter(x => x.id == providerId[0]));
            showWeekDays(props.businessProviders.filter(x => x.id === providerId));  
        }
        oldId = providerId;
        if (providerTimes === null) window.scrollTo(0, document.body.scrollHeight)

        let currentProv = {};
        let days = [];
        let hours = [];
        setValues({
            ...values,
            "providerId": providerId
        })

        

        currentProv = currentProviders.filter(x => x.id == providerId).length > 0 ? JSON.parse(currentProviders.filter(x => x.id == providerId)[0].weekvalue) : {};


        setCurrentProvider(currentProviders.filter(x => x.id == providerId)[0]);
        
        //console.log("currentprovider5", currentProviders.filter(x => x.id == providerId)[0].name)


        if (currentProv) {
            Object.keys(currentProv).map(i => {
                weekdays.forEach(element => {
                    if (element.label == currentProv[parseInt(i)].dayIndex) {
                        days.push(element.value);
                    }
                });
                if (hours.length < 3) {
                    hours.push(
                        parseInt(currentProv[parseInt(i)].startTime.substring(0, currentProv[parseInt(i)].startTime.search(":"))),
                        parseInt(currentProv[parseInt(i)].endTime.substring(0, currentProv[parseInt(i)].endTime.search(":"))));
                }
            })
            setProviderTimes(currentProv);
            setCalendarDays(days);
            setCalendarHours(hours);
        }
    };
    
    let providerdays = 0;

    const showWeekDays = (obj) => {

        let currentProviderWeekdays = convertStringToObject(obj[0].weekvalue);

        //urrentProviderWeekdays[0].weekvalue
        let days = [];



        Object.keys(currentProviderWeekdays).map(x => {
            days.push(currentProviderWeekdays[x].dayIndex);
        });


        setProviderWeekDays(days.join(", "));
        providerdays = days.join(", ");

    }
    const convertStringToObject = (arr) => {

        if (typeof arr === "string") {
            return JSON.parse(arr);
        }
        else{
            return arr;
        }

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
        <div>
            {!booked ? <form
                autoComplete="off"
                noValidate
                className={classes.root}
                onSubmit={handleSubmit}
            >
                <Grid container>
                    <div className="services-bookform">
                        <h2>Services</h2>
                        {props.businessServices.length > 0 && props.businessServices.map((service) => (
                            <Box key={service.id} value={service.id}
                                sx={{
                                    minWidth: '1200px',
                                    borderBottom: '1px solid lightgrey',
                                }}
                            >
                                <Grid container spacing={2}>
                                    <Grid item xs={2} md={2}>
                                        <img height="50px" src={"https://nixerwebapi.azurewebsites.net/images/business/" + service.businessId + "/service/serviceImage_"+ service.id +".jpg"} />
                                    </Grid>
                                    <Grid item xs={2} md={2}>
                                        {service.serviceName}
                                    </Grid>
                                    <Grid item xs={2} md={2}>
                                        {service.price}
                                    </Grid>
                                    <Grid item xs={2} md={2}>
                                        {isLoading === false && getProviderNames(service.providerId)}
                                    </Grid>
                                    <Grid item xs={2} md={2}>
                                        {service.timeSlotDuration} minutes
                                    </Grid>
                                    <Grid item xs={2} md={2}>
                                        <Button onClick={() => { renderProviders(service.providerId.split(","), service.id) }} className="bookButton" color="primary" size="large">Select</Button>
                                    </Grid>
                                </Grid>
                            </Box>
                        ))}
                    </div>
                </Grid>
                <Grid container>
                    <div className="providers-block services-bookform">
                        {currentProviders && currentProviders.length > 1 && serviceId ?
                            <>
                                <h4 style={{color:'darkred'}}> Selected a service: <span style={{color:'purple'}}>{currentService.serviceName && currentService.serviceName}</span></h4>
                                <h2> Multiple people can help you </h2>
                            </>
                            : <div style={{display:'none'}}>
                               {serviceId && currentProviders && currentProviders[0] && currentProvider && <h3 style={{color:'orange'}}> <><span style={{color:'purple'}}>{currentProvider.name}</span> is available to help you with <span style={{color:'purple'}}>{currentService.serviceName ? currentService.serviceName : ""}</span></></h3>}
                            </div>
            
                        }
                        <Grid item xs={6} md={6}>
                            {currentProviders && serviceId ? currentProviders.map((providers) => (
            
                                <Box key={providers.id}
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
                                            <img height="50px" src={"https://nixerwebapi.azurewebsites.net/images/business/" + providers.businessId + "/provider/providerImage_"+ providers.id +".jpg"} />
                                        </Grid>
                                        <Grid item xs={2} md={2}>
                                            <h5>{providers.name}</h5>
                                        </Grid>
                                        <Grid item xs={2} md={2}>
                                            <strong>{providers.email}</strong>
                                        </Grid>
                                        <Grid item xs={3} md={3}>
                                            <strong>{providers.phone}</strong>
                                        </Grid>
                                        <Grid item xs={3} md={3}>
                                            <Button onClick={() => { renderProviderTimes(providers.id) }} className="bookButton" color="primary" size="large">See Times</Button>
                                        </Grid>
                                    </Grid>
                                </Box>
                            )) : <div style={{display:'none'}}></div>
                            }
                        </Grid>
                        { providerTimes !== null && serviceId ?
                            <Grid item xs={6} md={6} >
                                <Box
                                    sx={{
                                        minWidth: '1100px',
                                        padding: '10px',
                                        position: 'relative',
                                    }}
                                    label="Select Time"
                                    name="provider"
                                    value={values.provider}
                                    onChange={handleInputChange}
                                >
                                    <h2> Below you can pick timeslot for your booking</h2>
                                    <h2> {currentProvider && currentProvider && currentProvider.name} works on {providerWeekDays && providerWeekDays}</h2>
                                    <Scheduler
                                        view="week"
                                        selectedDate={selectedBookingTime ? selectedBookingTime : new Date()}
                                        sx={{
                                            height: '5px',
                                            padding: '6px',
                                            position: 'relative',
                                        }}
                                        week={{
                                            weekDays: calendarDays,
                                            weekStartOn: 1,
                                            startHour: calendarHours[0],
                                            endHour: calendarHours[1],
                                            step: timeSlotDuration,
                                            cellRenderer: ({ height, start, onClick }) => {
                                                // Fake some condition up
                                                const hour = start.getHours();
                                                //console.log({ hour })
                                                const minutes = start.getHours();
                                                let disabled = hour <= calendarHours[0] || hour >= calendarHours[1];
                                                let selected = false;
                                                disabled = new Date() > start ? true : disabled;
                                                if (hour === selectedBookingTime.getHours() && minutes === selectedBookingTime.getMinutes()) {
                                                    selected = true;
                                                }
                                                return (
                                                    <Button
                                                        style={{
                                                            height: "100%",
                                                            background: disabled ? "pink" : "lightgreen",
                                                            border: selected ? "1px solid grey" : "",
                                                            "pointer-events": disabled && 'none'
                                                        }}
                                                        onClick={() => {
                                                            
                                                            if (!disabled) {
                                                                //setTimeSlotDuration(height)
                                                                setSelectedBookingTime(new Date(start));
                                                                showBookingSummary(start, timeSlotDuration);
                                                                return console.log(start, timeSlotDuration);
                                                            }
                                                            
                                                           
                                                        }}
                                                        disableRipple={disabled}
                                                    // disabled={disabled}
                                                    > {!disabled ? <p>Available - Select</p> : "Not Available"}</Button>
                                                );
                                            }
                                        }}
                                    />
                                </Box>
                            </Grid>: <div style={{display:'none'}}></div>
                        }
                    </div>
                </Grid>
                {
                    providerTimes && serviceId && <>
                        <h2> Enter personal details</h2>
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
                            value={values.email}
                            onChange={handleInputChange}
                        />
                        <TextField
                            name="phone"
                            variant="outlined"
                            label="Phone Number"
                            value={values.phone}
                            onChange={handleInputChange}
                        /></>}
                {serviceId ?
                    <Box
                        sx={{
                            minWidth: '100%',
                            padding: '10px',
                            position: 'relative',
                        }}>
                        <Grid
                            sx={{
                                minWidth: '100%',
                                padding: '10px',
                                position: 'relative',
                            }}
                            container className="booking_summary" item xs={12} md={12}>
                            <Grid item xs={1} md={1}>
                                <img height="90px" src={"https://nixerwebapi.azurewebsites.net/images/business/" + currentService.businessId + "/service/serviceImage_"+ currentService.id +".jpg"} />
                            </Grid>
                            <Grid item xs={2} md={1}>
                                <strong>Service Name: <br />{currentService.serviceName}</strong>
                                <br />
                                <strong>Price: <br /> €{currentService.price}.00</strong>
                            </Grid>
                            <Grid item xs={2} md={1}>
                                <strong>Service Duration: {currentService.timeSlotDuration} </strong> minutes
                            </Grid>
                            <Grid item xs={2} md={1}>
                                <div>{currentProviders && <img src={"https://nixerwebapi.azurewebsites.net/images/business/" + currentProviders[0].businessId + "/provider/providerImage_"+ currentProviders[0].id +".jpg"}/>}
                                    <strong>Provider {currentProviders && currentProviders[0] ? currentProviders[0].name : "not selected"}</strong></div>
                            </Grid>
                            <Grid item xs={2} md={2}>
                                <strong>Booking Date:</strong><br /> {values.bookingStartTime !== "" ? values.bookingStartTime : "Time not selected"}
                            </Grid>
                            <Grid item xs={2} md={2}>
                                {values.name &&
                                    <>
                                        <strong>Your Details: </strong>
                                        <div>
                                            <strong>Name:</strong> {values.name ? values.name : "Name not entered"} <br />
                                            <strong>Email:</strong> {values.email ? values.email : "Email not entered"}<br />
                                            <strong>Phone:</strong> {values.phone ? values.phone : "Phone not entered"}
                                        </div>
                                    </>
                                }
                            </Grid>
                            <Grid item xs={2} md={2}>
                                {values.phone &&
                                    <>
                                        <Button
                                            className={classes.smMargin}
                                            variant="contained"
                                            color="secondary"
                                            type="submit"
                                        >
                                            Reserve a Service
                                        </Button>
                                    </>}
                            </Grid>
                            <Grid item xs={2} md={1}>
                                <strong>Booking Date:</strong><br /> {values.bookingStartTime !== "" ? values.bookingStartTime : "Time not selected"}
                            </Grid>
                        </Grid>
                    </Box>: <div style={{display:'none'}}></div>}
            </form >: 
            <h1>Congratulations you just made a booking request and provider will soon get in touch.</h1> }
        </div>
    )
}

const mapStateToProps = state => ({
    businessServices: state.businessService.list,
    businessProviders: state.businessProvider.list,
    businessBookings: state.businessBooking.list,
    authentication: state.authentication.loggedIn ? state.authentication.user : null,
    businessInfo: state.businesses
});


const mapActionsToProps = {
    fetchAllProviders: providerActions.fetchAll,
    fetchAllBusinessServices: serviceActions.fetchAll,
    createBooking: bookingActions.create,
    updateBooking: bookingActions.update,
    //fetchAuth: authenticationActions.fetchAuth,
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(BookingsForm));