import {Checkbox, FormControlLabel, FormGroup, Paper} from "@mui/material";
import {DirectionsBus, Flight} from "@mui/icons-material";
import {useEffect, useState} from "react";
import {ApiRequests} from "../../core/apiConfig";


// @ts-ignore
const SearchDestinationsPopper = ({destinations}) => {

    return (
        <Paper className='px-10 py-5 mt-2'>
            <div className='flex flex-row gap-10'>
                <div>
                    <div className='flex flex-row gap-2 items-center mb-2 ml-0.5'>
                        <Flight style={{fontSize: 16}}/>
                        <h3 className='text-xs'>PLANE DEPARTURES</h3>
                    </div>

                    <FormGroup>
                        {destinations.plane.map((destination: any, index: number) => (
                            <FormControlLabel key={index} control={<Checkbox defaultChecked={index == 0} />} label={destination.region} />
                        ))}
                    </FormGroup>
                </div>
                <div>
                    <div className='flex flex-row gap-2 items-center mb-2 ml-0.5'>
                        <DirectionsBus style={{fontSize: 16}}/>
                        <h3 className='text-xs'>BUS DEPARTURES</h3>
                    </div>
                    <FormGroup>
                        <FormGroup>
                            {destinations.bus.map((destination: any, index: number) => (
                                <FormControlLabel key={index} control={<Checkbox defaultChecked={index == 0} />} label={destination.region} />
                            ))}
                        </FormGroup>
                    </FormGroup>
                </div>
            </div>
        </Paper>
    );
}

export default SearchDestinationsPopper;
