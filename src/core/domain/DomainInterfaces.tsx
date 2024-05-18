
export interface Offer {
    idOffer: string,
    hotelName: string,
    description: string,
    price: number,
    destination: Location,
    imageURLs: string[],

    roomConfiguration: Room[],
    possibleRoomConfigurations: Room[][],

    cateringOption: CateringOption[],

    departure: Transport,
    possibleTransports: Transport[],
}

export interface Location {
    idLocation: string,
    region: string,
    country: string,
}

export interface Room {
    idRoom: string,
    name: string,
    description: string,
    guestCapacity: number,
}

export interface CateringOption {
    idCateringOption: string,
    type: 'ALL_INCLUSIVE' | 'THREE_COURSES' | 'TWO_COURSES' | 'BREAKFAST' | 'NO_CATERING' | 'ACCORDING_TO_PROGRAMME',
    rating: number,
    price: number,
}

export interface Transport {
    idTransport: string,
    departureDate: Date,
    capacity: number,
    pricePerAdult: number,

    course: TransportCourse
}

export interface TransportCourse {
    idTransportCourse: string,
    type: 'PLANE' | 'BUS',
    departureFrom: Location,
    arrivalTo: Location,
}
