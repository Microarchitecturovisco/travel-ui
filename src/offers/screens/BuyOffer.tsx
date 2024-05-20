import React, {useState} from "react";
import {useLocation} from "react-router-dom";
import Countdown from "react-countdown";
import {CateringOption, Location, Room, Transport} from "../../core/domain/DomainInterfaces";
import {ApiRequests} from "../../core/apiConfig";
import {Button} from "@mui/material";
import {Bookmark, CreditCard} from "@mui/icons-material";
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

    const [transactionEnded, setTransactionEnded] = useState(false);

    console.log(location.state);

    const reserveOfferRequest = async () => {
        let searchParams = JSON.parse(localStorage.getItem("searchParams") ?? '{}');

        searchParams = {...searchParams,
            departurePlane: searchParams.departurePlane ? searchParams.departurePlane.map((dpt: Location) => dpt.idLocation) : [],
            departureBus: searchParams.departureBus ? searchParams.departureBus.map((dpt: Location) => dpt.idLocation) : [],
            dateFrom: formatDate(searchParams.dateFrom ? new Date(searchParams.dateFrom) : new Date()),
            dateTo: formatDate(searchParams.dateFrom ? new Date(searchParams.dateTo) : new Date()),
        }

        console.log(searchParams);

        await ApiRequests.reserveOffer({
            id: crypto.randomUUID(),
            hotelId: idHotel,

            hotelDateFrom: selectedDateFrom,
            hotelDateTo: selectedDateTo,

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
            .then(response => response)
            .catch(e => console.log(e));
    }

    return (
        <div className='flex flex-col px-[32rem] py-24'>
            <p className='text-xl mb-6'>Trip details</p>

            <div className='flex flex-col gap-3 mb-12'>
                <p>ID hotel {idHotel}</p>
                <p>{formatDate(selectedDateFrom)} - {formatDate(selectedDateTo)}</p>
                <div>
                    <h3>People:</h3>
                    <p className='ml-2'>Adults {selectedGuests.adults}</p>
                    <p className='ml-2'>Teenagers {selectedGuests.teens}</p>
                    <p className='ml-2'>Kids {selectedGuests.kids}</p>
                    <p className='ml-2'>Infants {selectedGuests.infants}</p>
                </div>
                <div>
                    <p>Rooms</p>
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
                        <p className='text-xs'>{selectedTransport.idTransport}</p>
                    </div>
                </div>


            </div>

            {!transactionEnded &&
                <div className='flex flex-col gap-3'>
                    <p>Time to pay for offer:</p>
                    <Countdown
                        date={Date.now() + 60000}
                        onComplete={() => {
                            setTransactionEnded(true)
                        }}
                    />

                    <div>
                        <Button variant='contained' startIcon={<CreditCard/>} onClick={reserveOfferRequest}>
                            Pay by card
                        </Button>
                    </div>
                </div>
            }

            {transactionEnded &&
                <p className='text-xl mt-2 text-red-500'>Time for the transaction has ended!</p>
            }
        </div>
    );
}

export default BuyOffer;
