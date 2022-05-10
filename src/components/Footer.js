import React, { useEffect, useState } from 'react';
import { Grid, Container } from '@material-ui/core';

function Footer() {

    return (
        <Container style={{textAlign:"center",fontSize:"12px",padding:"10px"}} className="fotterBottom secondaryColor" maxWidth={false}>
            Copyright © MyNixer 2022 All Rights Reserved.
        </Container>
    )
}



export default Footer;