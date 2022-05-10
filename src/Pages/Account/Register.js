import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import useForm from '../../components/useForm';
import { Grid, Box, InputLabel, Select, MenuItem, withStyles, Button, TextField, Paper, Container, Typography } from '@material-ui/core';
import Checkbox from '@mui/material/Checkbox';
import { FormLabel } from '@mui/material';
import { CountryDropdown, RegionDropdown, CountryRegionData } from 'react-country-region-selector';
import { accountService } from '../../services';
import { useToasts } from "react-toast-notifications";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

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
        width: "100%",
        margin: "10px"

    },
    MuiGridContainer: {
        padding: "20px",
    },

    selectEmpty: {
        marginTop: theme.spacing(1),
        minWidth: '80%'
    },
    smMargin: {
        margin: theme.spacing(1),
    },
    root: {
        "& .MuiTableCell-head": {
            fontSize: "2.25rem",
            fontWeight: "800!important",
        }
    },
    paper: {
        margin: theme.spacing(2),
        padding: theme.spacing(2),
    }


});

const initialFieldValues = {
    BusinessName: '',
    Email: '',
    Phone: '',
    Description: '',
    Address1: '',
    Address2: '',
    County: '',
    Country: '',
    Category: '',
    Password: '',
    ConfirmPassword: '',
    AcceptTerms: false,
};


function Register(history, classes, ...props) {

    const [country, setCountry] = useState("Ireland");
    const [county, setCounty] = useState("Dublin");
    const [number, setNumber] = useState([]);
    const [acceptTerms, setAcceptTerms] = useState(false);
    const { addToast } = useToasts();

    const [category, setCategory] = useState(null);


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
        if ("Description" in initialFieldValues)
            temp.Description = initialFieldValues.Description.length > 0 ? "Description is required" ? initialFieldValues.Description.length < 600 : "Max description length is 600 characters" : ""
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

    useEffect(() => {
        //redirect to dashboard if user loggedin
        console.log({history})
        history.user.loggedIn && history.history.push('/dashboard');
        if (values.Country === "") setValues({ ...values, Country: "Ireland" });
        if (values.County === "") setValues({ ...values, County: "Dublin" });
        setNumber(arrayOfDublin());
    })

    const {
        values,
        setValues,
        errors,
        weekvalue,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialFieldValues, validate, props.setCurrentId)

    const handleSubmit = e => {
        e.preventDefault();
        if (validate()) {
            accountService.register(values)
                .then(() => {
                    onSuccess();
                })
                .catch(error => {
                    addToast(error, { appearance: 'error', autoDismissTimeout: 1400000, transitionDuration: 2});
                });
            const onSuccess = () => {
                addToast("You have registered successfully. Check your email for verification link to activate your account", { appearance: 'success', autoDismissTimeout: 100000, transitionDuration: 3 });
                resetForm();
                setCountry(null)
                setCountry(null)
                setAcceptTerms(false)

            }
        }
    }

    const arrayOfDublin = () => {
        for (let i = 1; i < 25; i++) {
            number[i] = i;
        }
        return number
    }

    return (
        <Container className="registerform" maxWidth="md">
             <Grid className="titleOnly" container>
            <Typography variant="h4" className={classes.logo}>
                        My <ThumbUpIcon /> nixer
                    </Typography>
                <p>Register and start providing services to your community. <br/><br/><span>It is free!!!</span><br/><br/>You will be able to upload business cover image and business logo after you will register. <br/> <br/>Once you are logged in after registration you will able to add service providers and services and start advertising on our platform! <br/></p><h3>Good luck!</h3>
                    
                </Grid>
            <Paper>
                <form onSubmit={handleSubmit} className={classes.root}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={4}>
                            <TextField
                                name="BusinessName"
                                label="BusinessName"
                                type="text"
                                variant="outlined"
                                value={values.BusinessName ? values.BusinessName : ""}
                                onChange={handleInputChange}
                                {...(errors.BusinessName && { error: true, helperText: errors.BusinessName })}
                            />

                        </Grid>
                        <Grid item xs={12} md={4}>
                            <TextField name="Email" label="Email" type="text" variant="outlined" value={values.Email ? values.Email : ""} onChange={handleInputChange} {...(errors.Email && { error: true, helperText: errors.Email })} />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <TextField name="Phone" label="Phone" type="text" variant="outlined" value={values.Phone ? values.Phone : ""} onChange={handleInputChange} {...(errors.Phone && { error: true, helperText: errors.Phone })} />
                        </Grid>
                        <Grid className="business-category" item xs={12} md={12} {...(errors.Category && { helperText: errors.Category })}>
                            <InputLabel id="simple-select-label">Business Category</InputLabel>
                            <Select

                                className="simple-select-label"
                                id="simple-select"
                                name="Category"
                                value={values.Category ? values.Category : ""}
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
                                value={country ? country : ""}
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
                                country={country}
                                value={county ? county : ""}
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
                                        value={values.Address1 ? values.Address1 : ""}
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
                                value={values.Description ? values.Description : ""}
                                onChange={handleInputChange} />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField name="Password" label="Password" type="password" variant="outlined" value={values.Password ? values.Password : ""} onChange={handleInputChange}
                                {...(errors.Password && { error: true, helperText: errors.Password })} />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField name="ConfirmPassword" label="ConfirmPassword" type="password" variant="outlined" value={values.ConfirmPassword ? values.ConfirmPassword : ""} onChange={handleInputChange}
                                {...(errors.ConfirmPassword && { error: true, helperText: errors.ConfirmPassword })}
                            />
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <Checkbox 
                            className={classes.formControl} 
                            label="AcceptTerms"
                            name="AcceptTerms" 
                            value={values.AcceptTerms ? values.AcceptTerms : false} 
                            //checked={acceptTerms}
                            onChange={handleInputChange} />

                            <FormLabel >Accept Terms & Conditions
                            </FormLabel>
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <>{errors.AcceptTerms && <Box
                                sx={{
                                    marginTop: "-10px",
                                    marginLeft: "15px",
                                    fontSize: "12px",
                                    color: 'red',
                                }}
                            >{errors.AcceptTerms}</Box>}</>
                        </Grid>
                    </Grid>
                    <Button type="submit"
                        className={classes.smMargin + " primaryColor"}
                        variant="outlined"
                        color="primary"
                    fullWidth>Register
                    </Button>

                </form >
                <p>* After registration you will receive a verification email. Please click the link in the email to verify your account. </p>
            </Paper>
        </Container>
    )
}
const mapStateToProps = state => ({
    user: state.authentication
})

export default connect(mapStateToProps)(withStyles(styles)(Register));