import React from 'react';
import { Box, Typography, Button, Card, CardContent, CardMedia, Chip } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import {Recommend, SentimentVerySatisfied, ThumbUp} from "@mui/icons-material";

function Offer() {
    return (
        <Card sx={{ display: 'flex', marginBottom: 2, borderRadius: 2, borderColor: 'grey.300', borderWidth: 1, borderStyle: 'solid' }}>
            <CardMedia
                component="img"
                sx={{ width: 320,}}
                image={require('../../assets/holiday-assets/dahee-son-tMffGE7u1bI-unsplash.jpg')}
                alt="Ibiza Gwiździny"
            />
            <div className='flex flex-1 flex-col justify-between px-8 py-4'>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Chip icon={<SentimentVerySatisfied/>} label="RECOMMENDED" color="primary" />
                </Box>
                <Typography component="div" variant="h5">
                    Ibiza Gwiździny
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                    <StarIcon sx={{ color: 'gold', mr: 0.5 }} />
                    <Typography variant="body2" color="text.secondary">
                        4.1/5
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                        Amazing (1,313 reviews)
                    </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    15 minutes from Nowe Miasto Lubawskie
                </Typography>
            </div>
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', p: 2, backgroundColor: 'blue.100' }}>
                <Typography variant="body1" sx={{ mb: 1 }}>
                    Package Includes
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Catering
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Transfer
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Party
                </Typography>
                <Button variant="contained" color="primary" sx={{ mt: 4 }}>
                    Check Price
                </Button>
            </Box>
        </Card>
    );
}

export default Offer;
