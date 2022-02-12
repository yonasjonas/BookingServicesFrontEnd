import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';


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

function sortDaysHours(value, day) {

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

    allInfo = {
        startTime,
        endTime,
        day
    }
    return allInfo;
}/* 

function sendInfo() {
    const day =  allInfo;
    return day;   
} */

const onTrigger = (event) => {
    this.props.parentCallback(event.target.myname.value);
    event.preventDefault();
}

export default function RangeSlider(props) {
    const [day, setDays] = React.useState();

    //this.props.sendData(allInfo);    

    return (


        <Box sx={{ width: "60%", margin: "15px" }}>
            <Typography id="input-slider" gutterBottom>
                Hours for {props.day}
            </Typography>
            <Slider

                track="inverted"
                onChange={event =>
                    
                    {sortDaysHours(event.target.value, props.day); props.sendData(allInfo);}            
                }
                //onChangeCommitted={value => console.log({value})}
                name={props.key}
                aria-labelledby="track-inverted-range-slider"
                getAriaValueText={valuetext}
                defaultValue={[0, 100]}
                marks={marks}
                step={10}
            />
        </Box>
    );
}