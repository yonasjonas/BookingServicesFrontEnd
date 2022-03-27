import * as React from 'react';
import Box from '@mui/material/Box';


export default function ProfileImage(props) {

    return (
        <>
            <Box className="profileLogo">
                <img src={props.image} alt="logo" />
            </Box>
        </>
    );
}