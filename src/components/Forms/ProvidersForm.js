import * as actions from "../../actions/businessProvidersActions";
import { connect } from "react-redux";
import React, { useState, useEffect } from "react";
import { Grid, InputLabel, Select, MenuItem, withStyles, FormControl, Button, TextField, Divider } from '@material-ui/core';
import useForm from '../useForm';
import { useToasts } from "react-toast-notifications";
import ImageUpload from "../FormElements/UploadToServer"
import "react-datetime/css/react-datetime.css";
import Datetime from "react-datetime";
import DaysSelector from "../FormElements/DaysSelector";
import TimeSlider from "../FormElements/TimeSlider";
import Stack from '@mui/material/Stack';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';



const styles = theme => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            minWidth: '80%'
        }
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: '80%',
        minHeigth: '400px',
        width: "100%"

    },

    selectEmpty: {
        marginTop: theme.spacing(1),
        minWidth: '80%'
    },
    smMargin: {
        margin: theme.spacing(1),
    },


});

const allWeekdays = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
];

const initialFieldValues = {
    name: "",
    email: "",
    phone: "",
    weekvalue: "",
    businessId: null,
}

let oldNewDaysLength = 0;

const ProvidersForm = ({ classes, ...props }) => {

    const user = JSON.parse(localStorage.getItem('user'));


    const handleSubmit = e => {
        e.preventDefault();
        values.weekvalue = values.weekvalue ? values.weekvalue : "";
        values.businessId = user ? user.id : 11;

        console.log("works:", values);
        if (validate()) {
            const onSuccess = () => {
                addToast("Submitted successfully", { appearance: 'success' });
                resetForm();
                setDays([])
            }
            if (props.currentId == 0) {
                props.createProvider(values, onSuccess);
            }
            else {
                props.updateProvider(props.currentId, values, onSuccess);
            }
        }
    }

    let localDays = [];

    useEffect(() => {
        oldNewDaysLength = 0;
        //props.providersList();
        //resetForm();
        if (props.currentId !== 0) {
            console.log("props.currentId: ", props.currentId)
            localDays = [];
            setValues(props.providersList.find(x => x.id == props.currentId));

            const localValues = props.providersList.find(x => x.id == props.currentId);

            values.weekvalue = JSON.parse(props.providersList.find(x => x.id == props.currentId).weekvalue);

            //console.log({ values });
            if (!!values.weekvalue && values.weekvalue !== "[object Object]") {
                if (typeof values.weekvalue === 'string') {
                    Object.keys(JSON.parse(values.weekvalue)).map(i => {

                        localDays.push(i);
                        setDays(localDays);
                        console.log("babrabim!", values.weekvalue[i])
                        //setDays(prevTimes => ([...prevTimes, localDays]))
                        //values.weekvalue = JSON.parse(correctProvider.weekvalue);
                        //console.log("values.weekvalue : ", values.weekvalue);
                        //days.push(i);
                        //console.log("daysdaysdaysdaysdaysdays : ",days);
                    })
                }
                else {
                    Object.keys(values.weekvalue).map(i => {
                        localDays.push(i);
                        setDays(localDays);
                        console.log("babrabim!", values.weekvalue[i]);
                        //console.log("goandof: ", TimeSlider.marks)
                        //console.log("goandof: ", callbackFunction())
                    });

                }
            }

            setDays(localDays);
            //handleDays(localDays)
            if (props.currentId !== 0) {
                setValues({
                    ...values
                })
            }
            //values.weekvalue = JSON.parse(values.weekvalue);


            setErrors({})
        }

    }, [props.currentId])


    //console.log({ props });
    const [days, setDays] = useState(() => []);

    const handleDays = (value, newDays) => {

        let touched = false;

        if (!newDays) {
            newDays = value;
            touched = true;
        }

        if (newDays.length) {
            setDays(newDays);
            //setDays(prevDays => ([...prevDays, newDays]))
        }

        console.log("newDays : ", newDays);

        if (newDays.length < oldNewDaysLength) {
            if (!!values.weekvalue && values.weekvalue !== "[object Object]") {
                if (typeof values.weekvalue === 'string') {
                    values.weekvalue = JSON.parse(values.weekvalue);
                    Object.keys(values.weekvalue).map(i => {

                        if (newDays.includes(i)) {
                            values.weekvalue[i] = null;
                            //const { key, ...profilesWithoutKey } = profiles;
                            console.log({ values });
                        }

                    })
                }
                else {

                    Object.keys(values.weekvalue).map(i => {

                        if (newDays.includes(i)) {
                            values.weekvalue[i] = null;
                            //const { key, ...profilesWithoutKey } = profiles;
                            console.log("removed", i);
                        }
                    });

                }
            }
        }
        else if (touched) {
            if (!!values.weekvalue && values.weekvalue !== "[object Object]") {
                if (typeof values.weekvalue === 'string') {
                    values.weekvalue = JSON.parse(values.weekvalue);
                    Object.keys(values.weekvalue).map(i => {
                        localDays.push(i);
                        setDays(localDays);
                        console.log("babrabim!", values.weekvalue[i])
                    })
                }
                else {

                    Object.keys(values.weekvalue).map(i => {
                        localDays.push(i);
                        setDays(localDays);


                    });

                }
            }

        }

        oldNewDaysLength = newDays.length > 0 ? newDays.length : 0;



    };

    const { addToast } = useToasts();
    var daysSelected = [];
    //const state = this.state;

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ("serviceName" in fieldValues)
            temp.name = fieldValues.name.length > 0 ? "" : "Service Name is required"
        if ("price" in fieldValues)
            temp.email = fieldValues.email.toString().length > 0 ? "" : "Price is required"
        if ("timeSlotDuration" in fieldValues)
            temp.phone = fieldValues.phone.toString().length > 0 ? "" : "Time Slot Duration is required"
        /* if ("weekvalue" in fieldValues)
            temp.weekvalue = fieldValues.weekvalue.length > 0 ? "" : "Week is required" */
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
        resetForm,
    } = useForm(initialFieldValues, validate, props.setCurrentId, setDays);


    //
    const callbackFunction = (childData) => {
        values.weekvalue = childData;
    }

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
                    label="Person Name"
                    value={values.name}
                    onChange={handleInputChange}
                    {...(errors.name && { error: true, helperText: errors.name })}
                />
                {/* <ImageUpload /> */}
                <TextField
                    name="email"
                    variant="outlined"
                    label="Email"
                    value={values.email}
                    onChange={handleInputChange}
                    {...(errors.email && { error: true, helperText: errors.email })}
                />
                <TextField
                    name="phone"
                    variant="outlined"
                    label="Phone"
                    value={values.phone}
                    onChange={handleInputChange}
                    {...(errors.phone && { error: true, helperText: errors.timeSlotDuration })}
                />{/* 
                <TextField
                    name="phone"
                    variant="outlined"
                    label="Bio"
                    multiline
                    minRows={4}
                    maxRows={7}
                    value={values.phone}
                    onChange={handleInputChange}
                    {...(errors.phone && { error: true, helperText: errors.timeSlotDuration })}
                /> */}
                <Stack direction="row" spacing={3}>
                    <ToggleButtonGroup
                        value={days}
                        onChange={handleDays}
                        aria-label="day"
                    >
                        <ToggleButton value="1" aria-label="left aligned" aria-labelledby="1">
                            Monday
                        </ToggleButton>
                        <ToggleButton value="2" aria-label="aligned" aria-labelledby="2">
                            Tuesday
                        </ToggleButton>
                        <ToggleButton value="3" aria-label="aligned" aria-labelledby="3">
                            Wednesday
                        </ToggleButton>
                        <ToggleButton value="4" aria-label="aligned" aria-labelledby="4">
                            Thursday
                        </ToggleButton>
                        <ToggleButton value="5" aria-label="aligned" aria-labelledby="5">
                            Friday
                        </ToggleButton>
                        <ToggleButton value="6" aria-label="aligned" aria-labelledby="6">
                            Saturday
                        </ToggleButton>
                        <ToggleButton value="7" aria-label="right aligned" aria-labelledby="7">
                            Sunday
                        </ToggleButton>
                    </ToggleButtonGroup>
                </Stack>


                {days.length > 0 || localDays.length !== days.length &&

                    1 + 1}


                {days.find(x => x == "0") && <TimeSlider parentCallback={callbackFunction} currentId={props.currentId} daysObject={values.weekvalue} arrayKey={0} day="Monday" />}
                {days.find(x => x == "1") && <TimeSlider parentCallback={callbackFunction} currentId={props.currentId} daysObject={values.weekvalue} arrayKey={1} day="Tuesday" />}
                {days.find(x => x == "2") && <TimeSlider parentCallback={callbackFunction} currentId={props.currentId} daysObject={values.weekvalue} arrayKey={2} day="Wednesday" />}
                {days.find(x => x == "3") && <TimeSlider parentCallback={callbackFunction} currentId={props.currentId} daysObject={values.weekvalue} arrayKey={3} day="Thursday" />}
                {days.find(x => x == "4") && <TimeSlider parentCallback={callbackFunction} currentId={props.currentId} daysObject={values.weekvalue} arrayKey={4} day="Friday" />}
                {days.find(x => x == "5") && <TimeSlider parentCallback={callbackFunction} currentId={props.currentId} daysObject={values.weekvalue} arrayKey={5} day="Saturday" />}
                {days.find(x => x == "6") && <TimeSlider parentCallback={callbackFunction} currentId={props.currentId} daysObject={values.weekvalue} arrayKey={6} day="Sunday" />}
                <br />
                <FormControl variant="outlined" className={classes.formControl} >


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
                className={classes.smMargin}
                onClick={resetForm}
            >
                Reset
            </Button>
        </form>
    )
}

const mapStateToProps = state => ({
    providersList: state.businessProvider.list,

});

const mapActionsToProps = {
    createProvider: actions.create,
    updateProvider: actions.update,
    deleteProvider: actions.deleteData,
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(ProvidersForm));