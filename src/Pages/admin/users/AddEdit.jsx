import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { accountService, alertService } from '@/_services';

function AddEdit({ history, match }) {
    const { id } = match.params;
    const isAddMode = !id;

    const initialValues = {
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
        role: Yup.string()
            .required('Role is required'),
        password: Yup.string()
            .concat(isAddMode ? Yup.string().required('Password is required') : null)
            .min(6, 'Password must be at least 6 characters'),
        confirmPassword: Yup.string()
            .when('password', (password, schema) => {
                if (password) return schema.required('Confirm Password is required');
            })
            .oneOf([Yup.ref('password')], 'Passwords must match')
    });

    function onSubmit(fields, { setStatus, setSubmitting }) {
        setStatus();
        if (isAddMode) {
            createUser(fields, setSubmitting);
        } else {
            updateUser(id, fields, setSubmitting);
        }
    }

    function createUser(fields, setSubmitting) {
        accountService.create(fields)
            .then(() => {
                alertService.success('User added successfully', { keepAfterRouteChange: true });
                history.push('.');
            })
            .catch(error => {
                setSubmitting(false);
                alertService.error(error);
            });
    }

    function updateUser(id, fields, setSubmitting) {
        accountService.update(id, fields)
            .then(() => {
                alertService.success('Update successful', { keepAfterRouteChange: true });
                history.push('..');
            })
            .catch(error => {
                setSubmitting(false);
                alertService.error(error);
            });
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
    );
}

export { AddEdit };