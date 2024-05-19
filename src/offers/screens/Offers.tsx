import OfferComponent from "../components/OfferComponent";
import {useEffect, useState} from "react";
import {ApiRequests, GetOffersBySearchQueryOffer} from "../../core/apiConfig";
import {SentimentVeryDissatisfied} from "@mui/icons-material";
import SearchBar from "../../home/components/SearchBar";
import {Location} from "../../core/domain/DomainInterfaces";
import {formatDate} from "../../core/utils";

export default function Offers () {

    const [offers, setOffers] = useState<GetOffersBySearchQueryOffer[]>([]);

    const [noResults, setNoResults] = useState(false);

    const searchOffers = async () => {
        let searchParams = JSON.parse(localStorage.getItem("searchParams") ?? '{}');

        searchParams = {...searchParams,
            departurePlane: searchParams.departurePlane ? searchParams.departurePlane.map((dpt: Location) => dpt.idLocation) : [],
            departureBus: searchParams.departureBus ? searchParams.departureBus.map((dpt: Location) => dpt.idLocation) : [],
            arrivals: searchParams.arrivals ? searchParams.arrivals.map((dst: Location) => dst.idLocation) : [],
            dateFrom: formatDate(searchParams.dateFrom ? new Date(searchParams.dateFrom) : new Date()),
            dateTo: formatDate(searchParams.dateFrom ? new Date(searchParams.dateTo) : new Date()),
        }

        ApiRequests.getOffersBySearchQuery(searchParams)
            .then(response => {
                setOffers(response.data);
                setNoResults(response.data.length === 0);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    useEffect(() => {
        searchOffers().then(r => r);
    }, []);

    return(
        <div className='flex flex-col py-16 px-[28rem] justify-center'>
            {offers.length > 0 &&
                <div className='offersHeaderContainer'>
                    <h1 className='text-2xl mb-8'>Excellent offers just for you!</h1>
                </div>
            }

            <SearchBar
                onSearch={searchOffers}
            />

            {offers.map((offer, index) => (
                <OfferComponent
                    idHotel={offer.idHotel}
                    name={offer.hotelName}
                    key={offer.hotelName}
                    location={offer.destination}
                    rating={offer.rating}
                    pricePerPerson={offer.price}
                    photoURL={offer.imageUrl}
                    bestSeller={index < 3}
                />
            ))}

            {noResults &&
                <div className='flex flex-col gap-4 mt-12'>
                    <div className='flex flex-row items-center gap-2'>
                        <SentimentVeryDissatisfied style={{fontSize: 36}}/>
                        <p className='text-2xl'>No results</p>
                    </div>
                    <p>Change your search parameters and try again...</p>
                </div>
            }
        </div>
    );
}
