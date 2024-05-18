import React, { useEffect, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { Button, ClickAwayListener, IconButton, Popper } from "@mui/material";
import { ArrowDropDown } from "@mui/icons-material";
import SearchDestinationsPopper from "../../home/components/SearchDestinationsPopper";
import { ApiRequests } from "../apiConfig";
import SearchDateRangePopper from "../../home/components/SearchDateRangePopper";
import SearchGuestQuantityPopper from "../../home/components/SearchGuestQuantityPopper"; // Import the new component

interface Destination {
    region: string;
}

export default function Home() {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [anchorType, setAnchorType] = useState('');

    const [arrivals, setArrivals] = useState<Destination[]>([]);
    const [departures, setDepartures] = useState<{ plane: Destination[], bus: Destination[] }>({ plane: [], bus: [] });

    const handleClick = (event: React.MouseEvent<HTMLElement>, type: string) => {
        setAnchorEl(event.currentTarget);
        setAnchorType(type);
    };

    const getAvailableDestinations = async () => {
        try {
            const response = await ApiRequests.getAvailableDestinations();
            setDepartures({
                plane: response.data.departures.plane,
                bus: response.data.departures.bus
            });
            setArrivals(response.data.arrivals);
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        getAvailableDestinations();
    }, []);

    return (
        <div className='flex flex-col px-20 py-32 items-center homeContainer'>
            <div className='flex flex-col text-center gap-12 mb-28'>
                <h1 className='text-5xl font-bold tracking-wide text-gray-900'>Explore. Discover. Travel.</h1>
                <h3 className='text-gray-700'>Explore our handpicked experiences, delving into the world's most captivating destinations and unforgettable accommodations.</h3>
            </div>

            <ClickAwayListener onClickAway={() => setAnchorEl(null)}>
                <div className='bg-white flex items-center gap-14 rounded-xl border-gray-400 px-8 py-2.5 mb-32' style={{ borderWidth: 1 }}>
                    <Button
                        variant='outlined'
                        size='large'
                        sx={Boolean(anchorEl) && anchorType === 'destination' ? { backgroundColor: '#556cd6', color: '#fff', '&:hover': { backgroundColor: '#556cd6' } } : {}}
                        onClick={event => handleClick(event, 'destination')}
                        endIcon={<ArrowDropDown />}
                    >
                        Destinations
                    </Button>
                    <Popper open={Boolean(anchorEl) && anchorType === 'destination'} anchorEl={anchorEl}>
                        <SearchDestinationsPopper destinations={departures.plane.concat(departures.bus)} />
                    </Popper>

                    <Button
                        variant='outlined'
                        size='large'
                        sx={Boolean(anchorEl) && anchorType === 'guests' ? { backgroundColor: '#556cd6', color: '#fff', '&:hover': { backgroundColor: '#556cd6' } } : {}}
                        onClick={event => handleClick(event, 'guests')}
                        endIcon={<ArrowDropDown />}
                    >
                        Guests
                    </Button>
                    <Popper open={Boolean(anchorEl) && anchorType === 'guests'} anchorEl={anchorEl}>
                        <SearchGuestQuantityPopper />
                    </Popper>

                    <Button
                        variant='outlined'
                        size='large'
                        sx={Boolean(anchorEl) && anchorType === 'when' ? { backgroundColor: '#556cd6', color: '#fff', '&:hover': { backgroundColor: '#556cd6' } } : {}}
                        onClick={event => handleClick(event, 'when')}
                        endIcon={<ArrowDropDown />}
                    >
                        When
                    </Button>
                    <Popper open={Boolean(anchorEl) && anchorType === 'when'} anchorEl={anchorEl}>
                        <SearchDateRangePopper />
                    </Popper>

                    <Button
                        variant='outlined'
                        size='large'
                        sx={Boolean(anchorEl) && anchorType === 'from' ? { backgroundColor: '#556cd6', color: '#fff', '&:hover': { backgroundColor: '#556cd6' } } : {}}
                        onClick={event => handleClick(event, 'from')}
                        endIcon={<ArrowDropDown />}
                    >
                        From
                    </Button>
                    <Popper open={Boolean(anchorEl) && anchorType === 'from'} anchorEl={anchorEl}>
                        <SearchDestinationsPopper destinations={departures.plane.concat(departures.bus)} />
                    </Popper>

                    <IconButton color='default' aria-label='search'>
                        <SearchIcon style={{ fontSize: 28 }} />
                    </IconButton>
                </div>
            </ClickAwayListener>

            <div className='flex items-center gap-4'>
                <img src={require('../../assets/holiday-assets/aleks-marinkovic-jDFO3AvTLFw-unsplash.jpg')} alt=''
                     style={{ width: 300, height: 200, objectFit: 'cover' }} className='drop-shadow-lg pointer-events-none' />
                <img src={require('../../assets/holiday-assets/dahee-son-tMffGE7u1bI-unsplash.jpg')} alt=''
                     style={{ width: 300, height: 200, objectFit: 'cover' }} className='drop-shadow-lg pointer-events-none' />
                <img src={require('../../assets/holiday-assets/denys-nevozhai-guNIjIuUcgY-unsplash.jpg')} alt=''
                     style={{ width: 300, height: 200, objectFit: 'cover' }} className='drop-shadow-lg pointer-events-none' />
                <img src={require('../../assets/holiday-assets/kira-laktionov-WK0_WJZ_umM-unsplash.jpg')} alt=''
                     style={{ width: 300, height: 200, objectFit: 'cover' }} className='drop-shadow-lg pointer-events-none' />
                <img src={require('../../assets/holiday-assets/vicko-mozara-m82uh_vamhg-unsplash.jpg')} alt=''
                     style={{ width: 300, height: 200, objectFit: 'cover' }} className='drop-shadow-lg pointer-events-none' />
            </div>
        </div>
    );
}
