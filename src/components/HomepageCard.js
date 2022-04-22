import React, { useState, useEffect, useRef } from "react";
import { Grid, Container, Typography, CardMedia, Card, CardContent, Button } from '@material-ui/core';
import { CardActionArea } from '@mui/material';
import ButtonBase from '@material-ui/core/ButtonBase';

const HomepageCards = (props) => {

  return (
    <div>
      <Container>
      <h2 className="primaryTextColor titleOnly">Featured Businesses</h2>
        <Grid container spacing={2}>
          {props.businessInfo && props.businessInfo.map(business => {
            return (
              <Grid item md={3}>
                <Card sx={{ maxWidth: 345 }}>
                <ButtonBase
                onClick={event => { document.location.href = `/single-business/${business.businessId}` }}>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height="140"
                      src={`https://nixerwebapi.azurewebsites.net/images/business/${business.businessId}/businessInformationCover.jpg`}
                      alt={business.businessName}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h6" component="div">
                      {business.businessName}
                      </Typography>
                      <Typography variant="body2" >
                      <div className="pagetitle"><strong style={{fontSize:'9px'}}>12 Reviews 4.7 out of 5 </strong><br/><img src="../../5stars.png" alt="reviews" /></div>
                      </Typography>
                      <Typography variant="body2" >
                        <div><h4>{business.description}</h4></div>
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  </ButtonBase>
                </Card>
              </Grid>
            )
          })}
        </Grid>
      </Container>
    </div>
  );
}


export default HomepageCards;