import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {ConnectingAirports, Hotel} from "@mui/icons-material";
import React from "react";

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
        },
        {
            date: new Date(),
            locationFrom: {idLocation: '124', region: 'Gdańsk', country: 'Polska'},
            locationTo: {idLocation: '345', region: 'Durres', country: 'Albania'},
            type: 'PLANE',
            changes: {
                capacityDiff: 34,
                priceDiff: 125,
            }
        },
    ]

    const hotelChanges = [
        {
            date: new Date(),
            hotelName: 'Grand Fafa Blue',
            roomName: 'Pokój 2 os.',
            changes: {
                guestCapacityDiff: 1,
                priceDiff: 27,
            }
        },
    ]

    return (
        <div className='flex flex-col px-16 py-24'>
            <div className='grid grid-cols-2 gap-6'>
                <Paper elevation={2}>
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

                <Paper elevation={2}>
                    <div className='mt-4 mb-6 flex flex-row gap-2 items-center justify-center'>
                        <Hotel style={{fontSize: 18}}/>
                        <h3 className='text-xl'>Aktualizacje hoteli</h3>
                    </div>

                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell className='border border-gray-300 p-2'>Data</TableCell>
                                    <TableCell className='border border-gray-300 p-2'>Hotel</TableCell>
                                    <TableCell className='border border-gray-300 p-2'>Pokój</TableCell>
                                    <TableCell className='border border-gray-300 p-2'>Zmiany</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {hotelChanges.map((hotel, index) => (
                                    <TableRow key={index}>
                                        <TableCell className='border border-gray-300 p-2'>{hotel.date.toDateString()}</TableCell>
                                        <TableCell className='border border-gray-300 p-2'>{hotel.hotelName}</TableCell>
                                        <TableCell className='border border-gray-300 p-2'>{hotel.roomName}</TableCell>
                                        <TableCell className='border border-gray-300 p-2'>
                                            <div className='flex flex-col gap-1'>
                                                <p>Cena: {hotel.changes.priceDiff >= 0 ? '+' : ''}{hotel.changes.priceDiff}</p>
                                                <p>Miejsca: {hotel.changes.guestCapacityDiff >= 0 ? '+' : ''}{hotel.changes.guestCapacityDiff}</p>
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
