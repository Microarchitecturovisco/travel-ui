import React, { useState } from 'react';
import { Paper, IconButton, Typography } from '@mui/material';
import { Add, Remove } from '@mui/icons-material';

const SearchGuestQuantityPopper = () => {
    const [adults, setAdults] = useState(1);
    const [teen, setTeen] = useState(0);
    const [kids, setKids] = useState(0);
    const [infants, setInfants] = useState(0);

    const handleIncrement = (setter: React.Dispatch<React.SetStateAction<number>>) => {
        setter(prev => prev + 1);
    };

    const handleDecrement = (setter: React.Dispatch<React.SetStateAction<number>>, value: number) => {
        if (value > 0) {
            setter(prev => prev - 1);
        }
    };

    return (
        <Paper className='px-10 py-5 mt-2'>
            <div className='flex flex-col gap-4'>
                {[
                    { label: 'Adults', value: adults, setter: setAdults },
                    { label: 'Teen', value: teen, setter: setTeen },
                    { label: 'Kids', value: kids, setter: setInfants },
                    { label: 'Infants', value: infants, setter: setInfants }
                ].map(({ label, value, setter }) => (
                    <div key={label} className='flex items-center justify-between'>
                        <Typography>{label}</Typography>
                        <div className='flex items-center'>
                            <IconButton onClick={() => handleDecrement(setter, value)}>
                                <Remove />
                            </IconButton>
                            <Typography>{value}</Typography>
                            <IconButton onClick={() => handleIncrement(setter)}>
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
