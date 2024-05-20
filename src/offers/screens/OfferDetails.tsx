import {Link, useLocation} from "react-router-dom";
import {Box, Button, CardMedia, Checkbox, FormControlLabel, IconButton, Paper, Typography} from "@mui/material";
import React, {useEffect, useState} from "react";
import {Add, ArrowBack, Bookmark, Close, DirectionsBus, Flight, Lens, Place, Remove} from "@mui/icons-material";
import { useNavigate } from 'react-router-dom';
import {ApiRequests} from "../../core/apiConfig";
import {CateringOption, Location, Offer, Room, Transport} from "../../core/domain/DomainInterfaces";
import {cateringToString, formatDate} from "../../core/utils";
import LoginIcon from "@mui/icons-material/Login";
import {DatePicker} from "@mui/x-date-pickers";
import dayjs from "dayjs";
import StarIcon from "@mui/icons-material/Star";

// @ts-ignore
const OfferDetails = () => {

    const location = useLocation();

    const navigate = useNavigate();

    const [offerDetails, setOfferDetails] = useState<Offer>({
        idHotel: location.state.idHotel,
        hotelName: location.state.hotelName,
        description: '',
        price: 0.0,
        destination: {idLocation: '', region: '', country: ''},
        imageUrls: [],

        roomConfiguration: [],
        possibleRoomConfigurations: [[]],

        cateringOptions: [],

        departure: {idTransport: '', departureDate: new Date(), capacity: 0, pricePerAdult: 0,
            transportCourse: {idTransportCourse: '', type: 'PLANE', arrivalAtLocation: {idLocation: '', region: '', country: ''}, departureFromLocation: {idLocation: '', region: '', country: ''}}},
        possibleDepartures: [],
    });

    interface Category {
        label: string,
        key: 'adults' | 'teens' | 'kids' | 'infants'
    }

    const [selectedGuests, setSelectedGuests] = useState({
        adults: 2,
        teens: 0,
        kids: 0,
        infants: 0,
    });

    const [selectedDateFrom, setSelectedDateFrom] = useState(new Date(2024, 4, 1,));
    const [selectedDateTo, setSelectedDateTo] = useState(() => new Date(2024, 4, 3));

    const [selectedRooms, setSelectedRooms] = useState<Room[]>([]);
    const [selectedCatering, setSelectedCatering] = useState<CateringOption>({
        idCateringOption: '',
        type: 'ALL_INCLUSIVE',
        rating: 0,
        price: 0
    });

    const [selectedTransport, setSelectedTransport] = useState<Transport>(
        {idTransport: '', departureDate: new Date(), capacity: 0, pricePerAdult: 0,
            transportCourse: {idTransportCourse: '', type: 'PLANE', arrivalAtLocation: {idLocation: '', region: '', country: ''}, departureFromLocation: {idLocation: '', region: '', country: ''}}},
    );

    const onRoomSelection = (roomConfiguration: any) => {
        setSelectedRooms(roomConfiguration);
    }

    const onCateringSelection = (cateringOption: CateringOption) => {
        setSelectedCatering(cateringOption);
    }

    const onTransportSelection = (transport: Transport) => {
        setSelectedTransport(transport);
    }

    const onGuestsSelection = (key: 'adults' | 'teens' | 'kids' | 'infants', type: 'INC' | 'DEC') => {
        setSelectedGuests(prevState => {
            const newState = { ...prevState };
            if (type === 'INC') {
                newState[key] = (prevState[key] || 0) + 1;
            } else {
                if (prevState[key] > 0) {
                    newState[key] = prevState[key] - 1;
                }
            }
            return newState;
        });
    }

    const onDateSelection = (date: Date, type: 'FROM' | 'TO') => {
        if (type === 'FROM') {
            setSelectedDateFrom(date);
        }
        else {
            setSelectedDateTo(date);
        }
    }

    const loadDataFromStorage = () => {
        const searchParams = JSON.parse(localStorage.getItem("searchParams") ?? '{}');

        setSelectedGuests({
            adults: searchParams.adults,
            teens: searchParams.teens,
            kids: searchParams.kids,
            infants: searchParams.infants,
        });
        setSelectedDateFrom(new Date(searchParams.dateFrom));
        setSelectedDateTo(new Date(searchParams.dateTo));
    }

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
                setOfferDetails(response.data);

                setSelectedRooms(response.data.roomConfiguration);
                setSelectedTransport(response.data.departure);
                setSelectedCatering(response.data.cateringOptions[0]);
            })
            .catch(err => {
                console.log(err);
            })
    }

    useEffect(() => {
        fetchOfferDetails().then(r => r);
        loadDataFromStorage();
    }, []);

    // useEffect(() => {
    //     console.log(offerDetails);
    // }, [offerDetails]);


    return(
        <div className='flex flex-row justify-around px-96'>
            <div className='flex flex-1 flex-col py-16 mx-8 justify-center'>
                <div className='flex flex-row items-center mb-6 hover:text-gray-700 hover:cursor-pointer'
                     onClick={() => navigate(-1)}>
                    <ArrowBack style={{fontSize: 20}}/>
                    <p className='ml-1'>Powrót do ofert</p>
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

                <div className='flex flex-col gap-2 mb-8'>
                    <div className='flex flex-row items-center'>
                        <Place style={{fontSize: 18}} className='group-hover:text-gray-700'/>
                        <h4 className='ml-1 group-hover:text-gray-700'>
                            {offerDetails.destination.country + ', ' + offerDetails.destination.region ?? ''}
                        </h4>
                    </div>
                    <h1 className='text-4xl'>{offerDetails.hotelName ?? ''}</h1>
                </div>

                <div className='flex flex-col gap-3 mb-12'>
                    {offerDetails.description.split(/[.!]+/).map((item, index) => (
                        <p key={index}>{item}</p>
                    ))}
                </div>

                <div className='mb-12'>
                    <h3 className='text-2xl mb-2'>Galeria</h3>
                    <div className='grid gap-3'>
                        {offerDetails.imageUrls.slice(1, offerDetails.imageUrls.length).map((url, index) => (
                            <CardMedia
                                key={index}
                                component="img"
                                className='rounded-lg pointer-events-none'
                                sx={{width: 720, height: 240}}
                                image={url}
                            />
                        ))}
                    </div>
                </div>

                <div className='mb-8'>
                    <h3 className='text-2xl mb-2'>Konfiguracje pokoi</h3>

                    <div className='mb-6'>
                        <FormControlLabel className='select-none' control={
                            <Checkbox
                                checked={selectedRooms === offerDetails.roomConfiguration}
                                onChange={() => {onRoomSelection(offerDetails.roomConfiguration)}}
                            />
                        } label={'Konfiguracja 1'}/>

                        <div className='flex flex-col gap-2'>
                            {offerDetails.roomConfiguration.map((room, index) => (
                                <div key={index}>
                                    <h3 className='mb-1'>{room.name}</h3>
                                    <p className='text-xs'>{room.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className='flex flex-col gap-6'>
                        {offerDetails.possibleRoomConfigurations.map((item, index) => (
                            <div key={index} className=''>
                                <FormControlLabel className='select-none' control={
                                    <Checkbox
                                        checked={selectedRooms === item}
                                        onChange={() => {onRoomSelection(item)}}
                                    />
                                } label={'Konfiguracja ' + (index + 2)}/>

                                <div className='flex flex-col gap-2'>
                                    {item.map((room, index) => (
                                        <div key={index}>
                                            <h3 className='mb-1'>{room.name}</h3>
                                            <p className='text-xs'>{room.description}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className='mb-8'>
                    <h3 className='text-2xl mb-2'>Katering</h3>
                    <div className=''>
                        {offerDetails.cateringOptions.map((item, index) => (
                            <div key={index} className='flex flex-row gap-3'>
                                <FormControlLabel className='select-none' control={
                                    <Checkbox
                                        checked={selectedCatering === item}
                                        onChange={() => {onCateringSelection(item)}}
                                    />
                                } label={cateringToString(item.type)}/>

                                <Box sx={{display: 'flex', alignItems: 'center'}}>
                                    <StarIcon sx={{color: 'gold', mr: 0.5, fontSize: 20}}/>
                                    <p className='text-sm text-gray-600'>
                                        {item.rating}
                                    </p>
                                </Box>
                            </div>
                        ))}
                    </div>
                </div>


            </div>
            <div className='px-8 mt-28'>
                <Paper className='sticky top-16 px-8 py-8 rounded-lg' elevation={1}>
                    {/* dates */}
                    <div className='flex flex-col gap-4 mb-4'>

                        <DatePicker
                            label="Wyjazd"
                            value={dayjs(selectedDateFrom)}
                            onChange={(value) => onDateSelection(value ? value.toDate() : new Date(), 'FROM')}
                        />

                        <DatePicker
                            label="Powrót"
                            value={dayjs(selectedDateTo)}
                            onChange={(value) => onDateSelection(value ? value.toDate() : new Date(), 'TO')}
                        />
                    </div>

                    {/* people selection */}
                    <div className='flex flex-col pl-2 mb-4'>
                        <div className='flex items-center justify-between gap-6'>
                            <Typography className='select-none'>Dorośli</Typography>
                            <div className='flex items-center'>
                                <IconButton onClick={() => onGuestsSelection('adults', 'DEC')}>
                                    <Remove/>
                                </IconButton>
                                <Typography className='select-none'>{selectedGuests.adults}</Typography>
                                <IconButton onClick={() => onGuestsSelection('adults', 'INC')}>
                                    <Add/>
                                </IconButton>
                            </div>
                        </div>
                        <div className='flex items-center justify-between gap-6'>
                            <Typography className='select-none'>Nastolatkowie</Typography>
                            <div className='flex items-center'>
                                <IconButton onClick={() => onGuestsSelection('teens', 'DEC')}>
                                    <Remove/>
                                </IconButton>
                                <Typography className='select-none'>{selectedGuests.teens}</Typography>
                                <IconButton onClick={() => onGuestsSelection('teens', 'INC')}>
                                    <Add/>
                                </IconButton>
                            </div>
                        </div>
                        <div className='flex items-center justify-between gap-6'>
                            <Typography className='select-none'>Dzieci</Typography>
                            <div className='flex items-center'>
                                <IconButton onClick={() => onGuestsSelection('kids', 'DEC')}>
                                    <Remove/>
                                </IconButton>
                                <Typography className='select-none'>{selectedGuests.kids}</Typography>
                                <IconButton onClick={() => onGuestsSelection('kids', 'INC')}>
                                    <Add/>
                                </IconButton>
                            </div>
                        </div>
                        <div className='flex items-center justify-between gap-6'>
                            <Typography className='select-none'>Noworodki</Typography>
                            <div className='flex items-center'>
                                <IconButton onClick={() => onGuestsSelection('infants', 'DEC')}>
                                    <Remove/>
                                </IconButton>
                                <Typography className='select-none'>{selectedGuests.infants}</Typography>
                                <IconButton onClick={() => onGuestsSelection('infants', 'INC')}>
                                    <Add/>
                                </IconButton>
                            </div>
                        </div>
                    </div>

                    <div className='mb-8'>
                        <h3>Wylot / wyjazd</h3>

                        <div className='flex flex-row gap-1 items-center'>
                            <FormControlLabel className='select-none' control={
                                <Checkbox
                                    checked={selectedTransport === offerDetails.departure}
                                    onChange={() => {onTransportSelection(offerDetails.departure)}}
                                />
                            } label={offerDetails.departure.transportCourse.departureFromLocation.region}/>

                            {offerDetails.departure.transportCourse.type === 'PLANE' &&
                                <Flight style={{fontSize: 16}}/>
                            }
                            {offerDetails.departure.transportCourse.type === 'BUS' &&
                                <DirectionsBus style={{fontSize: 16}}/>
                            }
                        </div>



                        <div className='flex flex-col'>
                            {offerDetails.possibleDepartures.map((item, index) => (
                                <div key={index} className='flex flex-row gap-1 items-center'>
                                    <FormControlLabel className='select-none' control={
                                        <Checkbox
                                            checked={selectedTransport === item}
                                            onChange={() => {onTransportSelection(item)}}
                                        />
                                    } label={item.transportCourse.departureFromLocation.region}/>

                                    {item.transportCourse.type === 'PLANE' &&
                                        <Flight style={{fontSize: 16, marginRight: 6,}}/>
                                    }
                                    {item.transportCourse.type === 'BUS' &&
                                        <DirectionsBus style={{fontSize: 16, marginRight: 6,}}/>
                                    }

                                    <p className='text-sm'>
                                        + {Math.ceil(item.pricePerAdult - offerDetails.departure.pricePerAdult)} zł / os
                                    </p>
                                </div>
                            ))}
                        </div>

                    </div>


                    <Link to='/buyOffer' state={{
                        idHotel: offerDetails.idHotel,
                        selectedDateFrom: selectedDateFrom,
                        selectedDateTo: selectedDateTo,
                        selectedRooms: selectedRooms,
                        selectedTransport: selectedTransport,
                        selectedGuests: selectedGuests,
                        selectedCatering: selectedCatering,
                    }}>
                        <Button variant='contained' startIcon={<Bookmark/>}>
                            Book and buy offer
                        </Button>
                    </Link>
                </Paper>
            </div>
        </div>
    );
}

export default OfferDetails;
