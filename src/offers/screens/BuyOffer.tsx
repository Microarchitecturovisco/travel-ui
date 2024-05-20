import React, {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import Countdown from "react-countdown";
import {CateringOption, Location, Room, Transport} from "../../core/domain/DomainInterfaces";
import {ApiRequests} from "../../core/apiConfig";
import {Button} from "@mui/material";
import {CreditCard} from "@mui/icons-material";
import {formatDate} from "../../core/utils";

const BuyOffer = () => {

    const location = useLocation();

    const [idHotel, setIdHotel] = useState(location.state.idHotel);
    const [selectedGuests, setSelectedGuests] = useState(location.state.selectedGuests);

    const [selectedDateFrom, setSelectedDateFrom] = useState(location.state.selectedDateFrom);
    const [selectedDateTo, setSelectedDateTo] = useState(location.state.selectedDateTo);

    const [selectedRooms, setSelectedRooms] = useState<Room[]>(location.state.selectedRooms);
    const [selectedCatering, setSelectedCatering] = useState<CateringOption>(location.state.selectedCatering);
    const [selectedTransport, setSelectedTransport] = useState<Transport>(location.state.selectedTransport);

    const [transactionSuccessful, setTransactionSuccessful] = useState('IN_PROGRESS');

    const reserveOfferRequest = async () => {
        let searchParams = JSON.parse(localStorage.getItem("searchParams") ?? '{}');

        searchParams = {...searchParams,
            departurePlane: searchParams.departurePlane ? searchParams.departurePlane.map((dpt: Location) => dpt.idLocation) : [],
            departureBus: searchParams.departureBus ? searchParams.departureBus.map((dpt: Location) => dpt.idLocation) : [],
            dateFrom: formatDate(searchParams.dateFrom ? new Date(searchParams.dateFrom) : new Date()),
            dateTo: formatDate(searchParams.dateFrom ? new Date(searchParams.dateTo) : new Date()),
        }

        await ApiRequests.reserveOffer({
            id: crypto.randomUUID(),
            hotelId: idHotel,

            hotelTimeFrom: selectedDateFrom,
            hotelTimeTo: selectedDateTo,

            adultsQuantity: selectedGuests.adults,
            childrenUnder18Quantity: selectedGuests.teens,
            childrenUnder10Quantity: selectedGuests.kids,
            childrenUnder3Quantity: selectedGuests.infants,

            departureLocationIdsByBus: searchParams.departureBus,
            departureLocationIdsByPlane: searchParams.departurePlane,
            arrivalLocationIds: searchParams.arrivals.map((arr: any) => arr.idLocation),

            roomReservationsIds: selectedRooms.map(room => room.roomId),
            transportReservationsIds: [selectedTransport.idTransport],
            userId: '',
        })
            .then(response => {
                console.log(response);
                if (response === 0) {
                    setTimeout(() => {
                        setTransactionSuccessful('SUCCESS');
                    }, 500);
                }
                else {
                    setTimeout(() => {
                        setTransactionSuccessful('FAILURE');
                    }, 500);
                }
            })
            .catch(e => console.log(e));
    }

    return (
        <div className='flex flex-col px-[32rem] py-24'>
            <p className='text-xl mb-6'>Szczegóły oferty</p>

            <div className='flex flex-col gap-3 mb-12'>
                <p>ID hotel {idHotel}</p>
                <p>{formatDate(selectedDateFrom)} - {formatDate(selectedDateTo)}</p>
                <div>
                    <h3>Podróżni:</h3>
                    <p className='ml-2'>Dorośli {selectedGuests.adults}</p>
                    <p className='ml-2'>Nastolatkowie {selectedGuests.teens}</p>
                    <p className='ml-2'>Dzieci {selectedGuests.kids}</p>
                    <p className='ml-2'>Noworodki {selectedGuests.infants}</p>
                </div>
                <div>
                    <p>Pokoje</p>
                    {selectedRooms.map((item, index) => (
                        <div key={index} className='flex flex-row gap-3 items-center'>
                            <p>{item.name}</p>
                            <h3 className='text-xs'>{item.roomId}</h3>
                        </div>
                    ))}
                </div>

                <div>
                    <h3>Transport</h3>

                    <div className='flex flex-row gap-3 items-center'>
                        <p>{selectedTransport.transportCourse.type}</p>
                        <p>z: {selectedTransport.transportCourse.departureFromLocation.region}</p>
                        <p>do: {selectedTransport.transportCourse.arrivalAtLocation.region}, {selectedTransport.transportCourse.arrivalAtLocation.country}</p>
                        <p className='text-xs'>{selectedTransport.idTransport}</p>
                    </div>
                </div>


            </div>

            {transactionSuccessful === 'IN_PROGRESS' &&
                <div className='flex flex-col gap-3'>
                    <p>Czas na zakup rezerwacji:</p>
                    <Countdown
                        date={Date.now() + 60000}
                        onComplete={() => {
                            setTransactionSuccessful('ENDED');
                        }}
                    />

                    <div>
                        <Button variant='contained' startIcon={<CreditCard/>} onClick={reserveOfferRequest}>
                            Zapłać kartą
                        </Button>
                    </div>
                </div>
            }

            {transactionSuccessful === 'ENDED' &&
                <p className='text-xl mt-2 text-red-500'>Czas transakcji się skończył!</p>
            }

            {transactionSuccessful === 'SUCCESS' &&
                <div>
                    <p className='text-xl mt-2 text-green-400'>Transakcja pomyślna</p>
                    <p>Możesz zobaczyć swoją podróż w zakładce Rezerwacji</p>
                </div>
            }

            {transactionSuccessful === 'FAILURE' &&
                <div>
                    <p className='text-xl mt-2 text-red-400'>Transakcja niepomyślna</p>
                    <p>Sprawdź dane karty</p>
                </div>
            }
        </div>
    );
}

export default BuyOffer;
