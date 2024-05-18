import OfferComponent from "../components/OfferComponent";
import {useEffect, useState} from "react";
import {ApiRequests, GetOffersBySearchQueryOffer} from "../../core/apiConfig";

export default function Offers () {

    const [offers, setOffers] = useState<GetOffersBySearchQueryOffer[]>([]);

    useEffect(() => {
        const searchParams = JSON.parse(localStorage.getItem("searchParams") ?? '{}');

        ApiRequests.getOffersBySearchQuery(searchParams)
            .then(response => {
                setOffers(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }, []);

    return(
        <div className='flex flex-col py-16 px-[28rem] justify-center'>
            <div className='offersHeaderContainer'>
                <h1 className='text-2xl mb-12'>Excellent offers just for you!</h1>
            </div>

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

            <OfferComponent
                name='Ibiza Gwiździny'
                location='Polska, Nowe Miasto Lubawskie'
                rating={4.1}
                pricePerPerson={1399}
            />

            <OfferComponent
                name='Hotel Brzeźno'
                location='Polska, Gdańsk'
                rating={4.4}
                pricePerPerson={799}
                photoURL='https://picsum.photos/id/853/400/200'
            />

            <OfferComponent
                name='Odysee Resort'
                location='Tunezja, Tunis'
                rating={5.3}
                pricePerPerson={2199}
                photoURL='https://picsum.photos/id/386/400/200'
            />
        </div>
    );
}
