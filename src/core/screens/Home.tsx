
import SearchIcon from '@mui/icons-material/Search';
import {Box, Button, FormControl, IconButton, InputLabel, MenuItem, Select} from "@mui/material";
import {useState} from "react";

export default function Home () {

    const [destination, setDestination] = useState('');

    return(
        <div
            className='flex flex-col px-20 py-32 items-center homeContainer'
        >
            <div className='flex flex-col text-center gap-12 mb-28'>
                <h1 className='text-5xl font-bold tracking-wide text-gray-900'>Explore. Discover. Travel.</h1>
                <h3 className='text-gray-700'>Explore our handpicked experiences, delving into the world's most
                    captivating destinations and unforgettable accommodations.</h3>
            </div>

            <div className='bg-white flex items-center gap-14 rounded-xl border-gray-400 px-8 py-2.5 mb-32' style={{borderWidth: 1,}}>
                <FormControl style={{minWidth: 280}}>
                    <InputLabel id="home-select-destinations-label">Destination</InputLabel>
                    <Select
                        label="Destination"
                        labelId='home-select-destinations-label'
                        value={destination}
                        onChange={(event) => setDestination(event.target.value)}
                    >
                        <MenuItem value={1}>Kair, Egipt</MenuItem>
                        <MenuItem value={2}>Tunis, Tunezja</MenuItem>
                        <MenuItem value={3}>Florencja, Włochy</MenuItem>
                    </Select>
                </FormControl>

                <span className='text-lg'>Guests</span>
                <span className='text-lg'>When</span>
                <span className='text-lg'>From</span>
                <IconButton color='default' aria-label='search'>
                    <SearchIcon style={{fontSize: 28}}/>
                </IconButton>
            </div>

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
