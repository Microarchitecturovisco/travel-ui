import Offer from "../components/Offer";

export default function Offers () {
    return(
        <div className='flex flex-col py-16 px-[28rem] justify-center'>
            <div className='offersHeaderContainer'>
                <h1 className='text-2xl mb-12'>Excellent offers just for you!</h1>
            </div>

            <Offer
                name='Ibiza Gwiździny'
                location='Polska, Nowe Miasto Lubawskie'
                rating='4.1/5'
                pricePerPerson={1399}
            />

            <Offer
                name='Hotel Brzeźno'
                location='Polska, Gdańsk'
                rating='4.4/5'
                pricePerPerson={799}
                photoURL='https://picsum.photos/id/853/400/200'
            />

            <Offer
                name='Odysee Resort'
                location='Tunezja, Tunis'
                rating='4.7/5'
                pricePerPerson={2199}
                photoURL='https://picsum.photos/id/386/400/200'
            />
        </div>
    );
}
