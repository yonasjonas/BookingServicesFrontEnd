//import * as React from 'react';
import React, { useEffect } from 'react';
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



let allInfo = {};
let localDays = [];
let startTime = null;
let endTime = null;
let isDirty = false;
let notUpdated = true;

function RangeSlider(...props) {

    //const [currentValue, setCurrentValue] = React.useState([0,0]);
    let [currentValue, setCurrentValue] = React.useState([0, 0]);
    const [days, setDays] = React.useState([]);

    useEffect(() => {

        console.log("useEffect");
        localDays = [];


        console.log("currentID", props[0].currentId);

        if (!!allInfo === false) {
            // only perform below if slider wasnt touched on the page already
            if (!isDirty && props[0].daysObject !== '') {
                if (typeof props[0].daysObject === 'object') {
                    allInfo = props && props[0].daysObject !== '' ? props[0].daysObject : {};
                }
                else {
                    allInfo = props && props[0].daysObject !== '' ? JSON.parse(props[0].daysObject) : {};
                }
            }

            if (!!allInfo && allInfo !== "[object Object]") {
                if (typeof allInfo === 'string') {
                    Object.keys(JSON.parse(allInfo)).map(i => {
                        localDays.push(i);
                    })
                }
                else {
                    Object.keys(allInfo).map(i => {
                        i = !isNaN(i) ? parseInt(i) : 0;
                        localDays.push(i);

                        //setCorrectHours(localDays, [startTime, endTime])


                    });
                    //console.log("days to display:<> ", [startTime, endTime]);
                }

            }
        }
        else if (!!allInfo && props[0].currentId > 0 && notUpdated) {


            Object.keys(allInfo).map(i => {
                marks.forEach(element => {
                    if (element.label == allInfo[i].startTime) {
                        startTime = element.value;
                    }
                    if (element.label == allInfo[i].endTime) {
                        endTime = element.value;
                    }
                });
            });

        }
        /* else if (props[0].currentId > 0){
            allInfo = props[0].daysObject;
            if (typeof allInfo === 'string') {
                Object.keys(JSON.parse(allInfo)).map(i => {
                    localDays.push(i);
                })
            }
            else {
                Object.keys(allInfo).map(i => {
                    localDays.push(i);
                    console.log("days to display:> ", allInfo[i]);
                    marks.forEach(element => {
                        if (element.label == allInfo[i].startTime) {
                            startTime = element.value;
                        }
                        if (element.label == allInfo[i].endTime) {
                            endTime = element.value;
                        }
                    });
                });



            }
            if (localDays.length !== days.length) {
                //setDays(localDays);
                setCurrentValue([startTime, endTime]);

            }

        } */
    });

    const setCorrectHours = (localDays, hours) => {
        if (!!localDays) {
            setDays(localDays);
        }
        if (!!hours) {
            setCurrentValue(hours);
        }
        //setDays(localDays);
        //setCurrentValue(prevTimes => ([...prevTimes, hours]));
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
            setCurrentValue([startTimeValue, endTimeValue]);




        }
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
        console.log("allInfo : ", allInfo);
        props[0].parentCallback(allInfo);
        notUpdated = false;
    }




    return (

        <Box sx={{ width: "60%", margin: "15px" }}>
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
    //providersList: state.businessProvider.list,

});

const mapActionsToProps = {
    //updateProviderWorkinghours: actions.addProviderWorkingDays
}

export default connect(mapStateToProps, mapActionsToProps)(RangeSlider); 