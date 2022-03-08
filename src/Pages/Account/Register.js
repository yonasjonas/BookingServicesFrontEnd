import React from 'react';
import { Link } from 'react-router-dom';
//import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import useForm from '../../useForm';
import { Grid, InputLabel, Select, MenuItem, withStyles, FormControl, Button, TextField, Paper, Container } from '@material-ui/core';
import Checkbox from '@mui/material/Checkbox';
import { FormLabel } from '@mui/material';

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

function Register(classes) {

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
        resetForm
    } = useForm(initialFieldValues, validate, props.setCurrentId,)


    const initialFieldValues = {
        title: '',
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        acceptTerms: false
    };

    const validationSchema = Yup.object().shape({
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
    }

    return (
        <Container maxWidth="md">
            <Paper>
                <form onSubmit={onSubmit} className={classes.root}>
                    <Grid container>
                        <Select
                            name="title"
                            variant="outlined"
                            MenuProps={MenuProps}
                        >
                            <MenuItem value=""></MenuItem>
                            <MenuItem value="Mr">Mr</MenuItem>
                            <MenuItem value="Mrs">Mrs</MenuItem>
                            <MenuItem value="Miss">Miss</MenuItem>
                            <MenuItem value="Ms">Ms</MenuItem>
                        </Select>
                        <TextField
                            name="firstName"
                            variant="outlined"
                            label="First Name"
                            value=
                        />
                        <TextField
                            name="lastName"
                            variant="outlined"
                            label="Last Name"
                        />
                        <TextField
                            name="email"
                            variant="outlined"
                            label="Email Address"
                        />
                        <TextField
                            name="password"
                            variant="outlined"
                            label="Password"
                        />
                        <TextField
                            name="confirmPassword"
                            variant="outlined"
                            label="Confirm Password"
                        />
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