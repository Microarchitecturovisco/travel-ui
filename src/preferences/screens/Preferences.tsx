import { Paper, TableContainer, Table, TableHead, TableBody, TableRow, TableCell } from "@mui/material";
import React, { useEffect, useState } from "react";
import { ConnectingAirports, Explore, Hotel, MeetingRoom } from "@mui/icons-material";

type Reservation = {
    hotelName: string;
    roomNames: string[];
    locationFromNameRegionAndCountry: string;
    locationToNameRegionAndCountry: string;
    transportType: string;
};

const Preferences = () => {
    const [reservations, setReservations] = useState<Reservation[]>([]);
    const [newReservations, setNewReservations] = useState<Reservation | null>(null);
    const [topHotels, setTopHotels] = useState<string[]>([]);
    const [topRoomTypes, setTopRoomTypes] = useState<string[]>([]);
    const [topLocationNamesTo, setTopLocationNamesTo] = useState<string[]>([]);
    const [topTransportTypes, setTopTransportTypes] = useState<string[]>([]);
    let ws: WebSocket | null = null;

    useEffect(() => {
        const ws = new WebSocket(`ws://localhost:8082/reservations/ws/offerBooked`);

        ws.onmessage = (event) => {
            console.log("Received message: " + event.data);
    
            const messageType = event.data.split(':')[0];
    
            switch (messageType) {
                case "SingleReservation":
                    const messageParts = event.data.split(' | ');
                    const hotelName = messageParts[0].split(': ')[3];
                    const roomNames = messageParts[1].split(': ')[1].replace(/[\[\]]/g, '').split(', ');
                    const locationFromNameRegionAndCountry = messageParts[2].split(': ')[1];
                    const locationToNameRegionAndCountry = messageParts[3].split(': ')[1];
                    const transportType = messageParts[4].split(': ')[1];
    
                    const newReservation = {
                        hotelName,
                        roomNames,
                        locationFromNameRegionAndCountry,
                        locationToNameRegionAndCountry,
                        transportType
                    };
    
                    setReservations(prevReservations => {
                        const updatedReservations = [newReservation, ...prevReservations];
                        return updatedReservations;
                    });
                    
                    break;
                case "TopHotels":
                    const topHotels = event.data.split(':')[1].split('#').map((item: string) => item.trim());
                    setTopHotels(topHotels);
                    break;
                case "TopRoomTypes":
                    const topRoomTypes = event.data.split(':')[1].split('#').map((item: string) => item.trim());
                    setTopRoomTypes(topRoomTypes);
                    break;
                case "TopLocationNamesTo":
                    const topLocationNamesTo = event.data.split(':')[1].split('#').map((item: string) => item.trim());
                    setTopLocationNamesTo(topLocationNamesTo);
                    break;
                case "TopTransportTypes":
                    const topTransportTypes = event.data.split(':')[1].split('#').map((item: string) => item.trim());
                    setTopTransportTypes(topTransportTypes);
                    break;
                default:
                    console.log("Wrong type of message");
                    break;
            }
        };
    
        return () => {
            ws.close();
            console.error("WebSocket connection closed");
        };
    }, []);
    

    return (
        <div className='flex flex-col px-64 py-24'>
            <div className='grid grid-cols-2 grid-rows-2 gap-x-12 gap-y-8'>
                <Paper elevation={2} className='flex flex-col justify-center items-center rounded-xl px-4 py-6'>
                    <h3 className='text-xl'>Top 3 kierunki podróży</h3>
                    <ul className='flex flex-col gap-3'>
                        {topLocationNamesTo.map((location, index) => (
                            <li key={index}>{location}</li>
                        ))}
                    </ul>
                </Paper>
    
                <Paper elevation={2} className='flex flex-col justify-center items-center rounded-xl px-4 py-6'>
                    <h3 className='text-xl'>Top 3 hotele</h3>
                    <ul className='flex flex-col gap-3'>
                        {topHotels.map((hotel, index) => (
                            <li key={index}>{hotel}</li>
                        ))}
                    </ul>
                </Paper>
    
                <Paper elevation={2} className='flex flex-col justify-center items-center rounded-xl px-4 py-6'>
                    <h3 className='text-xl'>Top 3 pokoje</h3>
                    <ul className='flex flex-col gap-3'>
                        {topRoomTypes.map((roomType, index) => (
                            <li key={index}>{roomType}</li>
                        ))}
                    </ul>
                </Paper>
    
                <Paper elevation={2} className='flex flex-col justify-center items-center rounded-xl px-4 py-6'>
                    <h3 className='text-xl'>Top 3 typy transportu</h3>
                    <ul className='flex flex-col gap-3'>
                        {topTransportTypes.map((transportType, index) => (
                            <li key={index}>{transportType}</li>
                        ))}
                    </ul>
                </Paper>
    
                <div className='mt-8 col-span-2'>
                    <h2 className='text-xl font-bold mb-4'>Nowa rezerwacja</h2>
                    <Paper elevation={3}>
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell className='border border-gray-500 p-2'>Hotel</TableCell>
                                        <TableCell className='border border-gray-500 p-2'>Pokoje</TableCell>
                                        <TableCell className='border border-gray-500 p-2'>Skąd</TableCell>
                                        <TableCell className='border border-gray-500 p-2'>Dokąd</TableCell>
                                        <TableCell className='border border-gray-500 p-2'>Typ transportu</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {reservations.map((reservation, index) => (
                                        <TableRow key={index}>
                                            <TableCell className='border border-gray-500 p-2'>{reservation.hotelName}</TableCell>
                                            <TableCell className='border border-gray-500 p-2'>{reservation.roomNames.join(', ')}</TableCell>
                                            <TableCell className='border border-gray-500 p-2'>{reservation.locationFromNameRegionAndCountry}</TableCell>
                                            <TableCell className='border border-gray-500 p-2'>{reservation.locationToNameRegionAndCountry}</TableCell>
                                            <TableCell className='border border-gray-500 p-2'>{reservation.transportType}</TableCell>
                                        </TableRow>
                                    ))}
                                    {newReservations && (
                                        <TableRow>
                                            <TableCell className='border border-gray-500 p-2'>{newReservations.hotelName}</TableCell>
                                            <TableCell className='border border-gray-500 p-2'>{newReservations.roomNames.join(', ')}</TableCell>
                                            <TableCell className='border border-gray-500 p-2'>{newReservations.locationFromNameRegionAndCountry}</TableCell>
                                            <TableCell className='border border-gray-500 p-2'>{newReservations.locationToNameRegionAndCountry}</TableCell>
                                            <TableCell className='border border-gray-500 p-2'>{newReservations.transportType}</TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>
                </div>
            </div>
        </div>
    );
    
}

export default Preferences;
