import React, { useState } from 'react';
import { Paper, IconButton, Typography } from '@mui/material';
import { Add, Remove } from '@mui/icons-material';

// @ts-ignore
const SearchGuestQuantityPopper = ({selectedGuests, onGuestsSelection}) => {
    const [adults, setAdults] = useState(1);
    const [teen, setTeen] = useState(0);
    const [kids, setKids] = useState(0);
    const [infants, setInfants] = useState(0);

    return (
        <Paper className='px-10 py-5 mt-2'>
            <div className='flex flex-col gap-4'>
                {[
                    { label: 'Adults', key: 'adults', value: adults, setter: setAdults },
                    { label: 'Teen', key: 'teens', value: teen, setter: setTeen },
                    { label: 'Kids', key: 'kids', value: kids, setter: setKids },
                    { label: 'Infants', key: 'infants', value: infants, setter: setInfants }
                ].map(({ label, key, setter }) => (
                    <div key={label} className='flex items-center justify-between gap-6'>
                        <Typography>{label}</Typography>
                        <div className='flex items-center'>
                            <IconButton onClick={() => onGuestsSelection(key, 'DEC')}>
                                <Remove />
                            </IconButton>
                            <Typography>{selectedGuests[key]}</Typography>
                            <IconButton onClick={() => onGuestsSelection(key, 'INC')}>
                                <Add />
                            </IconButton>
                        </div>
                    </div>
                ))}
            </div>
        </Paper>
    );
};

export default SearchGuestQuantityPopper;
