import * as actions from "../../actions/businessProvidersActions";
import { connect } from "react-redux";
import React, { useState, useEffect } from "react";
import { Grid, InputLabel, Select, MenuItem, withStyles, Button, TextField, Divider } from '@material-ui/core';
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
import FileUpload from "../FormElements/FileUpload";
import * as helpers from '../../helpers';
import UploadPage from "../FormElements/UploadPage";





const styles = theme => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            minWidth: '80%'
        }
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
    const [daysError, setDaysError] = useState(false);


    const handleSubmit = e => {

        e.preventDefault();
        values.weekvalue = values.weekvalue ? values.weekvalue : "";
        values.businessId = user ? user.id : null;

        //console.log("works:", values);
        if (validate()) {
            const onSuccess = () => {
                addToast("Submitted successfully", { appearance: 'success' });
                resetForm();
                setDays([])
                props.fetchProviders(values.businessId)
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
        if (props.currentId !== 0) {
            setEditing(true)
            localDays = [];
            let localValues = props.providersList.find(x => x.id == props.currentId);

            localValues.weekvalue = localValues.weekvalue ? helpers.convertStringToObject(localValues.weekvalue) : null;

            if (localValues.weekvalue) {
                Object.keys(localValues.weekvalue).map(i => {
                    if (localValues.weekvalue[i] !== null && localValues.weekvalue[i].dayIndex !== null) {
                        localDays.push(i);
                    }
                })
                setValues({
                    ...localValues
                });

                setDays(localDays);
            }
            //setErrors({})
        }

    }, [props.currentId])


    //console.log({ props });
    const [days, setDays] = useState(() => []);

    const handleDays = (value, newDays) => {

        setDaysError(false);

        //if (Object.keys(values.weekvalue).length > Object.keys(newDays).length) {
        /* if (Object.keys(values.weekvalue).length !== 0 && props.currentId !== 0) {
            values.weekvalue = {};
            setDays([]);
        } */
            newDays.map(i => {
                if (values.weekvalue[parseInt(i)] === undefined) {
                    delete values.weekvalue[parseInt(newDays[i])]
                    //values.weekvalue[parseInt(newDays[i])]
                }
            });
        //}





        let touched = false;

        if (!newDays) {
            newDays = value;
            touched = true;
        }

        if (newDays.length) {
            setDays(newDays);
            //setDays(prevDays => ([...prevDays, newDays]))
        }

        //console.log("newDays : ", newDays);

        /* if (newDays.length < oldNewDaysLength) {
            if (!!values.weekvalue && values.weekvalue !== "[object Object]") {
                if (typeof values.weekvalue === 'string') {
                    values.weekvalue = JSON.parse(values.weekvalue);
                    Object.keys(values.weekvalue).map(i => {

                        if (newDays.includes(i)) {
                            values.weekvalue[i] = null;
                            //const { key, ...profilesWithoutKey } = profiles;
                            //console.log({ values });
                        }

                    })
                }
                else {

                    Object.keys(values.weekvalue).map(i => {

                        if (newDays.includes(i)) {
                            values.weekvalue[i] = null;
                            //const { key, ...profilesWithoutKey } = profiles;
                            //console.log("removed", i);
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
                        //console.log("babrabim!", values.weekvalue[i])
                    })
                }
                else {

                    Object.keys(values.weekvalue).map(i => {
                        localDays.push(i);
                        setDays(localDays);


                    });

                }
            }

        } */

        oldNewDaysLength = newDays.length > 0 ? newDays.length : 0;



    };

    const { addToast } = useToasts();
    const [editing, setEditing] = useState(false);

    var daysSelected = [];
    //const state = this.state;

    const lvalidate = (initialFieldValues = values) => {
        //values.AcceptTerms ? setValues({ ...values, AcceptTerms: true }) : setValues({ ...values, AcceptTerms: false });
        let temp = { ...errors };
        if ("BusinessName" in initialFieldValues)
            temp.BusinessName = initialFieldValues.BusinessName.length > 0 ? "" : "BusinessName is required"
        if ("Email" in initialFieldValues)
            temp.Email = initialFieldValues.Email.length > 0 ? "" : "Email is required"
        if ("Phone" in initialFieldValues)
            temp.Phone = initialFieldValues.Phone.length > 0 ? "" : "Phone is required"
        if ("County" in initialFieldValues)
            temp.County = initialFieldValues.County.length > 0 ? "" : "County is required"
        if ("Country" in initialFieldValues)
            temp.Country = initialFieldValues.Country.length > 0 ? "" : "Country is required"
        if ("Category" in initialFieldValues)
            temp.Category = initialFieldValues.Category.length > 0 ? "" : "Category is required"
        if ("Password" in initialFieldValues)
            temp.Password = initialFieldValues.Password.length > 5 ? "" : "Password must be longer than 6 characters"
        if ("ConfirmPassword" in initialFieldValues)
            temp.ConfirmPassword = initialFieldValues.ConfirmPassword === values.Password && initialFieldValues.ConfirmPassword.length > 5 ? "" : "Passwords does not match"
        if ("AcceptTerms" in initialFieldValues)
            temp.AcceptTerms = initialFieldValues.AcceptTerms ? "" : "You Must Accept Terms and Conditions"
        setErrors({
            ...temp
        });
        if (initialFieldValues == values)
            return Object.values(temp).every(x => x == "");
    }

    const validate = (initialFieldValues = values) => {

        //console.log("days", days)
        let temp = { ...errors }
        if ("name" in initialFieldValues)
            temp.name = initialFieldValues.name.length > 0 ? "" : "Name is required"
        if ("email" in initialFieldValues)
            temp.email = initialFieldValues.email.length > 0 ? "" : "Email is required"
        if ("phone" in initialFieldValues)
            temp.phone = initialFieldValues.phone.length > 0 ? "" : "Phone is required"
        if ("weekvalue" in initialFieldValues)
            setDaysError(true)
        temp.workdays = days.length > 0 ? "" : "Select at least one day that provider will work every week."
        /* if ("weekvalue" in fieldValues)
            temp.weekvalue = fieldValues.weekvalue.length > 0 ? "" : "Week is required" */
        setErrors({
            ...temp
        });
        if (initialFieldValues == values)
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

    const callbackFunction = (childData) => {

        if (Object.keys(values.weekvalue).length === Object.keys(childData).length) {
            values.weekvalue = childData;
        }
        else {
            for (let i = 0; i < 7; i++) {
                if (values.weekvalue[i] !== undefined && values.weekvalue[i] === childData[i]) {

                    

                }
            }
            setValues({ ...values, weekvalue: { ...values.weekvalue, childData: null } });


        }

    }
    const showForm = () => {
        setEditing(true);
    }
    const hideForm = () => {
        setEditing(false)
        resetForm();
        props.currentId = 0;
        //console.log(props.currentId)
    }

    function isContainedIn(a, b) {
        if (typeof a != typeof b)
            return false;
        if (Array.isArray(a) && Array.isArray(b)) {
            // assuming same order at least
            for (var i = 0, j = 0, la = a.length, lb = b.length; i < la && j < lb; j++)
                if (isContainedIn(a[i], b[j]))
                    i++;
            return i == la;
        } else if (Object(a) === a) {
            for (var p in a)
                if (!(p in b && isContainedIn(a[p], b[p])))
                    return false;
            return true;
        } else
            return a === b;
    }

    return (
        <>
            {editing ?

                <div>
                    {props.currentId !== 0 ? <>
                    {
                        <Grid container>
                        <Grid item xs={12} md={12} style={{minHeight:"300px"}}>
                    {helpers.getProviderImage(props.currentId, props 
                        && props.authentication 
                        && props.authentication.user 
                        && props.authentication.user.id 
                        && props.authentication.user.id, "form relativeposition")}
                        
                            <br />
                            <UploadPage exist={false} class="noCoverImage hidemobile titleOnly" providerId={props.currentId} width={300} height={300}  user={props && props.authentication && props.authentication.user && props.authentication.user.id && props.authentication.user.id} type="providerImage"  text="Add/Change Provider Image"/>

                            </Grid>
                        </Grid>
                            
                        
                            }</> : "Save Provider to upload image"}
                    <form
                        autoComplete="off"
                        noValidate
                        className={classes.root}
                        onSubmit={handleSubmit}
                    >
                    
                    
                            <TextField
                                name="name"
                                variant="outlined"
                                label="Person Name"
                                value={values.name ? values.name : ""}
                                onChange={handleInputChange}
                                {...(errors.name && { error: true, helperText: errors.name })}
                            />
                            {/* <ImageUpload /> */}
                            <TextField
                                name="email"
                                variant="outlined"
                                label="Email"
                                value={values.email ? values.email : ""}
                                onChange={handleInputChange}
                                {...(errors.email && { error: true, helperText: errors.email })}
                            />
                            <TextField
                                name="phone"
                                variant="outlined"
                                label="Phone"
                                value={values.phone ? values.phone : ""}
                                onChange={handleInputChange}
                                {...(errors.phone && { error: true, helperText: errors.phone })}
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
                            <Stack className="daysroot" direction="row" spacing={3}>
                                <ToggleButtonGroup
                                    className="weekdaysselect"
                                    value={days}
                                    onChange={handleDays}
                                    aria-label="day"
                                    {...(errors.workdays && { error: true, helperText: errors.workdays })}
                                >
                                    <ToggleButton value="0" aria-label="left aligned" aria-labelledby="1">
                                        Monday
                                    </ToggleButton>
                                    <ToggleButton value="1" aria-label="aligned" aria-labelledby="2">
                                        Tuesday
                                    </ToggleButton>
                                    <ToggleButton value="2" aria-label="aligned" aria-labelledby="3">
                                        Wednesday
                                    </ToggleButton>
                                    <ToggleButton value="3" aria-label="aligned" aria-labelledby="4">
                                        Thursday
                                    </ToggleButton>
                                    <ToggleButton value="4" aria-label="aligned" aria-labelledby="5">
                                        Friday
                                    </ToggleButton>
                                    <ToggleButton value="5" aria-label="aligned" aria-labelledby="6">
                                        Saturday
                                    </ToggleButton>
                                    <ToggleButton value="6" aria-label="right aligned" aria-labelledby="7">
                                        Sunday
                                    </ToggleButton>
                                </ToggleButtonGroup>
                            </Stack>
                            <div>{errors.workdays && daysError && <p style={{ color: "red" }}>{errors.workdays}</p>}</div>
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
                    
                        <Button
                            className={classes.smMargin}
                            variant="outlined" color="primary"
                            type="submit"
                        >
                            Submit
                        </Button>
                        <Button
                            variant="outlined" color="primary"
                            className={classes.smMargin + " hidemobile"}
                            onClick={resetForm}
                        >
                            Reset
                        </Button>
                        <Button variant="outlined" color="primary" className={classes.smMargin} onClick={hideForm}>Hide Form</Button>
                    </form>
                </div> :

                <Button variant="outlined" color="primary" className={classes.smMargin + " fullWidth buttonBlue"} onClick={showForm}>Add new</Button>

            }
        </>
    )
}

const mapStateToProps = state => ({
    providersList: state.businessProvider.list,
    authentication: state.authentication

});

const mapActionsToProps = {
    fetchProviders: actions.fetchAll,
    createProvider: actions.create,
    updateProvider: actions.update,
    deleteProvider: actions.deleteData,
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(ProvidersForm));