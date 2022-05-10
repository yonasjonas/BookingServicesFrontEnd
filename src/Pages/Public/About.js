import React from "react";
import { Paper, Container } from '@material-ui/core';
import { styled } from '@mui/material/styles';
import UploadPage from "../../Components/FormElements/UploadPage";



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
             <img className="heroimage" src="https://nixerwebapi.azurewebsites.net/images/business/49/businessInformationCover.jpg" alt="Image a girl managing booking on the go" />
            <Paper style={{padding:"15px"}}>
                <h1 className="titleOnly secondaryTextColor">About MyNixer </h1>

                <p>MyNixer is a platform that unites freelancers and small businesses that wants to find a new way to advertise their services to a local communities.</p> 
                <p>Via MyNixer you can quickly get bookings from people looking for the services that you or your team are offering.</p>

                <p>It is simple to setup and start getting bookings. <br />
                You will be able to set the times for your service providers or just for yourself which will allow to work only on the times desired.</p>
                <br />
                <p>Be it house clean, massage, tutor lessons or a dog walk or surfing lessons just to name a few. <br/>
                It is easy to start to make money with MyNixer. Whether you are a sole trader or a businesses!</p>
                <strong>If you are offering services for people then you are in the right place!</strong>
                <br />
                <h5>And it is free forever!</h5>

                <p style={{color:"#eb6400",fontWeight:400}}>As per revenue website definition of the word "nixer" means a side job where person received money that was not declared.<br/>
                    MyNixer view is that everyone have to declare their income received for all the nixers. <br/> 
                </p>
        
            </Paper>





        </Container>

    )
}

export default About;