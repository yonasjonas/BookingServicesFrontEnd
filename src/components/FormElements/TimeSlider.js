//import * as React from 'react';
import React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';
import { connect } from "react-redux";
import * as actions from "../../actions/businessProvidersActions";


const marks = [
    {
        value: 0,
        label: '9:00',
    },
    {
        value: 10,
        label: '10:00',
    },
    {
        value: 20,
        label: '11:00',
    },
    {
        value: 30,
        label: '12:00',
    },
    {
        value: 40,
        label: '13:00',
    },
    {
        value: 50,
        label: '14:00',
    },
    {
        value: 60,
        label: '15:00',
    },
    {
        value: 70,
        label: '16:00',
    },
    {
        value: 80,
        label: '17:00',
    },
    {
        value: 90,
        label: '18:00',
    },

    {
        value: 100,
        label: '19:00',
    },
];

function valuetext(value) {
    return `${value}`;
}
const allInfo = {};




const incrementParentCounter = null;


function RangeSlider( ...props ) {

    const sortDaysHours = (value, day) => {
        //console.log({value, day});
        let startTime = value[0];
        let endTime = value[1];

        marks.forEach(element => {
            if (element.value == startTime) {
                startTime = element.label;
            }
            if (element.value == endTime) {
                endTime = element.label;
            }
        });
        //!isNaN(props[0].spkey) ? parseInt(props[0].spkey) : console.log("not a number");

        let dayIndex = 0;

        //console.log("bad code here!!!!!!")
        /* if(!!allInfo){
            if(typeof allInfo === 'string'){
                Object.keys(JSON.parse(allInfo)).map(i => {dayIndex =+ 1})
            }
            else{
                Object.keys(allInfo).map(i => {dayIndex =+ 1 })
            }
        }
 */
        // = allInfo ? allInfo.map(i => { dayIndex =+ 1}) : 0;


        //console.log("not a number: ", dayIndex);
        let daysAsObjectKeys = {};

        if(!!allInfo){
            if(typeof allInfo === 'string'){
                daysAsObjectKeys = Object.keys(JSON.parse(allInfo));
            }
            else{
                daysAsObjectKeys  = Object.keys(allInfo);
            }
            dayIndex = daysAsObjectKeys.length;
            
            /* daysAsObjectKeys.map(i => {
                console.log("boo boom", JSON.parse(allInfo)[i]);
                if (JSON.parse(allInfo)[i].dayIndex !== day){
    
                } 
            }) */
        }

        




        allInfo[dayIndex] = {
            "dayIndex": day,
            "startTime": startTime,
            "endTime": endTime
        }

        props[0].parentCallback(allInfo)
        console.log({allInfo})
    }
    

    return (

        <Box sx={{ width: "60%", margin: "15px" }}>
            <Typography id="input-slider" gutterBottom>
                Hours for {props[0].day}
            </Typography>
            <Slider
                onChange={event => { sortDaysHours(event.target.value, props[0].day); }
                }
                //onChangeCommitted={incrementParentCounter}
                name={props.key}
                aria-labelledby="track-inverted-range-slider"
                getAriaValueText={valuetext}
                defaultValue={[0, 10]}
                marks={marks}
                step={10}
            />
        </Box>
    );
}



RangeSlider.propTypes = {
    //updateProviderWorkinghours: React.propTypes.func,
};

const mapStateToProps = (state) => ({
    workinghours: state.providerWorkingHours,
});

const mapActionsToProps = {
    updateProviderWorkinghours: actions.addProviderWorkingDays
}

export default connect(mapStateToProps, mapActionsToProps)(RangeSlider); 