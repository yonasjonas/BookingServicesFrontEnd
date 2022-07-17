import * as bookingActions from "../../Actions/businessBookings";
import * as providerActions from "../../Actions/businessProvidersActions";
import * as serviceActions from "../../Actions/businessServices";
import { connect } from "react-redux";
import { styled } from '@mui/material/styles';
import React, { useState, useEffect, useRef } from "react";
import { Grid, Container, Select, MenuItem, withStyles, FormControl, Button, TextField, OutlinedInput } from '@material-ui/core';
import useForm from '../useForm';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { useToasts } from "react-toast-notifications";
import { Scheduler } from "@aldabil/react-scheduler";
import * as helpers from '../../Helpers';
import EventBusyIcon from '@mui/icons-material/EventBusy';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import CloseIcon from '@mui/icons-material/Close';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PaymentForm from '../../Components/Forms/PaymentForm';


const styles = theme => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            minWidth: '100%'
        }
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: "100%"


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


    const input1 = useRef(null);
    const input2 = useRef(null);
    const input3 = useRef(null);
    const inputName = useRef(null);
    const inputservices = useRef(null);
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
    const [bookingSummaryOpened, setBookingSummaryOpened] = useState(false);
    const [booked, setBooked] = useState();
    let providerdays = 0;
    const [payWithCard, setPayWithCard] = useState(false);
    let oldId;


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
        if (window.confirm('Are you sure?')) {
            props.updateBooking(bookingId, data);
        }
    }
    const handleSubmit = e => {
        e.preventDefault();
        setIsLoading(true);
        values.BusinessId = props.businessInfo && props.businessInfo.list && props.businessInfo.list[0] && props.businessInfo.list[0].id && props.businessInfo.list[0].id;
        values.serviceName = !!currentService && currentService.serviceName;
        values.providerName = currentProvider && currentProvider.name



        if (validate()) {
            const onSuccess = () => {
                addToast("Submitted successfully", { appearance: 'success' });
                setValues({ ...initialFieldValues });
                setServiceId(0);
                setCurrentService(null);
                setProviderTimes(null);
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
        props.id &&
            props.fetchAllBusinessServices(props.id);
        props.fetchAllProviders(props.id);
        setBusinessServices(props.businessServices);
        if (props.currentId !== 0 && props.currentId !== undefined) {
            let temp = props.businessBookings && props.businessBookings.length && props.businessBookings.find(x => x.id == props.currentId);
            initialFieldValues = temp;
            initialFieldValues.accepted = props.accept;
            initialFieldValues.BusinessId = props.businessInfo && props.businessInfo.list && props.businessInfo.list[0] && props.businessInfo.list[0].id && props.businessInfo.list[0].id;
            onAccept(props.currentId, temp);
            setErrors({})
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


        window.innerWidth > 1024 ? setBookingSummaryOpened(true) : setBookingSummaryOpened(false);
        setProviderTimes(null);
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

        setTimeout(() => {
            input1.current && input1.current.scrollIntoView({
                behavior: "smooth",
            });
        }, 100);

    };
    const renderProviderTimes = (providerId) => {

        setCurrentProvider(props.businessProviders.filter(x => x.id === providerId));
        if (oldId !== providerId && props.businessProviders.filter(x => x.id === providerId) !== null) {
            showWeekDays(props.businessProviders.filter(x => x.id === providerId));
        }
        oldId = providerId;
        let currentProv = {};
        let days = [];
        let hours = [];
        setValues({
            ...values,
            "providerId": providerId
        })
        currentProv = currentProviders.filter(x => x.id == providerId).length > 0 ? JSON.parse(currentProviders.filter(x => x.id == providerId)[0].weekvalue) : {};
        setCurrentProvider(currentProviders.filter(x => x.id == providerId)[0]);

        if (currentProv && currentProv.childData !== null) {
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
        setTimeout(() => {
            input2.current && input2.current.scrollIntoView({
                behavior: 'auto',
                block: 'center',
                inline: 'center'
            });

        }, 100);

    };
    const showWeekDays = (obj) => {

        let currentProviderWeekdays = convertStringToObject(obj[0].weekvalue);

        //urrentProviderWeekdays[0].weekvalue
        let days = [];



        currentProviderWeekdays && currentProviderWeekdays.childData !== null && Object.keys(currentProviderWeekdays).map(x => {
            if (currentProviderWeekdays[x] && currentProviderWeekdays[x].dayIndex) {
                days.push(currentProviderWeekdays[x].dayIndex);
            }
        });


        setProviderWeekDays(days.join(", "));
        providerdays = days.join(", ");

    }
    const convertStringToObject = (arr) => {

        if (typeof arr === "string") {
            return JSON.parse(arr);
        }
        else {
            return arr;
        }

    }
    const getProviderNames = (providerId) => {
        const providerIdList = typeof providerId === 'string' ? providerId.split(',') : providerId;
        let lproNames = [];
        let jsxProviders = "";

        providerIdList && providerIdList.map(pId => {
            const providerName = !!props && props.businessProviders && props.businessProviders.filter(x => x.id == pId).map(x => x.name)
                ? props.businessProviders.filter(x => x.id == pId).map(x => x.name) : "";
            providerName !== "" && lproNames.push(providerName);



        });
        for (let i = 0; i < lproNames.length; i++) {

            jsxProviders = <div>{jsxProviders}<div className="providerNames secondaryColor">{lproNames[i] !== "" && lproNames[i]}</div></div>
        }

        return jsxProviders;
    };
    const servicesBlock = () => {
        return props.businessServices.length > 0 && props.businessServices.map((service) => (
            <Box className="" key={service.id} value={service.id}
                sx={{
                    marginBottom: '2px',
                    //borderBottom: '1px solid lightgrey',
                }}
            >
                <Item ref={inputservices}>
                    <Grid container spacing={2} className="thirdTextColor">
                        <Grid item xs={12} md={1}>
                            <img width="100%" src={"https://nixerwebapi.azurewebsites.net/images/business/" + service.businessId + "/service/serviceImage_" + service.id + ".jpg"} />
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <h2 className="servicename secondaryTextColor">{service.serviceName}</h2>
                        </Grid>
                        <Grid item xs={12} md={2}>
                            <div className="price thirdColor">
                                <h2 className="primaryTextColor">From: {service.price}€ </h2> <h4 className="secondaryTextColor">for around {service.timeSlotDuration}min. slot</h4>
                            </div>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            {isLoading === false && <div className="allProviderNames">{getProviderNames(service.providerId)}</div>}
                        </Grid>
                        <Grid item xs={12} md={2}>
                            <Button onClick={() => { renderProviders(service.providerId.split(","), service.id) }} className="bookButton primaryColor" color="primary" size="large">Select</Button>
                        </Grid>
                    </Grid>
                </Item>
            </Box>
        ))
    }
    const providersBlock = () => {
        return currentProviders && serviceId ? <Box
            className="providersBlock"
            sx={{
                marginBottom: '2px',
                position: 'relative',
            }}
            label="Service Provider"
            name="provider"
            value={values.provider}
            // @ts-ignore Typings are not considering `native`
            onChange={handleInputChange}
        ><Item>
                
                {<h1 className="secondaryTextColor titleOnly"> You selected: {currentService.serviceName && currentService.serviceName}</h1>}
                <h3 ref={input1} className="primaryTextColor titleOnly">Now pick a provider</h3>


                {currentProviders.map((providers) => (
                    <Grid container key={providers.id} spacing={2}>
                        <Grid item xs={12} md={2}>
                            <img width="100%" src={"https://nixerwebapi.azurewebsites.net/images/business/" + providers.businessId + "/provider/providerImage_" + providers.id + ".jpg"} />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <h4 className="secondaryTextColor">{providers.name}</h4>
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <h4 className="secondaryTextColor">{helpers.getRandomInt(100, 1500, 0)} Reviews {helpers.getRandomInt(3, 5, 2)} out of 5 <img height="14px" src="https://nixerwebapi.azurewebsites.net/images/5stars.png" alt="reviews" /></h4>
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <Button onClick={() => { renderProviderTimes(providers.id) }} className="bookButton secondaryColor" color="primary" size="large">Pick Provider</Button>
                        </Grid>
                    </Grid>
                ))


                }
            </Item>
        </Box>
            : null
    }
    const calendarBlock = () => {
        return providerTimes !== null && serviceId ?
            <Box
                sx={{
                    width: '100%',
                    marginTop: '0px',
                }}
                label="Select Time"
                name="provider"
                value={values.provider}
                onChange={handleInputChange}
            >
                <Item ref={input2}>
                    <h4 className="secondaryTextColor titleOnly">Pick a time slot for your booking</h4>
                    <Scheduler
                        view="week"
                        selectedDate={selectedBookingTime ? selectedBookingTime : new Date()}
                        resourceViewMode="tabs"
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
                                const minutes = start.getDay();
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
                                            maxHeight: "30px",
                                            background: disabled ? "#fff" : "rgb(10 171 73)",
                                            border: selected ? "1px solid grey" : "",
                                            pointerEvents: disabled && 'none'
                                        }}
                                        onClick={() => {

                                            if (!disabled) {
                                                //setTimeSlotDuration(height)
                                                setSelectedBookingTime(new Date(start));
                                                showBookingSummary(start, timeSlotDuration);
                                                setTimeout(() => {

                                                    inputName && inputName.current.scrollIntoView({
                                                        behavior: "smooth",
                                                    });

                                                }, 100);
                                                //input3 && input3.current && input3.current.focus();


                                            }



                                        }}
                                        disableRipple={disabled}
                                    // disabled={disabled}
                                    > {!disabled && window.innerWidth > 768 ? <p style={{ color: "white" }}>Select</p>
                                        : !disabled && window.innerWidth < 768 ? <p className="iconsconfirm">Book</p>
                                            : <EventBusyIcon className="disabled" />}
                                    </Button>
                                );
                            }
                        }}
                    />
                    <p className="secondaryTextColor"> <strong>{currentProvider && currentProvider && currentProvider.name}</strong> provides service on {providerWeekDays && providerWeekDays} this week.</p>
                    <strong className="primaryTextColor">* If you can not see appointments this week go to next</strong>
                </Item>
            </Box>


            : <div style={{ display: 'none' }}></div>

    }
    const customerDetailsBlock = () => {
        return providerTimes && serviceId &&

            <Box
                sx={{
                    marginTop: '0px',
                }}
                label="Select Time"
                name="provider"
                value={values.provider}
                onChange={handleInputChange}
            >
                <Item>
                    <Grid className="customerDetailsBlock" container style={{}}>
                        <Grid item xs={12} md={12}>
                            <h2 ref={inputName} className="primaryTextColor titleOnly">Enter your details so provider could get in touch with you after you make a booking</h2>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <TextField
                                name="name"
                                variant="outlined"
                                label="Full Name *"
                                value={values.name}
                                onChange={handleInputChange}
                            />

                        </Grid>
                        <Grid item xs={12} md={4}>
                            <TextField
                                name="email"
                                variant="outlined"
                                label="Email *"
                                value={values.email}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <TextField
                                name="phone"
                                variant="outlined"
                                label="Phone Number *"
                                value={values.phone}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        {values.phone === "" && values.email === "" && values.name === "" ? 
                        <div>
                            <div style={{ height: '250px' }}></div>
                        </div> :
                        <div>
                            
                            <h1>Price: {currentService.price}</h1>
                            {payWithCard && <PaymentForm serviceId={serviceId}/>}
                        </div>
                    }
                    </Grid >
                </Item>
            </Box>




    }
    const bookingSummaryBlock = () => {
        return serviceId && bookingSummaryOpened ?

            <Item className="booking_summary">
                <h1 className="primaryTextColor titleOnly">Booking Summary</h1>
                <Grid container item xs={12} md={12}>
                    <Button className="cancel" color="primary" onClick={() => { setBookingSummaryOpened(false) }}>
                        <CloseIcon className="closeicon" />
                    </Button>

                    <Grid item xs={12} md={12}>
                        <strong>Service Name: </strong><div>{currentService.serviceName}</div>
                        <br />

                    </Grid>
                    <Grid item xs={12} md={6}>
                        <strong>Price:</strong> <div>€{currentService.price}.00</div>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <strong>Service Duration: </strong><div>{currentService.timeSlotDuration} minutes</div>
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <strong>Provider:</strong>
                        <div>{currentProvider && <img height="70px" src={"https://nixerwebapi.azurewebsites.net/images/business/" + currentProvider.businessId + "/provider/providerImage_" + currentProviders[0].id + ".jpg"} />}
                            <br /> {currentProvider ? <strong>{currentProvider.name}</strong> : <div>not selected yet...</div>}
                        </div>
                    </Grid>

                    <Grid item xs={12} md={12}>
                        <strong>Booking Date:</strong><br /> {values.bookingStartTime !== "" ? helpers.convertDate(values.bookingStartTime) : <div><br /> not selected yet...</div>}
                    </Grid>
                    <Grid item xs={12} md={12}>
                        {values.name ?
                            <>
                                <strong>Your Details: </strong>
                                <div>
                                    {values.name ? values.name : "Name not entered"} <br />
                                    {values.email ? values.email : "Email not entered"}<br />
                                    {values.phone ? values.phone : "Phone not entered"}
                                </div>
                            </> : <div><strong>Your Details: </strong> <br /><br />not selected yet...</div>
                        }
                    </Grid>
                    <Grid item xs={12} md={12}>
                        {values.phone && window.innerWidth < 768 ?
                            <>
                               <Button
                                    className={classes.smMargin}
                                    variant="contained"
                                    color="secondary"
                                    type="submit"
                                    onClick={handleSubmit}
                                >
                                    Reserve a Service
                                </Button>
                            </> : window.innerWidth < 768 &&  <Button
                                className={classes.smMargin}
                                variant="contained"
                                color="secondary"
                                type="submit"
                                disabled
                            >
                                Reserve a Service
                            </Button>}
                    </Grid>
                </Grid>
            </Item>

            : serviceId ? <div className="closedCartdiv">
                <Button variant="contained" className="primaryColor" color="primary" onClick={() => { setBookingSummaryOpened(true) }}>
                    <ShoppingCartIcon style={{ color: "white!important" }} />

                    <div className="closedCart">Open Booking Summary</div>
                </Button>
            </div>
                : <div style={{ display: 'none' }}></div>
    }

    return (
        <Container maxWidth="lg">           
            {!booked && !props.admin ? <div
                
                
            >

                <Grid>

                    <div className="services-bookform">
                        <h1 className="primaryTextColor titleOnly">Services</h1>
                        {servicesBlock()}
                    </div>
                    <div className="providers-block services-bookform">
                        {currentProviders && currentProviders.length > 1 && serviceId ?
                            <>
                                <h1 className="primaryTextColor titleOnly">Providers</h1>

                            </>
                            : <div style={{ display: 'none' }}>
                                <h1 className="primaryTextColor titleOnly">Providers</h1>
                                {serviceId && currentProviders && currentProviders[0] && currentProvider && <h3 style={{ color: 'orange' }}> <><span style={{ color: 'purple' }}>{currentProvider.name}</span> is available to help you with <span style={{ color: 'purple' }}>{currentService.serviceName ? currentService.serviceName : ""}</span></></h3>}
                            </div>

                        }
                        <Grid item xs={12} md={6}>
                            {providersBlock()}
                        </Grid>
                        <Grid item xs={12} md={6}>
                            {calendarBlock()}
                        </Grid>
                        <Grid item xs={12} md={12}>
                            {values.phone !== "" && values.email !== "" && values.name !== "" &&
                            <div>
                                <Button className={classes.smMargin + " primaryColor fullWidth"}
                                            variant="contained"
                                            type="submit"
                                            onClick={() => {setPayWithCard(true)}}
                                            >
                                Pay with card</Button>
                                <Button className={classes.smMargin + " primaryColor fullWidth"}
                                            variant="contained"
                                            type="submit"
                                            onClick={() => {setPayWithCard(false)}}>
                                Pay after
                                </Button>
                            </div>}
                            {customerDetailsBlock()}
                        </Grid>
                        
                        <Grid item xs={12} md={12}>
                            {values.phone !== "" && values.email !== "" && values.name !== "" &&
                                <>
                                
                                    <Button
                                        className={classes.smMargin + " primaryColor fullWidth"}
                                        variant="contained"
                                        type="submit"
                                    >
                                        Reserve a Service
                                    </Button>
                                </>}
                        </Grid>


                    </div>


                </Grid>
                <Grid>
                    <Grid className="bookingsummaryblock" item xs={12} md={12}>
                        {bookingSummaryBlock()}
                    </Grid>
                </Grid>
            </div > :
                <div>
                    {!props.admin && <><h2 style={{ marginTop: '20px' }} className="primaryTextColor titleOnly">Congratulations you just made a booking request and provider will soon get in touch. Email has been sent.</h2><a className="confirmedbooking secondaryColor titleOnly" href="/book-services">Browse More</a></>}
                </div>
            }
        </Container>
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