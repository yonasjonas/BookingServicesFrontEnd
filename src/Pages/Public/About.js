import React from "react";
import { Paper, Container } from '@material-ui/core';
import { styled } from '@mui/material/styles';
import UploadPage from "../../components/FormElements/UploadPage";



const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#5e535324',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    padding: theme.spacing(2),
}));

const About = () => {
    return (
        <Container maxWidth="lg">
             <img className="heroimage" src="https://nixerwebapi.azurewebsites.net/images/business/1/businessInformationCover.jpg" alt="Image a girl managing booking on the go" />
            <Paper style={{padding:"15px"}}>
                <h1 className="titleOnly secondaryTextColor">About MyNixer </h1>

                <p>Via MyNixer you can quickly get bookings from people looking for the services that you or your team are offering.</p>

                <p>Be it house clean, massage, tutor lessons or a dog walk. It is easy to start to make make money on MyNixer not only for small businesses but for individuals as well!</p>
                
                
                <p>MyNixer is a platform that unites all the people and small businesses who wants to find a new way to advertise their services to a local communities.</p> 
                <p>It is simple to setup and start get bookings. You are able to set the time of service providers which are later used in the booking form. Anyone can do it! </p>
                <p>Once you wil register and finally will login to the account where to be presented with a guide to help you get started</p>
<p>Once you get booking request you can accept it or reject it. You will also have a person phone number and email so you could contact them if needs be</p>
                
                <br /><br />
                We provide a free way for you to setup a business page that will introduce your services and will give you simple facility to get boookings online.


                <br /><br />

                <strong>If you are offering services that are time based than you are in the right place!</strong>
                <br /><br />
                

                <h5>And it is free forever!</h5>

                <p style={{color:"#eb6400",fontWeight:400}}>As per revenue website definition of the word nixer means undeclared money. <br/>
                    As per our view everyone must declare their income and mynixer does not promote it.<br/>
                Name has been chosen to atract people with a catchy name.</p>
        
            </Paper>





        </Container>

    )
}

export default About;