import React from "react";
import { Checkbox, FormControlLabel, FormGroup, Paper } from "@mui/material";
import {Location} from "../../core/domain/DomainInterfaces";

interface SearchDestinationsPopperProps {
    destinations: Location[];
    selectedDestinations: Location[];
    onSelection: (dst: Location) => void;
}

const SearchDestinationsPopper: React.FC<SearchDestinationsPopperProps> = ({ destinations, selectedDestinations, onSelection}) => {

    return (
        <Paper className='px-10 py-5 mt-2' style={{ maxHeight: '300px', overflowY: 'auto' }}>
            <div className='flex flex-row gap-10'>
                <div>
                    <div className='flex flex-row gap-2 items-center mb-2 ml-0.5'>
                        {/* Add a title or icon here if necessary */}
                    </div>
                    <FormGroup>
                        {destinations.map((destination, index) => (
                            <FormControlLabel key={index} control={
                                <Checkbox
                                    onChange={() => onSelection(destination)}
                                    checked={selectedDestinations.indexOf(destination) >= 0}
                                />
                            } label={destination.region} />
                        ))}
                    </FormGroup>
                </div>
            </div>
        </Paper>
    );
}

export default SearchDestinationsPopper;
