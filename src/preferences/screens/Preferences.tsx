import { Paper } from "@mui/material";
import React, { useEffect, useState } from "react";
import { ConnectingAirports, Explore, Hotel, MeetingRoom } from "@mui/icons-material";

// Define the Reservation type
type Reservation = {
    hotelName: string;
    roomNames: string[];
    locationFrom: string;
    locationTo: string;
    transportType: string;
};

const Preferences = () => {
    const [reservations, setReservations] = useState<Reservation[]>(() => {
        // Load initial state from localStorage
        const savedReservations = localStorage.getItem('reservations');
        return savedReservations ? JSON.parse(savedReservations) : [];
    });

    useEffect(() => {
        const ws = new WebSocket(`ws://localhost:8082/reservations/ws/offerBooked`);

        ws.onmessage = (event) => {
            console.log("Received Booking message: " + event.data);
            
            // Parse the message
            const messageParts = event.data.split(' | ');
            
            const hotelName = messageParts[0].split(': ')[2];
            const roomNames = messageParts[1].split(': ')[1].replace(/[\[\]]/g, '').split(', ');
            const locationFrom = messageParts[2].split(': ')[1];
            const locationTo = messageParts[3].split(': ')[1];
            const transportType = messageParts[4].split(': ')[1];

            const newReservation: Reservation = {
                hotelName,
                roomNames,
                locationFrom,
                locationTo,
                transportType
            };

            setReservations(prevReservations => {
                const updatedReservations = [newReservation, ...prevReservations].slice(0, 3);
                localStorage.setItem('reservations', JSON.stringify(updatedReservations)); // Save to localStorage
                return updatedReservations;
            });
        };

        return () => {
            ws.close();
        };
    }, []);

    return (
        <div className='flex flex-col px-64 py-24'>
            <div className='grid grid-cols-2 grid-rows-2 gap-x-12 gap-y-8'>
                <Paper elevation={2} className='flex flex-col justify-center items-center rounded-xl px-4 py-6'>
                    <div className='mb-5 flex flex-row gap-2 items-center'>
                        <Explore style={{fontSize: 18}} />
                        <h3 className='text-xl'>Ostatnie kierunki podróży</h3>
                    </div>
                    <ul className='flex flex-col gap-3'>
                        {reservations.map((reservation, index) => (
                            <li key={index}>{reservation.locationTo}</li>
                        ))}
                    </ul>
                </Paper>

                <Paper elevation={2} className='flex flex-col justify-center items-center rounded-xl px-4 py-6'>
                    <div className='mb-5 flex flex-row gap-2 items-center'>
                        <Hotel style={{fontSize: 18}} />
                        <h3 className='text-xl'>Ostatnie hotele</h3>
                    </div>
                    <ul className='flex flex-col gap-3'>
                        {reservations.map((reservation, index) => (
                            <li key={index}>{reservation.hotelName}</li>
                        ))}
                    </ul>
                </Paper>

                <Paper elevation={2} className='flex flex-col justify-center items-center rounded-xl px-4 py-6'>
                    <div className='mb-5 flex flex-row gap-2 items-center'>
                        <MeetingRoom style={{fontSize: 18}} />
                        <h3 className='text-xl'>Ostatnie pokoje</h3>
                    </div>
                    <ul className='flex flex-col gap-3'>
                        {reservations.flatMap((reservation, index) =>
                            reservation.roomNames.map((roomName, roomIndex) => (
                                <li key={`${index}-${roomIndex}`}>
                                    <p>{roomName}</p>
                                    <p className='text-xs ml-4'>{reservation.hotelName}</p>
                                </li>
                            ))
                        )}
                    </ul>
                </Paper>

                <Paper elevation={2} className='flex flex-col justify-center items-center rounded-xl px-4 py-6'>
                    <div className='mb-5 flex flex-row gap-2 items-center'>
                        <ConnectingAirports style={{fontSize: 18}} />
                        <h3 className='text-xl'>Ostatnie typy transportu</h3>
                    </div>
                    <ul className='flex flex-col gap-3'>
                        {reservations.map((reservation, index) => (
                            <li key={index}>{reservation.transportType}</li>
                        ))}
                    </ul>
                </Paper>
            </div>
        </div>
    );
}

export default Preferences;
