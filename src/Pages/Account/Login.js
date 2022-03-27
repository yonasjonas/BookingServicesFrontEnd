import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { connect } from 'react-redux';
import { userActions } from '../../actions/user.actions';
import useForm from '../../components/useForm';
import { Grid, InputLabel, Select, MenuItem, withStyles, FormControl, Button, TextField, Paper, Container } from '@material-ui/core';

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
    Email: '',
    Password: '',
    isSubmitting: false
};

function LoginPage({ history, classes, location, ...props }) {
    

    useEffect(() => {
        console.log({ props })
    });

    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .email('Email is invalid')
            .required('Email is required'),
        password: Yup.string().required('Password is required')
    });

    function handleSubmit(event) {
        event.preventDefault();
        console.log("handleSubmit: ", event);
        initialFieldValues.isSubmitting = true;
        props.login(values.Email, values.Password);
    }
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

    return (
        <Container maxWidth="md">
            <Paper>
                <form onSubmit={handleSubmit} className={classes.root}>
                    <Grid container>
                        <TextField name="Email" label="Email" type="text" variant="outlined" value={values.Email} onChange={handleInputChange} />
                        <TextField name="Password" label="Password" type="password" variant="outlined" value={values.Password} onChange={handleInputChange} />
                        <div className="form-row">
                            <div className="form-group col">
                               
                                <Link to="register" className="btn btn-link">Register</Link>
                            </div>
                            <div className="form-group col text-right">
                                <Link to="forgot-password" className="btn btn-link pr-0">Forgot Password?</Link>
                            </div>
                        </div>
                    </Grid>
                    <Button type="submit"
                        className={classes.smMargin}
                        variant="contained"
                        color="primary"
                    >Login
                    </Button>

                </form >
            </Paper>
        </Container>

    )
}

const mapStateToProps = state =>  ({
    user: state.authentication,
})

const mapActionsToProps = {
    login: userActions.login,
    logout: userActions.logout
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(LoginPage));