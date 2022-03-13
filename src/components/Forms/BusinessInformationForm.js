import * as actions from "../../actions/businessInformation";
import { connect } from "react-redux";
import React, { useState, useEffect } from "react";
import { Grid, InputLabel, Select, MenuItem, withStyles, FormControl, Button, TextField, Divider } from '@material-ui/core';
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
import { accountService, alertService } from '../../services';
import Checkbox from '@mui/material/Checkbox';
import { FormLabel } from '@mui/material';



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

    const user = accountService.userValue;
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

    const updateAfterSave = () => {
        initialFieldValues.BusinessName = props.BusinessInformation.item[0].businessName;
        initialFieldValues.Email = props.BusinessInformation.item[0].email;
        initialFieldValues.Phone = props.BusinessInformation.item[0].phone;
        initialFieldValues.Description = props.BusinessInformation.item[0].description;
        initialFieldValues.Address1 = props.BusinessInformation.item[0].address1;
        initialFieldValues.Address2 = props.BusinessInformation.item[0].address2;
        initialFieldValues.County = props.BusinessInformation.item[0].county;
        initialFieldValues.Country = props.BusinessInformation.item[0].country;
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
            if (user) props.updateBusinessInfo(user.id, values, onSuccess);
        }
    }
    


    useEffect(() => {
        props.fetchBusinessInfo(user.id);
        console.log({ props });
        //onLoadPlease();
        updateAfterSave();
        
    }, [user.id])

    const onLoadPlease = () => {
        let interval = setInterval(() => {
            if (props.BusinessInformation.item && props.BusinessInformation.item.length > 0){
                updateAfterSave();
                console.log("updated");
                clearInterval(interval);
        }
        }, 1000);
    }

    

    



    /* if (props.currentId !== 0) {
        console.log()
        let days = [];
        let temp = props.providersList.find(x => x.id == props.currentId);
        if (!!temp.weekvalue && temp.weekvalue !== "[object Object]") {
            if (typeof temp.weekvalue === 'string') {
                Object.keys(JSON.parse(temp.weekvalue)).map(i => {
                    console.log("inside : ", i);
                    days.push(i);
                })
            }
            else {
                Object.keys(temp.weekvalue).map(i => { console.log("showDays : ", i) })
            }
        }
        setDays(days);
        setValues({
            ...temp
        })
        
        setErrors({})
     */



    return (
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
    BusinessInformation: state.businessInformation
});

//console.log({ mapStateToProps });

const mapActionsToProps = {
    fetchBusinessInfo: actions.fetchById,
    updateBusinessInfo: actions.update
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(BusinessInformationForm));