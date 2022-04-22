import React, { useEffect, useState } from 'react';
import { Grid, Container } from '@material-ui/core';




function Footer() {
    //alreadyadded = false
    const [innerHeight, setInnerHeight] = useState('relative')

    useEffect(() => {
        if (document.querySelector('#root').offsetHeight - 200 > window.innerHeight ) {
            setInnerHeight("absolute")
            console.log("root height", document.querySelector('#root').offsetHeight, "windows height: ", window.innerHeight)
        }
    })
    return (
        <Container style={{textAlign:"center",fontSize:"12px",padding:"10px",position:`${innerHeight}`,bottom:"0px"}} className="fotterBottom secondaryColor" maxWidth={false}>
            Copyright © MyNixer 2022 All Rights Reserved.
        </Container>
    )
}



export default Footer;