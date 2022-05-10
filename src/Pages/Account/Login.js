import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { userActions } from '../../Actions/user.actions';
import useForm from '../../Components/useForm';
import { Grid, InputLabel, Typography, MenuItem, withStyles, FormControl, Button, TextField, Paper, Container } from '@material-ui/core';
import { useToasts } from "react-toast-notifications";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { accountService, alertService } from '../../Services';

const styles = theme => ({
    root: {
        backgroundColor: '#000',
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
    const { addToast } = useToasts();
    useEffect(() => {
        props.user.loggedIn && history.push('/dashboard');
    });
    function handleSubmit(event) {
        if (validate()) {
            event.preventDefault();
            //console.log("handleSubmit: ", event);
            initialFieldValues.isSubmitting = true;
            //props.login(values.Email, values.Password);
            alreadyadded = false;
            //props.user && !props.user.loggedIn && props && props.alert && props.alert.message && addToast(props.alert.message, { appearance: 'error', autoDismissTimeout: 100000, transitionDuration: 3 });

            //history.push('/dashboard');
            accountService.login(values.Email, values.Password).then(() => {
                addToast('Login Success', { appearance: 'success', autoDismissTimeout: 100000, transitionDuration: 3 });
                history.go('dashboard');
            })
            .catch(error => {
                addToast(props.alert.message, { appearance: 'error', autoDismissTimeout: 100000, transitionDuration: 3 });
            });
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
        <Container className="loginform" maxWidth="sm">
            <Grid className="titleOnly aligncenter" container>
                <Typography variant="h4" className={classes.logo}>
                    My <ThumbUpIcon /> nixer
                </Typography>
                <p>Login to your account and manage your services and bookings</p>
                <div>
                    <p><strong>Demo account:</strong></p>
                    <p><strong>Email: info@webface.ie</strong></p>
                    <p><strong>Passwrod: asddsa</strong></p>
                </div>
            </Grid>
            
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
                        className={classes.smMargin + " primaryColor "}
                        variant="contained"
                        color="primary"
                        fullWidth>
                            Login
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