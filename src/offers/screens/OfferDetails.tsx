import {useLocation} from "react-router-dom";
import {CardMedia, Paper} from "@mui/material";
import React from "react";
import {ArrowBack, Place} from "@mui/icons-material";
import { useNavigate } from 'react-router-dom';

const OfferDetails = () => {

    const location = useLocation();
    const {name, hotelLocation, rating, pricePerPerson, photoURL} =
        location.state || {name: null, hotelLocation: null, rating: null, pricePerPerson: null, photoURL: null};

    const navigate = useNavigate();

    return(
        <div className='flex flex-col py-16 px-48 justify-center'>
            <div className='flex flex-row items-center mb-6 hover:text-gray-700 hover:cursor-pointer' onClick={() => navigate(-1)}>
                <ArrowBack style={{fontSize: 20}}/>
                <p className='ml-1'>Back to offers</p>
            </div>
            <div className='flex flex-row items-center justify-between mb-8'>
                <Paper style={{borderRadius: 8}} elevation={2}>
                    <CardMedia
                        component="img"
                        className='rounded-lg pointer-events-none'
                        sx={{width: 480, height: 280}}
                        image={photoURL ?? require('../../assets/holiday-assets/dahee-son-tMffGE7u1bI-unsplash.jpg')}
                        alt="Ibiza Gwiździny"
                    />
                </Paper>
                <Paper style={{borderRadius: 8}} elevation={2}>
                    <CardMedia
                        component="img"
                        className='rounded-lg pointer-events-none'
                        sx={{width: 480, height: 280}}
                        image={photoURL ?? require('../../assets/holiday-assets/dahee-son-tMffGE7u1bI-unsplash.jpg')}
                        alt="Ibiza Gwiździny"
                    />
                </Paper>
                <Paper style={{borderRadius: 8}} elevation={2}>
                    <CardMedia
                        component="img"
                        className='rounded-lg pointer-events-none'
                        sx={{width: 480, height: 280}}
                        image={photoURL ?? require('../../assets/holiday-assets/dahee-son-tMffGE7u1bI-unsplash.jpg')}
                        alt="Ibiza Gwiździny"
                    />
                </Paper>
            </div>

            <div className='flex flex-col gap-2'>
                <div className='flex flex-row items-center'>
                    <Place style={{fontSize: 18}} className='group-hover:text-gray-700'/>
                    <h4 className='ml-1 group-hover:text-gray-700'>
                        {hotelLocation}
                    </h4>
                </div>
                <h1 className='text-4xl'>{name}</h1>
            </div>
        </div>
    );
}

export default OfferDetails;
