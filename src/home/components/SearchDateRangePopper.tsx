import {useState} from "react";
import {Paper} from "@mui/material";
import {DatePicker} from "@mui/x-date-pickers";
import dayjs from "dayjs";

// @ts-ignore
const SearchDateRangePopper = ({selectedDateFrom, selectedDateTo, onSelection}) => {

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

                <DatePicker
                    label="Departure date"
                    value={dayjs(selectedDateFrom)}
                    onChange={(value) => onSelection(value, 'FROM')}
                />

                <DatePicker
                    label="Return date"
                    value={dayjs(selectedDateTo)}
                    onChange={(value) => onSelection(value, 'TO')}
                />
            </div>
        </Paper>
    );
}

export default SearchDateRangePopper;
