import {Paper} from "@mui/material";
import React, {useEffect, useState} from "react";
import {ConnectingAirports, Explore, Flight, Hotel, KingBed, MeetingRoom} from "@mui/icons-material";

const Preferences = () => {

    useEffect(() => {
        const ws = new WebSocket(`ws://localhost:8082/reservations/ws/offerBooked`);

        ws.onmessage = (event) => {
            console.log("Received Booking message " + event.data);
            // update user preferences
        }

        return () => {
            ws.close();
        }
    }, []);

    return(
        <div className='flex flex-col px-64 py-24'>
            <div>

            </div>
            <div className='grid grid-cols-2 grid-rows-2 gap-x-12 gap-y-8'>
                <Paper elevation={2} className='flex flex-col justify-center items-center rounded-xl px-4 py-6'>
                    <div className='mb-5 flex flex-row gap-2 items-center'>
                        <Explore style={{fontSize: 18}}/>
                        <h3 className='text-xl'>Popularne kierunki podróży</h3>
                    </div>


                    <ul className='flex flex-col gap-3'>
                        <li>Malta</li>
                        <li>Egipt</li>
                        <li>Maroko</li>
                    </ul>
                </Paper>

                <Paper elevation={2} className='flex flex-col justify-center items-center rounded-xl px-4 py-6'>
                    <div className='mb-5 flex flex-row gap-2 items-center'>
                        <Hotel style={{fontSize: 18}}/>
                        <h3 className='text-xl'>Popularne hotele</h3>
                    </div>

                    <ul className='flex flex-col gap-3'>
                        <li>Grand Fafa Blue</li>
                        <li>Great Fafa green</li>
                        <li>Fuerteventura princess</li>
                    </ul>
                </Paper>

                <Paper elevation={2} className='flex flex-col justify-center items-center rounded-xl px-4 py-6'>
                    <div className='mb-5 flex flex-row gap-2 items-center'>
                        <MeetingRoom style={{fontSize: 18}}/>
                        <h3 className='text-xl'>Popularne pokoje</h3>
                    </div>

                    <ul className='flex flex-col gap-3'>
                        <li>
                            <p>Pokój 2-os z widokiem na góry</p>
                            <p className='text-xs ml-4'>Fuerteventura princess</p>
                        </li>
                        <li>
                            <p>Pokój 3-os z widokiem na morze</p>
                            <p className='text-xs ml-4'>Fuerteventura princess</p>
                        </li>
                        <li>
                            <p>Pokój 2-os z basenem</p>
                            <p className='text-xs ml-4'>Grand Fafa Blue</p>
                        </li>
                    </ul>


                </Paper>

                <Paper elevation={2} className='flex flex-col justify-center items-center rounded-xl px-4 py-6'>
                    <div className='mb-5 flex flex-row gap-2 items-center'>
                        <ConnectingAirports style={{fontSize: 18}}/>
                        <h3 className='text-xl'>Popularne typy transportu</h3>
                    </div>

                    <ul className='flex flex-col gap-3'>
                        <li>Samolot</li>
                        <li>Autobus</li>
                    </ul>
                </Paper>
            </div>
        </div>
    );
}

export default Preferences;
