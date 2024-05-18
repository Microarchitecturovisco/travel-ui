import {useState} from "react";
import {Paper} from "@mui/material";
import {DatePicker} from "@mui/x-date-pickers";

const SearchDateRangePopper = () => {

    const [dateFrom, setDateFrom] = useState(new Date());
    const [dateTo, setDateTo] = useState(() => {
        const date = new Date();
        date.setDate(date.getDate() + 5);
        return date;
    });

    return(
        <Paper className='px-10 py-8 mt-2'>
            <div className='flex flex-col gap-4'>
                <h3 className='text-gray-700'>Plan Your trip</h3>

                <DatePicker label="Departure date"/>

                <DatePicker label="Return date"/>
            </div>
        </Paper>
    );
}

export default SearchDateRangePopper;
