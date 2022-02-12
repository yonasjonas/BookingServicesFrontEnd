import * as actions from "../../actions/businessProviders";
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
    weekvalue: [],
    weekValue2: {
        day: {
            value: "",
            start: "",
            end: ""
        },


    },
}



const ProvidersForm = ({ classes, ...props }) => {

    const [days, setDays] = React.useState(() => []);
    const handleDays = (event, newDays) => {
        if (newDays.length) {
            setDays(newDays);
        }
        console.log({ days });
    };

    const { addToast } = useToasts();
    const [workingDays, setWorkingDays] = React.useState();
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
        if (props.currentId !== 0) {
            let temp = props.providersList.find(x => x.id == props.currentId);
            setValues({
                ...temp
            })
            setErrors({})
        }
        setWorkingDays(daysSelected);

    }, [props.currentId])

    const renderTimeslots = (days) => {
        daysSelected = [];
        days.map(day => {
            daysSelected.push(day);
        });
        console.log({ workingDays });
        //console.log({props});
    }
    //renderTimeslots([""]);


    //
    const pull_data = (props) => {
        setWorkingDays(props);
        return props;
        // LOGS DATA FROM CHILD (My name is Dean Winchester... &)
    }


    const handleClick = () => {
        console.log(values);
    }

    const handleCallback = (childData) =>{
        this.setState({name: childData})
    }


    //let workDays = workingDays.length;




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
                <ImageUpload />
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
                />
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
                />
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


                {days.length > 0 &&

                    console.log(days)}
                {days.find(x => x == "1") && <TimeSlider parentCallback = {this.handleCallback} spkey="1" day="Monday" />}
                {days.find(x => x == "2") && <TimeSlider spkey="2" day="Tuesday" />}
                {days.find(x => x == "3") && <TimeSlider spkey="3" day="Wednesday" />}
                {days.find(x => x == "4") && <TimeSlider spkey="4" day="Thursday" />}
                {days.find(x => x == "5") && <TimeSlider spkey="5" day="Friday" />}
                {days.find(x => x == "6") && <TimeSlider spkey="6" day="Saturday" />}
                {days.find(x => x == "7") && <TimeSlider spkey="7" day="Sunday" />}
                <br />
                <FormControl variant="outlined" className={classes.formControl}>

                    
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
    providersList: state.businessProvider.list,

});

const mapActionsToProps = {
    createProvider: actions.create,
    updateProvider: actions.update,
    deleteProvider: actions.deleteData,
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(ProvidersForm));