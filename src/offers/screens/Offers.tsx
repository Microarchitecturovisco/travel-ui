import OfferComponent from "../components/OfferComponent";
import {useEffect, useState} from "react";
import {ApiRequests, GetOffersBySearchQueryOffer} from "../../core/apiConfig";
import {SentimentVeryDissatisfied} from "@mui/icons-material";

export default function Offers () {

    const [offers, setOffers] = useState<GetOffersBySearchQueryOffer[]>([]);

    const [noResults, setNoResults] = useState(false);

    useEffect(() => {
        const searchParams = JSON.parse(localStorage.getItem("searchParams") ?? '{}');

        console.log(searchParams);

        ApiRequests.getOffersBySearchQuery(searchParams)
            .then(response => {
                setOffers(response.data);
                setNoResults(response.data.length === 0);
            })
            .catch(e => {
                console.log(e);
            });
    }, []);

    return(
        <div className='flex flex-col py-16 px-[28rem] justify-center'>
            {offers.length > 0 &&
                <div className='offersHeaderContainer'>
                    <h1 className='text-2xl mb-12'>Excellent offers just for you!</h1>
                </div>
            }

            {offers.map((offer, index) => (
                <OfferComponent
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
