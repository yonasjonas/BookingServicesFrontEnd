import React from "react";
import { Paper, Container } from '@material-ui/core';
import { styled } from '@mui/material/styles';


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#5e535324',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const About = () => {
    return (
        <Container maxWidth="lg">
        <Paper><h6>
            MyNixer is a platform that unites all people and small businesses who wants to find a way to advertise their services for a local community
                <br/><br/>
                Be it house clean, massage, tutor lessons or a dog walk. It is easy to start to make make money on MyNixer not only for small businesses but for individuals as well!
                <br/><br/>
                We provide a free way for you to setup a business page that will introduce your services and will gicew ytou simple facility to get boooking online.
            
            
                <br/><br/>
            
                If you are offering a services that that are time based than you are in the right place.
                <br/><br/>
                Via MyNixer will get exposed to people looking for the service that you offering.
        </h6>
        </Paper>



            
            
        </Container>

    )
}

export default About;