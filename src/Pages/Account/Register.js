import React from 'react';
import { Link } from 'react-router-dom';
//import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import useForm from '../../components/useForm';
import { Grid, InputLabel, Select, MenuItem, withStyles, FormControl, Button, TextField, Paper, Container } from '@material-ui/core';
import Checkbox from '@mui/material/Checkbox';
import { FormLabel } from '@mui/material';
import UploadToServer from '../../components/FormElements/UploadToServer';

import { accountService, alertService } from '../../services';

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
    Password: '',
    ConfirmPassword: '',
    AcceptTerms: true,
};

function Register(history, classes, ...props) {

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ("firstname" in fieldValues)
            temp.firstname = fieldValues.firstname.length > 0 ? "" : "First Name is required"
        if ("lastname" in fieldValues)
            temp.lastname = fieldValues.lastname.length > 0 ? "" : "Last Name is required"
        if ("email" in fieldValues)
            temp.email = fieldValues.email.length > 0 ? "" : "email is required"
        if ("password" in fieldValues)
            temp.password = fieldValues.password.length > 0 ? "" : "password is required"
        if ("repeatpassword" in fieldValues)
            temp.repeatpassword = fieldValues.repeatpassword.length > 0 ? "" : "repeatpassword is required"
        if ("acceptTerms" in fieldValues)
            temp.acceptTerms = fieldValues.acceptTerms ? "" : "Accept Terms is required"
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
        resetForm
    } = useForm(initialFieldValues, validate, props.setCurrentId,)

    /* const validationSchema = Yup.object().shape({
        title: Yup.string()
            .required('Title is required'),
        firstName: Yup.string()
            .required('First Name is required'),
        lastName: Yup.string()
            .required('Last Name is required'),
        email: Yup.string()
            .email('Email is invalid')
            .required('Email is required'),
        password: Yup.string()
            .min(6, 'Password must be at least 6 characters')
            .required('Password is required'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required('Confirm Password is required'),
        acceptTerms: Yup.bool()
            .oneOf([true], 'Accept Terms & Conditions is required')
    });

    function onSubmit(fields, { setStatus, setSubmitting }) {
        setStatus();
        accountService.register(fields)
            .then(() => {
                alertService.success('Registration successful, please check your email for verification instructions', { keepAfterRouteChange: true });
                //history.push('login');
            })
            .catch(error => {
                setSubmitting(false);
                alertService.error(error);
            });
    } */

    const handleSubmit = e => {
        e.preventDefault();
        //values.weekvalue = values.weekvalue ? values.weekvalue : "";
        //console.log("works from register:", values);
        accountService.register(values)
            .then(() => {
                alertService.success('Registration successful, please check your email for verification instructions', { keepAfterRouteChange: true });
                history.push('login');
            })
            .catch(error => {
                alertService.error(error);
            });
        if (validate()) {
            const onSuccess = () => {
                //addToast("Submitted successfully", { appearance: 'success' });
                resetForm();
            }
            /* if (props.currentId == 0) {
                props.createProvider(values, onSuccess);
            }
            else {
                props.updateProvider(props.currentId, values, onSuccess);
            } */
        }
    }
    const callbackFunction = (childData) => {
        values.ProfileImagePath = childData;
    }

    return (
        <Container maxWidth="md">
            <Paper>
                <form onSubmit={handleSubmit} className={classes.root}>
                    <Grid container>
                        <TextField name="BusinessName" label="BusinessName" type="text" variant="outlined" value={values.BusinessName} onChange={handleInputChange} />
                        <TextField name="Email" label="Email" type="text" variant="outlined" value={values.Email} onChange={handleInputChange} />
                        <TextField name="Phone" label="Phone" type="text" value={values.Phone} onChange={handleInputChange} />
                        <TextField name="Description" label="Description" type="text" variant="outlined" value={values.Description} onChange={handleInputChange} />
                        <TextField name="Address1" label="Address1" type="text" variant="outlined" value={values.Address1} onChange={handleInputChange} />
                        <TextField name="Address2" label="Address2" type="text" variant="outlined" value={values.Address2} onChange={handleInputChange} />
                        <TextField name="County" label="County" type="text" variant="outlined" value={values.County} onChange={handleInputChange} />
                        <TextField name="Country" label="Country" type="text" variant="outlined" value={values.Country} onChange={handleInputChange} />
                        <TextField name="Password" label="Password" type="password" variant="outlined" value={values.Password} onChange={handleInputChange} />
                        <TextField name="ConfirmPassword" label="ConfirmPassword" type="password" variant="outlined" value={values.ConfirmPassword} onChange={handleInputChange} />


                        <Checkbox />
                        <FormControl label="Accept Terms & Conditions" variant="outlined" className={classes.formControl} >
                            <FormLabel>Accept Terms & Conditions</FormLabel>
                        </FormControl>



                    </Grid>
                    <Button type="submit"
                        className={classes.smMargin}
                        variant="contained"
                        color="primary"
                    >Register
                    </Button>

                </form >
            </Paper>
        </Container>
    )
}

export default withStyles(styles)(Register);