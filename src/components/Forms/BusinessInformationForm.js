import * as actions from "../../actions/businessInformation";
import * as businessActions from "../../actions/businesses";
import { connect } from "react-redux";
import React, { useState, useEffect } from "react";
import { Grid, Box, InputLabel, Select, MenuItem, withStyles, Button, TextField, Paper, Container } from '@material-ui/core';
import Checkbox from '@mui/material/Checkbox';
import { FormLabel } from '@mui/material';
import useForm from '../useForm';
import { useToasts } from "react-toast-notifications";
import "react-datetime/css/react-datetime.css";
import { CountryDropdown, RegionDropdown, CountryRegionData } from 'react-country-region-selector';




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
    BusinessName: '',
    Email: '',
    Phone: '',
    Description: '',
    Address1: '',
    Address2: '',
    County: '',
    Category: '',
    Country: '',
    Password: '',
    ConfirmPassword: '',
    AcceptTerms: true,
};



const BusinessInformationForm = ({ classes, ...props}) => {
    const [businessInformation, setBusinessInformation] = useState(null);

    const [number, setNumber] = useState([]);
    //console.log({ user });

    const [currentId, setCurrentId] = useState(0);
    const [country, setCountry] = useState();
    const [county, setCounty] = useState();

    //console.log({ props });
    const [days, setDays] = useState(() => []);
    const handleDays = (event, newDays) => {

        if (newDays.length) {
            setDays(newDays);
        }
        //console.log({ days });
    };

    const { addToast } = useToasts();
    var daysSelected = [];
    //const state = this.state;

    const validate = (initialFieldValues = values) => {
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
        
        if ("ConfirmPassword" in initialFieldValues && "Password" in initialFieldValues)
            temp.ConfirmPassword = initialFieldValues.ConfirmPassword === values.Password ? "" : "Passwords does not match"
        if ("AcceptTerms" in initialFieldValues)
            temp.AcceptTerms = initialFieldValues.AcceptTerms ? "" : "You Must Accept Terms and Conditions"
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
        resetForm
    } = useForm(initialFieldValues, validate, props.setCurrentId)

    let alreadyExists = false;

    const updateAfterSave = () => {
        if (props && props.businessInformation.length > 0) {
            initialFieldValues.BusinessName = props.businessInformation[0].businessName;
            initialFieldValues.Email = props.businessInformation[0].email;
            initialFieldValues.Phone = props.businessInformation[0].phone;
            initialFieldValues.Description = props.businessInformation[0].description;
            initialFieldValues.Address1 = props.businessInformation[0].address1;
            initialFieldValues.Address2 = props.businessInformation[0].address2;
            initialFieldValues.County = props.businessInformation[0].county;
            initialFieldValues.Country = props.businessInformation[0].country;
            initialFieldValues.Category = props.businessInformation[0].category;
            alreadyExists = true;
        }
    }

    const handleSubmit = e => {
        e.preventDefault();
        //console.log("works:", values);
        if (validate()) {
            const onSuccess = () => {
                addToast("Submitted successfully", { appearance: 'success' });
                //resetForm();
                //updateAfterSave();
            }
            if (businessInformation && !alreadyExists) props.updateBusinessInfo(props.user.id, values, onSuccess);
        }
    }
    const arrayOfDublin = () => {

        for (let i = 1; i < 25; i++) {
            number[i] = i;
        }
        return number
    }
    useEffect(() => {

        props.fetchBusinessInfo(2);

        
        //if (values.Country == "") setValues({ ...values, Country: "Ireland" });
        //if (values.County == "") setValues({ ...values, County: "Dublin" });
        setNumber(arrayOfDublin());
        if (props){
            if (props.businessInformation.length > 0) {
                setBusinessInformation(props.businessInformation[0])
                setValues({                    
                    BusinessName: props.businessInformation[0].businessName,
                    Email: props.businessInformation[0].email,
                    Phone: props.businessInformation[0].phone,
                    Description: props.businessInformation[0].description,
                    Address1: props.businessInformation[0].address1,
                    Address2: props.businessInformation[0].address2,
                    County: props.businessInformation[0].county,
                    Country: props.businessInformation[0].country,
                    Category: props.businessInformation[0].category,
                });
                setCountry(props.businessInformation[0].country);
                setCounty(props.businessInformation[0].county);
            }

            if (props.businessInformation.length > 0 && !alreadyExists) updateAfterSave();
        }
        

        //abortController.abort();

    }, [props.user.id])

    return (
        <>
          
            <form onSubmit={handleSubmit} className={classes.root}>
            <Container maxWidth="lg">
            {props && props.businessInformation && props.businessInformation.length > 0  &&
                <Paper>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={4}>
                            <TextField
                                name="BusinessName"
                                label="BusinessName"
                                type="text"
                                variant="outlined"
                                value={values.BusinessName ? values.BusinessName : props.businessInformation[0].businessName}
                                onChange={handleInputChange}
                                {...(errors.BusinessName && { error: true, helperText: errors.BusinessName })}
                            />

                        </Grid>
                        <Grid item xs={12} md={4}>
                            <TextField name="Email" label="Email" type="text" variant="outlined" value={values.Email ? values.Email : props.businessInformation[0].email} onChange={handleInputChange} {...(errors.Email && { error: true, helperText: errors.Email })} />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <TextField name="Phone" label="Phone" type="text" variant="outlined" value={values.Phone ? values.Phone : props.businessInformation[0].phone} onChange={handleInputChange} {...(errors.Phone && { error: true, helperText: errors.Phone })} />
                        </Grid>
                        <Grid className="business-category" item xs={12} md={12} {...(errors.Category && { helperText: errors.Category })}>
                            <InputLabel id="simple-select-label">Business Category</InputLabel>
                            <Select

                                className="simple-select-label"
                                id="simple-select"
                                name="Category"
                                value={values.Category ? values.Category : props.businessInformation[0].category}
                                type="text"
                                variant="outlined"
                                label="Category"
                                displayEmpty
                                onChange={handleInputChange}
                                renderValue={(selected) => {
                                    if (selected && selected.length === 0) {
                                        return <em>Select Business Type</em>;
                                    }
                                    return selected;
                                }}
                                {...(errors.Category && { error: true, helperText: errors.Category })}


                            >
                                <MenuItem disabled value="">
                                    <em>Select Business Type</em>
                                </MenuItem>
                                <MenuItem value="beauty">All Beauty Services</MenuItem>
                                <MenuItem value="Handyman">Handyman / Construction</MenuItem>
                                <MenuItem value="Personal Trainer">Personal Trainer</MenuItem>
                                <MenuItem value="Driving Instructor">Driving Instructor</MenuItem>
                                <MenuItem value="Massage">Massage</MenuItem>
                                <MenuItem value="Consulting">Consulting</MenuItem>
                                <MenuItem value="Cleaning">Cleaning</MenuItem>
                                <MenuItem value="Household">Household</MenuItem>
                                <MenuItem value="Pet Services">Pet Services</MenuItem>
                                <MenuItem value="Tutoring Lessons">Tutoring Lessons</MenuItem>
                                <MenuItem value="Child Minding">Child Minding</MenuItem>
                                <MenuItem value="Child Minding">IT Services</MenuItem>
                                <MenuItem value="Other Classes">Other Classes</MenuItem>

                            </Select>

                        </Grid>

                        <Grid item xs={12} md={4}>
                            <InputLabel id="simple-select-label">Country</InputLabel>
                            <CountryDropdown
                                className="countryDropdown"
                                type="text"
                                name="Country"
                                variant="outlined"
                                value={country ? country : props.businessInformation[0].country}
                                onChange={setCountry}
                                {...(errors.Country && { error: true, helperText: errors.Country })}
                            />

                        </Grid>
                        <Grid item xs={12} md={4}>
                            <InputLabel id="simple-select-label">County</InputLabel>
                            <RegionDropdown
                                className="countyDropdown"
                                type="text"
                                name="County"
                                variant="outlined"
                                country={country ? country : props.businessInformation[0].country}
                                value={county ? county : props.businessInformation[0].county}
                                onChange={setCounty}
                                {...(errors.County && { error: true, helperText: errors.County })} />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            {county && country && county === 'Dublin' &&


                                <>
                                    <InputLabel id="simple-select-label">Select Area</InputLabel>

                                    <Select
                                        className="selectdublinarea"
                                        id="simple-select"
                                        name="Address1"
                                        value={values.Address1 ? values.Address1 : props.businessInformation[0].address1}
                                        type="text"
                                        variant="outlined"
                                        displayEmpty
                                        label="Category"
                                        renderValue={(selected) => {
                                            if (selected && selected.length === 0) {
                                                return <em>Select Dublin Area</em>;
                                            }
                                            return selected;
                                        }}
                                        onChange={handleInputChange}
                                    >
                                        <MenuItem disabled value="">
                                            <em>Select Dublin Number</em>
                                        </MenuItem>
                                        {number.length > 0 && number.map(number => {
                                            return <MenuItem key={number} value={"Dublin " + number}>Dublin {number}</MenuItem>
                                        })}
                                    </Select>



                                </>}
                        </Grid>
                        <Grid

                            item xs={12} md={12}>
                            <TextField
                                className="descriptionregister"
                                multiline
                                minRows={4}
                                maxRows={4}
                                name="Description"
                                label="Description"
                                type="text"
                                variant="outlined"
                                value={values.Description ? values.Description : props.businessInformation[0].description}
                                onChange={handleInputChange} />
                        </Grid>
                        <InputLabel id="simple-select-label">Change Password</InputLabel>
                        <Grid item xs={12} md={6}>
                            <TextField name="Password" label="Password" type="password" variant="outlined" value={values.Password ? values.Password : ""} onChange={handleInputChange}
                                {...(errors.Password && { error: true, helperText: errors.Password })} />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField name="ConfirmPassword" label="ConfirmPassword" type="password" variant="outlined" value={values.ConfirmPassword ? values.ConfirmPassword : ""} onChange={handleInputChange}
                                {...(errors.ConfirmPassword && { error: true, helperText: errors.ConfirmPassword })}
                            />
                        </Grid>


                    </Grid>
                    <Button type="submit"
                        className={classes.smMargin}
                        variant="contained"
                        color="primary"
                    >Register
                    </Button>
                </Paper>}
            </Container>
        </form >
        </>
    )
}
const mapStateToProps = state => ({
    user: state.authentication.user,
    businessInformation: state.businesses.list

});
const mapActionsToProps = {
    fetchBusinessInfo: businessActions.fetchById,
    updateBusinessInfo: actions.update
}
export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(BusinessInformationForm));