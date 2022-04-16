import React, { useEffect } from 'react';
import { Grid, Container } from '@material-ui/core';




function Footer() {
    //alreadyadded = false
    

    return (
        <Container className="footerAll primaryColor" style={{}} maxWidth={false} container>
            
                    
                    <Grid className="footerTop primaryColor" container spacing={0}>
                        <Grid item xs={12} md={3}>
                            <ul>
                                <li>Terms and Conditions</li>
                                <li>Find Services</li>
                                <li>Register</li>
                                <li>About MyNixer</li>
                            </ul>
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <ul>
                                <li>Terms and Conditions</li>
                                <li>Find Services</li>
                                <li>Register</li>
                                <li>About MyNixer</li>
                            </ul>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            
                        </Grid>
                    </Grid>
                    <Grid style={{textAlign:"center"}}className="fotterBottom secondaryColor">
                        Copyright © MyNixer 2022 All Rights Reserved.
                    </Grid>


        </Container>

    )
}



export default Footer;