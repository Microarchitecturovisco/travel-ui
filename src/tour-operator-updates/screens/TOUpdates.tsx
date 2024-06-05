import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { ConnectingAirports, Hotel } from "@mui/icons-material";
import React, { useEffect, useState } from "react";

type HotelUpdate = {
    updateDateTime: string;
    updateType: string;
    hotelName: string;
    roomName: string;
    priceChange: number;
    capacityChange: number;
};

const TOUpdates = () => {

    const transportChanges = [
        {
            date: new Date(),
            locationFrom: {idLocation: '123', region: 'Gdańsk', country: 'Polska'},
            locationTo: {idLocation: '345', region: 'Warszawa', country: 'Polska'},
            type: 'BUS',
            changes: {
                capacityDiff: -20,
                priceDiff: -48,
            }
        }
    ]

    const [hotelUpdates, setHotelUpdates] = useState<HotelUpdate[]>([]);

    useEffect(() => {
        const ws = new WebSocket(`ws://localhost:8086/data-generator/ws/hotel`);

        ws.onmessage = (event) => {
            console.log("Received message: " + event.data);
        
            const messageType = event.data.split(':')[0];
            const messageData = event.data.split(': ')[1];
        
            switch (messageType) {
                case "SingleHotel":
                    const hotelUpdate = JSON.parse(messageData);
        
                    // Convert the updateDateTime array to a Date object
                    hotelUpdate.updateDateTime = new Date(
                        hotelUpdate.updateDateTime[0],
                        hotelUpdate.updateDateTime[1] - 1, // JavaScript months are 0-based
                        hotelUpdate.updateDateTime[2],
                        hotelUpdate.updateDateTime[3],
                        hotelUpdate.updateDateTime[4]
                    );
        
                    setHotelUpdates((prevUpdates) => [hotelUpdate, ...prevUpdates]);
                    break;
                default:
                    console.log("Unexpected message type");
                    break;
            }
        };        

        return () => {
            ws.close();
            console.error("WebSocket connection closed");
        };
    }, []);


    return (
        <div className='flex flex-col px-16 py-24'>
            <div className='grid grid-cols-2 gap-6'>
                <Paper elevation={2} style={{height: 'fit-content'}}>
                    <div className='mt-4 mb-6 flex flex-row gap-2 items-center justify-center'>
                        <ConnectingAirports style={{fontSize: 18}}/>
                        <h3 className='text-xl'>Aktualizacje transportów</h3>
                    </div>

                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell className='border border-gray-300 p-2'>Data</TableCell>
                                    <TableCell className='border border-gray-300 p-2'>Skąd</TableCell>
                                    <TableCell className='border border-gray-300 p-2'>Dokąd</TableCell>
                                    <TableCell className='border border-gray-300 p-2'>Typ transportu</TableCell>
                                    <TableCell className='border border-gray-300 p-2'>Zmiany</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {transportChanges.map((transport, index) => (
                                    <TableRow key={index}>
                                        <TableCell className='border border-gray-300 p-2'>{transport.date.toDateString()}</TableCell>
                                        <TableCell className='border border-gray-300 p-2'>{transport.locationFrom.country}, {transport.locationFrom.region}</TableCell>
                                        <TableCell className='border border-gray-300 p-2'>{transport.locationTo.country}, {transport.locationTo.region}</TableCell>
                                        <TableCell className='border border-gray-300 p-2'>{transport.type === 'PLANE' ? 'Samolot' : 'Bus'}</TableCell>
                                        <TableCell className='border border-gray-300 p-2'>
                                            <div className='flex flex-col gap-1'>
                                                <p>Cena: {transport.changes.priceDiff >= 0 ? '+' : ''}{transport.changes.priceDiff}</p>
                                                <p>Miejsca: {transport.changes.capacityDiff >= 0 ? '+' : ''}{transport.changes.capacityDiff}</p>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>

                <Paper elevation={2} style={{ height: 'fit-content' }}>
                    <div className='mt-4 mb-6 flex flex-row gap-2 items-center justify-center'>
                        <Hotel style={{ fontSize: 18 }} />
                        <h3 className='text-xl'>Aktualizacje hoteli</h3>
                    </div>

                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell className='border border-gray-300 p-2'>Data</TableCell>
                                    <TableCell className='border border-gray-300 p-2'>Typ zmiany</TableCell>
                                    <TableCell className='border border-gray-300 p-2'>Hotel</TableCell>
                                    <TableCell className='border border-gray-300 p-2'>Pokój</TableCell>
                                    <TableCell className='border border-gray-300 p-2'>Zmiany</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {hotelUpdates.map((hotel, index) => (
                                    <TableRow key={index}>
                                        <TableCell className='border border-gray-300 p-2'>{new Date(hotel.updateDateTime).toLocaleString()}</TableCell>
                                        <TableCell className='border border-gray-300 p-2'>{hotel.updateType}</TableCell>
                                        <TableCell className='border border-gray-300 p-2'>{hotel.hotelName}</TableCell>
                                        <TableCell className='border border-gray-300 p-2'>{hotel.roomName}</TableCell>
                                        <TableCell className='border border-gray-300 p-2'>
                                            <div className='flex flex-col gap-1'>
                                                <p>Cena: {hotel.priceChange > 0 ? '+' : ''}{hotel.priceChange}</p>
                                                <p>Miejsca: {hotel.capacityChange > 0 ? '+' : ''}{hotel.capacityChange}</p>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            </div>
        </div>
    );
}

export default TOUpdates;
