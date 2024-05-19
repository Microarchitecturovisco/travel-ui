import {useLocation} from "react-router-dom";
import {CardMedia, Paper} from "@mui/material";
import React, {useEffect, useState} from "react";
import {ArrowBack, Place} from "@mui/icons-material";
import { useNavigate } from 'react-router-dom';
import {ApiRequests} from "../../core/apiConfig";
import {Location} from "../../core/domain/DomainInterfaces";
import {formatDate} from "../../core/utils";

const OfferDetails = () => {

    const location = useLocation();

    const navigate = useNavigate();

    const [offerDetails, setOfferDetails] = useState({
        idHotel: location.state.idHotel,
        name: location.state.name,
        location: location.state.hotelLocation,
        photoURL: location.state.photoURL
    });

    const fetchOfferDetails = async () => {
        let searchParams = JSON.parse(localStorage.getItem("searchParams") ?? '{}');

        searchParams = {...searchParams,
            idHotel: offerDetails.idHotel,
            departurePlane: searchParams.departurePlane ? searchParams.departurePlane.map((dpt: Location) => dpt.idLocation) : [],
            departureBus: searchParams.departureBus ? searchParams.departureBus.map((dpt: Location) => dpt.idLocation) : [],
            dateFrom: formatDate(searchParams.dateFrom ? new Date(searchParams.dateFrom) : new Date()),
            dateTo: formatDate(searchParams.dateFrom ? new Date(searchParams.dateTo) : new Date()),
        }

        await ApiRequests.getOfferDetails(searchParams)
            .then(response => {
                console.log(response.data);
            })
            .catch(err => {
                console.log(err);
            })
    }

    useEffect(() => {
        fetchOfferDetails().then(r => r);
    }, []);

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
                        image={offerDetails.photoURL ?? require('../../assets/holiday-assets/dahee-son-tMffGE7u1bI-unsplash.jpg')}
                        alt="Ibiza Gwiździny"
                    />
                </Paper>
                <Paper style={{borderRadius: 8}} elevation={2}>
                    <CardMedia
                        component="img"
                        className='rounded-lg pointer-events-none'
                        sx={{width: 480, height: 280}}
                        image={offerDetails.photoURL ?? require('../../assets/holiday-assets/dahee-son-tMffGE7u1bI-unsplash.jpg')}
                        alt="Ibiza Gwiździny"
                    />
                </Paper>
                <Paper style={{borderRadius: 8}} elevation={2}>
                    <CardMedia
                        component="img"
                        className='rounded-lg pointer-events-none'
                        sx={{width: 480, height: 280}}
                        image={offerDetails.photoURL ?? require('../../assets/holiday-assets/dahee-son-tMffGE7u1bI-unsplash.jpg')}
                        alt="Ibiza Gwiździny"
                    />
                </Paper>
            </div>

            <div className='flex flex-col gap-2'>
                <div className='flex flex-row items-center'>
                    <Place style={{fontSize: 18}} className='group-hover:text-gray-700'/>
                    <h4 className='ml-1 group-hover:text-gray-700'>
                        {offerDetails.location ?? ''}
                    </h4>
                </div>
                <h1 className='text-4xl'>{offerDetails.name ?? ''}</h1>
            </div>
        </div>
    );
}

export default OfferDetails;
