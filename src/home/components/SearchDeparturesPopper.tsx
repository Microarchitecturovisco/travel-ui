import {Checkbox, FormControlLabel, FormGroup, Paper} from "@mui/material";
import {DirectionsBus, Flight} from "@mui/icons-material";
import {useEffect, useState} from "react";
import {ApiRequests} from "../../core/apiConfig";


// @ts-ignore
const SearchDeparturesPopper = ({departures, selectedPlaneDepartures, selectedBusDepartures, onSelection}) => {

    return (
        <Paper className='px-10 py-5 mt-2'>
            <div className='flex flex-row gap-10'>
                <div>
                    <div className='flex flex-row gap-2 items-center mb-2 ml-0.5'>
                        <Flight style={{fontSize: 16}}/>
                        <h3 className='text-xs'>PLANE DEPARTURES</h3>
                    </div>

                    <FormGroup>
                        {departures.plane.map((depr: any, index: number) => (
                            <FormControlLabel key={index} control={
                                <Checkbox checked={selectedPlaneDepartures.indexOf(depr) >= 0} onChange={() => onSelection(depr, 'PLANE')} />
                            } label={depr.region} />
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
                            {departures.bus.map((depr: any, index: number) => (
                                <FormControlLabel key={index} control={
                                    <Checkbox checked={selectedBusDepartures.indexOf(depr) >= 0} onChange={() => onSelection(depr, 'BUS')} />
                                } label={depr.region} />
                            ))}
                        </FormGroup>
                    </FormGroup>
                </div>
            </div>
        </Paper>
    );
}

export default SearchDeparturesPopper;
