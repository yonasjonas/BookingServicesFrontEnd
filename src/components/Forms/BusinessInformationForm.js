import * as actions from "../../actions/businessInformation";
import { connect } from "react-redux";
import React, { useState, useEffect } from "react";
import { Grid, InputLabel, Select, MenuItem, withStyles, FormControl, Button, TextField, Divider } from '@material-ui/core';
import useForm from '../useForm';
import { useToasts } from "react-toast-notifications";
import "react-datetime/css/react-datetime.css";
import FileUpload from '../FormElements/FileUpload';
import Box from '@mui/material/Box';





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
    Country: '',
    Password: '',
    ConfirmPassword: '',
    AcceptTerms: true,
};



const BusinessInformationForm = ({ classes, ...props }) => {

    const user = JSON.parse(localStorage.getItem('user'))
    const [businessInformation, setBusinessInformation] = useState(initialFieldValues);
    //console.log({ user });

    const [currentId, setCurrentId] = useState(0);

    console.log({ props });
    const [days, setDays] = useState(() => []);
    const handleDays = (event, newDays) => {

        if (newDays.length) {
            setDays(newDays);
        }
        console.log({ days });
    };

    const { addToast } = useToasts();
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
    } = useForm(initialFieldValues, validate, props.setCurrentId)

    let alreadyExists = false;

    const updateAfterSave = () => {
        initialFieldValues.BusinessName = user.businessName;
        initialFieldValues.Email = user.email;
        initialFieldValues.Phone = user.phone;
        initialFieldValues.Description = user.description;
        initialFieldValues.Address1 = user.address1;
        initialFieldValues.Address2 = user.address2;
        initialFieldValues.County = user.county;
        initialFieldValues.Country = user.country;
        alreadyExists = true;

    }

    const handleSubmit = e => {
        e.preventDefault();
        console.log("works:", values);
        if (validate()) {
            const onSuccess = () => {
                addToast("Submitted successfully", { appearance: 'success' });
                //resetForm();
                //updateAfterSave();
            }
            if (user && !alreadyExists) props.updateBusinessInfo(user.id, values, onSuccess);
        }
    }
    useEffect(() => {
        if (props) {
            props.fetchBusinessInfo(user.id);
            console.log("fetchBusinessInfo: ", { props });
            //onLoadPlease();
            if (user && !alreadyExists) updateAfterSave();
        }
        else {
            console.log("no props")
        }

    }, [user.id])

    const onLoadPlease = () => {
        let interval = setInterval(() => {
            if (user) {
                //updateAfterSave();
                console.log("updated");
                clearInterval(interval);
            }
        }, 1000);
    }
    return (
        <form onSubmit={handleSubmit} className={classes.root}>
            <Grid container>
                {1 == 1 && <>
                <h2> Upload Business Logo    </h2>
                <p><FileUpload /></p>
                <Box className="profileLogo">
                    <img src="logo192.png" alt="logo" />
                </Box>
                </>}
                <TextField name="BusinessName" label="BusinessName" type="text" variant="outlined" value={values.BusinessName} onChange={handleInputChange} />
                <TextField name="Email" label="Email" type="text" variant="outlined" value={values.Email} onChange={handleInputChange} />
                <TextField name="Phone" label="Phone" type="text" value={values.Phone} onChange={handleInputChange} />
                <TextField name="Description" label="Description" type="text" variant="outlined" value={values.Description} onChange={handleInputChange} />
                <TextField name="Address1" label="Address1" type="text" variant="outlined" value={values.Address1} onChange={handleInputChange} />
                <TextField name="Address2" label="Address2" type="text" variant="outlined" value={values.Address2} onChange={handleInputChange} />
                <TextField name="County" label="County" type="text" variant="outlined" value={values.County} onChange={handleInputChange} />
                <TextField name="Country" label="Country" type="text" variant="outlined" value={values.Country} onChange={handleInputChange} />
            </Grid>
            <Button type="submit"
                className={classes.smMargin}
                variant="contained"
                color="primary"
            >Update
            </Button>

        </form >
    )
}
const mapStateToProps = state => ({
    BusinessInformation: state.businessInformation,

});
const mapActionsToProps = {
    fetchBusinessInfo: actions.fetchById,
    updateBusinessInfo: actions.update
}
export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(BusinessInformationForm));