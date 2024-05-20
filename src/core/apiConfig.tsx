import axios from "axios";
import {Location} from "./domain/DomainInterfaces";

export const baseAPIURL = 'http://localhost:8082/';

export const axiosInstance = axios.create({
    baseURL: baseAPIURL,
    timeout: 4000,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json; charset=utf-8',
    },
});

export class ApiRequests {
    static getAvailableDestinations = async () => {
        return await axiosInstance.get('transports/available');
    }

    static getOffersBySearchQuery = async (params: GetOffersBySearchQueryParams) => {
        return await axiosInstance.get(`offers/?departureBus=${params.departureBus}&departurePlane=${params.departurePlane}&arrivals=${params.arrivals}&date_from=${params.dateFrom}&date_to=${params.dateTo}&adults=${params.adults}&teens=${params.teens}&kids=${params.kids}&infants=${params.infants}`);
    }

    static getOfferDetails = async (params: GetOfferDetailsParams) => {
        return await axiosInstance.get(`offers/${params.idHotel}?departure_buses=${params.departureBus}&departure_planes=${params.departurePlane}&date_from=${params.dateFrom}&date_to=${params.dateTo}&adults=${params.adults}&teens=${params.teens}&kids=${params.kids}&infants=${params.infants}`)
    }

    static reserveOffer = async (payload: ReservationRequestPayload) => {
        console.log(payload);
        return await axiosInstance.post(`reservations/reservation`, payload);
    }
}

export interface GetOffersBySearchQueryOffer {
    idHotel: string,
    hotelName: string,
    description: string,
    price: number,
    destination: string,
    rating: number,
    imageUrl: string,
}

export interface GetOffersBySearchQueryParams {
    departurePlane: string[],
    departureBus: string[],
    arrivals: string[],
    dateFrom: string,
    dateTo: string,
    adults: number,
    teens: number,
    kids: number,
    infants: number,
}

export interface GetOfferDetailsParams {
    idHotel: string,
    departurePlane: string[],
    departureBus: string[],
    dateFrom: string,
    dateTo: string,
    adults: number,
    teens: number,
    kids: number,
    infants: number,
}

export interface ReservationRequestPayload {
    id: string,
    hotelId: string,
    hotelDateFrom: string,
    hotelDateTo: string,

    adultsQuantity: number,
    childrenUnder18Quantity: number,
    childrenUnder10Quantity: number,
    childrenUnder3Quantity: number,

    departureLocationIdsByPlane: string[],
    departureLocationIdsByBus: string[],
    arrivalLocationIds: string[],

    roomReservationsIds: string[],
    transportReservationsIds: string[],
    userId: string,
}
