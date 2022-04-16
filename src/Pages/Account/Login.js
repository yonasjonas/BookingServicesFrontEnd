import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { userActions } from '../../actions/user.actions';
import useForm from '../../components/useForm';
import { Grid, InputLabel, Select, MenuItem, withStyles, FormControl, Button, TextField, Paper, Container } from '@material-ui/core';
import { useToasts } from "react-toast-notifications";
import { accountService, alertService } from '../../services';


const styles = theme => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            backgroundColor: '#000',
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
let alreadyadded = false

function LoginPage({ history, classes, location, ...props }) {
    //alreadyadded = false
    const { addToast } = useToasts();
    useEffect(() => {
        !alreadyadded && props.alert && props.alert.message && 
            addToast(props.alert.message, { appearance: 'error' });
            alreadyadded = true;
    });
    function handleSubmit(event) {
        if (validate()) {
            event.preventDefault();
            console.log("handleSubmit: ", event);
            initialFieldValues.isSubmitting = true;
            props.login(values.Email, values.Password);
            alreadyadded = false;
            history.push('/');
            /* accountService.login(values.Email, values.Password).then(() => {
                alertService.success('Login Success', { keepAfterRouteChange: true });
                history.push('dashboard');
            })
            .catch(error => {
                alertService.error(error);
            }); */
        }
        
    }
    const validate = (initialFieldValues = values) => {
        let temp = { ...errors }

        if ("Email" in initialFieldValues)
            temp.Email = initialFieldValues.Email.length > 0 ? "" : "Email is required"
        if ("Password" in initialFieldValues)
            temp.Password = initialFieldValues.Password.length > 0 ? "" : "Password is required"

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
    } = useForm(initialFieldValues, validate, props.setCurrentId,)

    return (
        <Container maxWidth="sm">
            <Paper>
                {location.pathname === '/register' && location.state && <h2>{location.state}</h2>}
                <form onSubmit={handleSubmit} className={classes.root}>
                    <Grid container>
                        <TextField name="Email" label="Email" type="text" variant="outlined" value={values.Email}
                            onChange={handleInputChange}
                            {...(errors.Email && { error: true, helperText: errors.Email })} />
                        <TextField name="Password" label="Password" type="password" variant="outlined" value={values.Password}
                            onChange={handleInputChange}
                            {...(errors.Password && { error: true, helperText: errors.Password })}
                        />
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
                        className={classes.smMargin + " secondaryColor"}
                        variant="contained"
                        color="primary"
                    >Login
                    </Button>

                </form >
            </Paper>
        </Container>

    )
}

const mapStateToProps = state => ({
    user: state.authentication,
    alert: state.alert
})

const mapActionsToProps = {
    login: userActions.login,
    logout: userActions.logout
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(LoginPage));