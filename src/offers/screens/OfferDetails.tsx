import {useLocation} from "react-router-dom";
import {Button, CardMedia, Paper} from "@mui/material";
import React, {useEffect, useState} from "react";
import {ArrowBack, Bookmark, Close, Place} from "@mui/icons-material";
import { useNavigate } from 'react-router-dom';
import {ApiRequests} from "../../core/apiConfig";
import {CateringOption, Location, Offer, Room, Transport} from "../../core/domain/DomainInterfaces";
import {formatDate} from "../../core/utils";
import LoginIcon from "@mui/icons-material/Login";

const OfferDetails = () => {

    const location = useLocation();

    const navigate = useNavigate();

    const [offerDetails, setOfferDetails] = useState<Offer>({
        idOffer: location.state.idHotel,
        hotelName: location.state.hotelName,
        description: '',
        price: 0.0,
        destination: {idLocation: '', region: '', country: ''},
        imageUrls: [],

        roomConfiguration: [],
        possibleRoomConfigurations: [[]],

        cateringOption: [],

        departure: {idTransport: '', departureDate: new Date(), capacity: 0, pricePerAdult: 0,
            course: {idTransportCourse: '', type: 'PLANE', arrivalTo: {idLocation: '', region: '', country: ''}, departureFrom: {idLocation: '', region: '', country: ''}}},
        possibleTransports: [],
    });

    const fetchOfferDetails = async () => {
        let searchParams = JSON.parse(localStorage.getItem("searchParams") ?? '{}');

        searchParams = {...searchParams,
            idHotel: offerDetails.idOffer,
            departurePlane: searchParams.departurePlane ? searchParams.departurePlane.map((dpt: Location) => dpt.idLocation) : [],
            departureBus: searchParams.departureBus ? searchParams.departureBus.map((dpt: Location) => dpt.idLocation) : [],
            dateFrom: formatDate(searchParams.dateFrom ? new Date(searchParams.dateFrom) : new Date()),
            dateTo: formatDate(searchParams.dateFrom ? new Date(searchParams.dateTo) : new Date()),
        }

        await ApiRequests.getOfferDetails(searchParams)
            .then(response => {
                setOfferDetails(response.data);
            })
            .catch(err => {
                console.log(err);
            })
    }

    useEffect(() => {
        fetchOfferDetails().then(r => r);
    }, []);

    useEffect(() => {
        console.log(offerDetails);
    }, [offerDetails]);

    return(
        <div className='flex flex-row justify-around px-96'>
            <div className='flex flex-1 flex-col py-16 justify-center'>
                <div className='flex flex-row items-center mb-6 hover:text-gray-700 hover:cursor-pointer'
                     onClick={() => navigate(-1)}>
                    <ArrowBack style={{fontSize: 20}}/>
                    <p className='ml-1'>Back to offers</p>
                </div>
                <div className='flex flex-row items-center justify-between mb-8'>
                    <Paper style={{borderRadius: 8}} elevation={2}>
                        <CardMedia
                            component="img"
                            className='rounded-lg pointer-events-none'
                            sx={{width: 720, height: 360}}
                            image={offerDetails.imageUrls ? offerDetails.imageUrls.at(0) : ''}
                        />
                    </Paper>
                </div>

                <div className='flex flex-col gap-2'>
                    <div className='flex flex-row items-center'>
                        <Place style={{fontSize: 18}} className='group-hover:text-gray-700'/>
                        <h4 className='ml-1 group-hover:text-gray-700'>
                            {offerDetails.destination.country + ', ' + offerDetails.destination.region ?? ''}
                        </h4>
                    </div>
                    <h1 className='text-4xl'>{offerDetails.hotelName ?? ''}</h1>
                </div>
            </div>
            <div className='flex sticky px-8 bg-amber-50'>
                <p>test</p>

                <div>
                    <Button variant='contained' startIcon={<Bookmark/>}>
                        Book and buy offer
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default OfferDetails;
