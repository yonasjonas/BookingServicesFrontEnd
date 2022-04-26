//import * as React from 'react';
import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';
import { connect } from "react-redux";
import * as convertString from '../../helpers';
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



let allInfo = {};
let localDays = [];
let startTime = null;
let endTime = null;
let isDirty = false;
let notUpdated = true;

function RangeSlider(...props) {

    //const [currentValue, setCurrentValue] = React.useState([0,0]);
    let [currentValue, setCurrentValue] = React.useState([0, 0]);
    let [currentProvider, setCurrentProvider] = React.useState();
    let [currentId, setCurrentId] = React.useState();
    const [days, setDays] = React.useState([]);

    useEffect(() => {


        if ((props[0].currentId !== 0 && currentId !== props[0].currentId) || props[0].currentId === undefined) {
            //console.log("useEffect");
            setCurrentProvider(props[0].providersList && props[0].providersList.filter(i => i.id === props[0].currentId))
            setCurrentId(props[0].currentId);
            retrieveTimesAndDays(props[0].providersList && props[0].providersList.filter(i => i.id === props[0].currentId));


        }
    });

    const retrieveTimesAndDays = (provider) => {


        const weekvalue = convertString.convertStringToObject(provider[0].weekvalue);

        console.log("retrieveTimesAndDays", weekvalue);



        //Object.keys(weekvalue).map(i => {
        updateTimeSlidersOnEdit(weekvalue);
        //})


    }

    const updateTimeSlidersOnEdit = (weekvalue) => {
        
        

        Object.keys(weekvalue).map(i => {
            if (weekvalue[i] && weekvalue[i].dayIndex && weekvalue[i].dayIndex === props[0].day ) {
                
                //console.log(weekvalue[i].dayIndex)
                

                let startTimeValue = null;
                let endTimeValue = null;

                //let startTime = parseInt(weekvalue[i].startTime.substring(0, weekvalue[i].startTime.indexOf(":")));
                //let endTime = parseInt(weekvalue[i].endTime.substring(0, weekvalue[i].endTime.indexOf(":")));
                let startTime = weekvalue[i].startTime;
                let endTime = weekvalue[i].endTime;

                marks.forEach(element => {
                    if (element.label == startTime) {
                        //startTime = element.label;
                        startTimeValue = element.value;
                    }
                    if (element.label == endTime) {
                        //endTime = element.label;
                        endTimeValue = element.value;
                    }
                });

                setCurrentValue([startTimeValue, endTimeValue]);
        
            }
            //console.log(weekvalue[i].dayIndex)
            //console.log(weekvalue[i].startTime)
        
        })

        //setCurrentValue([startTimeValue, endTimeValue]);








        // ????  props[0].parentCallback(allInfo);
        //notUpdated = false;
    }
    const sortDaysHours = (value, day, key) => {

        startTime = null;
        endTime = null;

        if (typeof value[0] === 'number') {

            startTime = value[0];
            endTime = value[1];

            let startTimeValue = null;
            let endTimeValue = null;



            marks.forEach(element => {
                if (element.value == startTime) {
                    startTime = element.label;
                    startTimeValue = element.value;
                }
                if (element.value == endTime) {
                    endTime = element.label;
                    endTimeValue = element.value;
                }
            });

            if (startTime && endTime && day) {
                allInfo[key] = {
                    "dayIndex": day,
                    "startTime": startTime,
                    "endTime": endTime
                }
            }
            setCurrentValue([startTimeValue, endTimeValue]);}
        else {

            if (startTime && endTime && day) {
                allInfo[key] = {
                    "dayIndex": day,
                    "startTime": startTime,
                    "endTime": endTime
                }
            }

            marks.forEach(element => {
                if (element.label == startTime) {
                    startTime = element.value;
                }
                if (element.label == endTime) {
                    endTime = element.value;
                }
            });
            setCurrentValue([startTime, endTime]);
        }
        isDirty = true;
        //console.log("allInfo : ", allInfo);
        props[0].parentCallback(allInfo);
        notUpdated = false;
    }




    return (

        <Box classname="providerformbox" sx={{ width: "90%", margin: "15px" }}>
            <Typography id="input-slider" gutterBottom>
                Hours for {props[0].day}
            </Typography>
            <Slider
                onChange={event => { sortDaysHours(event.target.value, props[0].day, props[0].arrayKey); }
                }
                //onChangeCommitted={incrementParentCounter}
                name={props.key}
                aria-labelledby="track-inverted-range-slider"
                getAriaValueText={valuetext}
                value={currentValue}
                marks={marks}
                step={10}
            />
        </Box>
    );
}



RangeSlider.propTypes = {
    //updateProviderWorkinghours: React.propTypes.func,
};

const mapStateToProps = state => ({
    providersList: state.businessProvider.list,

});

const mapActionsToProps = {
    //updateProviderWorkinghours: actions.addProviderWorkingDays
}

export default connect(mapStateToProps, mapActionsToProps)(RangeSlider); 