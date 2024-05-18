import SearchIcon from '@mui/icons-material/Search';
import {
    Button, ClickAwayListener,
    FormControl, IconButton,
    InputLabel,
    MenuItem,
    Popper,
    Select
} from "@mui/material";
import React, {useEffect, useState} from "react";
import {ArrowDropDown} from "@mui/icons-material";
import SearchDestinationsPopper from "../../home/components/SearchDestinationsPopper";
import SearchGuestQuantityPopper from "../../home/components/SearchGuestQuantityPopper";
import {ApiRequests} from "../apiConfig";
import SearchDateRangePopper from "../../home/components/SearchDateRangePopper";
import SearchDeparturesPopper from "../../home/components/SearchDeparturesPopper";
import {Location} from "../domain/DomainInterfaces";

export default function Home () {

    const [destination, setDestination] = useState('');

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [anchorType, setAnchorType] = useState('');

    const [arrivals, setArrivals] = useState([]);
    const [departures, setDepartures] = useState({
        plane: [],
        bus: []
    });

    const [selectedDestinations, setSelectedDestinations] = useState<Location[]>([]);
    const [selectedPlaneDepartures, setSelectedPlaneDepartures] = useState<Location[]>([]);
    const [selectedBusDepartures, setSelectedBusDepartures] = useState<Location[]>([]);

    const [selectedGuests, setSelectedGuests] = useState({
        adults: 2,
        teens: 0,
        kids: 0,
        infants: 0,
    });

    const handleClick = (event: React.MouseEvent<HTMLElement>, type: string) => {
        setAnchorEl(event.currentTarget);
        setAnchorType(type);
    };

    const getAvailableDestinations = async () => {
        await ApiRequests.getAvailableDestinations()
            .then(response => {
                setDepartures({
                    plane: response.data.departures.plane,
                    bus: response.data.departures.bus
                })
                setArrivals(response.data.arrivals);
            })
            .catch(e => {
                console.log(e);
            })
    }

    const onDestinationSelection = (destination: any) => {
        let newSelectedList;
        const itemIndex = selectedDestinations.indexOf(destination);
        if (itemIndex >= 0) {
            newSelectedList = selectedDestinations.filter((item, index) => index !== itemIndex);
        } else {
            newSelectedList = [...selectedDestinations, destination];
        }
        setSelectedDestinations(newSelectedList);
    }

    const onDepartureSelection = (depr: Location, type: 'PLANE' | 'BUS') => {
        let newSelectedList;

        const searchList = type === 'PLANE' ? selectedPlaneDepartures : selectedBusDepartures;

        const itemIndex = searchList.indexOf(depr);
        if (itemIndex >= 0) {
            newSelectedList = searchList.filter((_, index) => index !== itemIndex);
        } else {
            newSelectedList = [...searchList, depr];
        }

        if (type == 'PLANE') {
            setSelectedPlaneDepartures(newSelectedList);
        }
        else {
            setSelectedBusDepartures(newSelectedList);
        }
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

    useEffect(() => {
        getAvailableDestinations().then(r => r);

        localStorage.setItem('searchParams',
            JSON.stringify({
                departurePlane: ['ac958654-7ee6-3111-acb0-6591ee210130', 'a1f10135-6d1d-363d-9674-4d0fb6159cce', '60d2f38a-bb6c-3151-b2ea-5d6749a2fc9d'],
                departureBus: ['415fe550-5cfd-3ebe-b4a3-3049331af08b'],
                arrivals: ['ecb36e0f-199f-309a-82e2-fa300aaf247d', '8c1a6667-9f9b-3f3c-953b-7de3ffd2027c', '99e5acab-0602-36b0-a4f4-4f673deea1ce',
                    '1876d5cf-e722-3b11-b31a-bea0a6145ccf', '505f8cbb-c1d4-38e9-85f6-b5552b2b06c2', '82d41af4-b281-3d89-901b-14b39b8024b2'],
                dateFrom: '2024-05-02',
                dateTo: '2024-05-08',
                adults: 2,
                teens: 0,
                kids: 0,
                infants: 0,
            }));
    }, []);

    return(
        <div
            className='flex flex-col px-20 py-32 items-center homeContainer'
        >
            <div className='flex flex-col text-center gap-12 mb-28'>
                <h1 className='text-5xl font-bold tracking-wide text-gray-900'>Explore. Discover. Travel.</h1>
                <h3 className='text-gray-700'>Explore our handpicked experiences, delving into the world's most
                    captivating destinations and unforgettable accommodations.</h3>
            </div>

            <ClickAwayListener onClickAway={() => setAnchorEl(null)}>
                <div className='bg-white flex items-center gap-14 rounded-xl border-gray-400 px-8 py-2.5 mb-32' style={{borderWidth: 1,}}>
                    <Button
                        variant='outlined'
                        size='large'
                        sx={Boolean(anchorEl) && anchorType == 'destination' ? {backgroundColor: '#556cd6', color: '#fff', '&:hover': {backgroundColor: '#556cd6'}} : {}}
                        onClick={event => handleClick(event, 'destination')}
                        endIcon={<ArrowDropDown/>}
                    >
                        Destinations
                    </Button>
                    <Popper open={Boolean(anchorEl) && anchorType == 'destination'} anchorEl={anchorEl}>
                        <SearchDestinationsPopper
                            destinations={arrivals}
                            selectedDestinations={selectedDestinations}
                            onSelection={onDestinationSelection}
                        />
                    </Popper>

                    <Button
                        variant='outlined'
                        size='large'
                        sx={Boolean(anchorEl) && anchorType == 'guests' ? {backgroundColor: '#556cd6', color: '#fff', '&:hover': {backgroundColor: '#556cd6'}} : {}}
                        onClick={event => handleClick(event, 'guests')}
                        endIcon={<ArrowDropDown/>}
                    >
                        Guests
                    </Button>
                    <Popper open={Boolean(anchorEl) && anchorType == 'guests'} anchorEl={anchorEl}>
                        <SearchGuestQuantityPopper
                            onGuestsSelection={onGuestsSelection}
                            selectedGuests={selectedGuests}
                        />
                    </Popper>

                    <Button
                        variant='outlined'
                        size='large'
                        sx={Boolean(anchorEl) && anchorType == 'when' ? {backgroundColor: '#556cd6', color: '#fff', '&:hover': {backgroundColor: '#556cd6'}} : {}}
                        onClick={event => handleClick(event, 'when')}
                        endIcon={<ArrowDropDown/>}
                    >
                        When
                    </Button>
                    <Popper open={Boolean(anchorEl) && anchorType == 'when'} anchorEl={anchorEl}>
                        <SearchDateRangePopper/>
                    </Popper>

                    <Button
                        variant='outlined'
                        size='large'
                        sx={Boolean(anchorEl) && anchorType == 'from' ? {backgroundColor: '#556cd6', color: '#fff', '&:hover': {backgroundColor: '#556cd6'}} : {}}
                        onClick={event => handleClick(event, 'from')}
                        endIcon={<ArrowDropDown/>}
                    >
                        From
                    </Button>
                    <Popper open={Boolean(anchorEl) && anchorType == 'from'} anchorEl={anchorEl}>
                        <SearchDeparturesPopper
                            departures={departures}
                            selectedPlaneDepartures={selectedPlaneDepartures}
                            selectedBusDepartures={selectedBusDepartures}
                            onSelection={onDepartureSelection}
                        />
                    </Popper>

                    <IconButton color='default' aria-label='search'>
                        <SearchIcon style={{fontSize: 28}}/>
                    </IconButton>
                </div>
            </ClickAwayListener>

            {/*<div className='bg-white flex items-center gap-14 rounded-xl border-gray-400 px-8 py-2.5 mb-32' style={{borderWidth: 1,}}>*/}
            {/*    <FormControl style={{minWidth: 280}}>*/}
            {/*        <InputLabel id="home-select-destinations-label">Destination</InputLabel>*/}
            {/*        <Select*/}
            {/*            label="Destination"*/}
            {/*            labelId='home-select-destinations-label'*/}
            {/*            value={destination}*/}
            {/*            onChange={(event) => setDestination(event.target.value)}*/}
            {/*        >*/}
            {/*            <MenuItem value={1}>Kair, Egipt</MenuItem>*/}
            {/*            <MenuItem value={2}>Tunis, Tunezja</MenuItem>*/}
            {/*            <MenuItem value={3}>Florencja, Włochy</MenuItem>*/}
            {/*        </Select>*/}
            {/*    </FormControl>*/}


            {/*    <ClickAwayListener onClickAway={() => setAnchorEl(null)}>*/}
            {/*        <div>*/}

            {/*        </div>*/}
            {/*    </ClickAwayListener>*/}


            {/*</div>*/}

            <div className='flex items-center gap-4'>
                <img src={require('../../assets/holiday-assets/aleks-marinkovic-jDFO3AvTLFw-unsplash.jpg')} alt=''
                     style={{width: 300, height: 200, objectFit: 'cover'}} className='drop-shadow-lg pointer-events-none'/>
                <img src={require('../../assets/holiday-assets/dahee-son-tMffGE7u1bI-unsplash.jpg')} alt=''
                     style={{width: 300, height: 200, objectFit: 'cover'}} className='drop-shadow-lg pointer-events-none'/>
                <img src={require('../../assets/holiday-assets/denys-nevozhai-guNIjIuUcgY-unsplash.jpg')} alt=''
                     style={{width: 300, height: 200, objectFit: 'cover'}} className='drop-shadow-lg pointer-events-none'/>
                <img src={require('../../assets/holiday-assets/kira-laktionov-WK0_WJZ_umM-unsplash.jpg')} alt=''
                     style={{width: 300, height: 200, objectFit: 'cover'}} className='drop-shadow-lg pointer-events-none'/>
                <img src={require('../../assets/holiday-assets/vicko-mozara-m82uh_vamhg-unsplash.jpg')} alt=''
                     style={{width: 300, height: 200, objectFit: 'cover'}} className='drop-shadow-lg pointer-events-none'/>
            </div>
        </div>
    );
}
