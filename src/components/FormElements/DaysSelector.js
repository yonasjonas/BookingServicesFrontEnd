
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Stack from '@mui/material/Stack';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
//import TimeSlider from "../FormElements/TimeSlider";




function ToggleButtonNotEmpty(props) {
    const [days, setDays] = React.useState(() => []);
    
    const handleDays = (event, newDays) => {
        if (newDays.length) {
            setDays(newDays);
        }
        
    };
    useEffect(() => {
        setDays(days);
        //console.log({ days });
    }, [days]);

    return (
        <><Stack direction="row" spacing={3}>
            <ToggleButtonGroup
                value={days}
                onChange={handleDays}
                aria-label="day"
            >
                
                
            </ToggleButtonGroup>
        </Stack>
        </>
    );

}

const mapStateToProps = props => ({
    providerDays: props

});

export default connect(mapStateToProps)(ToggleButtonNotEmpty);