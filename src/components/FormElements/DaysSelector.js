import * as React from 'react';
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
        props.func(days);
        console.log({ props });
    };

    return (
        <><Stack direction="row" spacing={3}>
            <ToggleButtonGroup
                value={days}
                onChange={handleDays}
                aria-label="day"
            >
                 <ToggleButton value="1" aria-label="left aligned" aria-labelledby="1">
                    Monday
                </ToggleButton>
                <ToggleButton value="2" aria-label="aligned" aria-labelledby="2">
                    Tuesday
                </ToggleButton>
                <ToggleButton value="3" aria-label="aligned" aria-labelledby="3">
                    Wednesday
                </ToggleButton>
                <ToggleButton value="4" aria-label="aligned" aria-labelledby="4">
                    Thursday
                </ToggleButton>
                <ToggleButton value="5" aria-label="aligned" aria-labelledby="5">
                    Friday
                </ToggleButton>
                <ToggleButton value="6" aria-label="aligned" aria-labelledby="6">
                    Saturday
                </ToggleButton>
                <ToggleButton value="7" aria-label="right aligned" aria-labelledby="7">
                    Sunday
                </ToggleButton>
            </ToggleButtonGroup>
        </Stack>
        </>
    );

}

const mapStateToProps = props => ({
    providerDays: props

});

export default connect(mapStateToProps)(ToggleButtonNotEmpty);