import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function HeroImage() {
    return (
        <CardMedia
                component="img"
                alt="business cover image"
                image="business1.png"
        />        
    );
}