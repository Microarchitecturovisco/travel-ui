import {useState} from "react";
import {useLocation} from "react-router-dom";
import Countdown from "react-countdown";

const BuyOffer = () => {

    const location = useLocation();

    const [idHotel, setIdHotel] = useState(location.state.idHotel);

    const [transactionEnded, setTransactionEnded] = useState(false);

    return (
        <div className='flex flex-col px-96 py-12'>
            <p className='text-lg mb-6'>Buying offer with id hotel {idHotel}</p>


            {!transactionEnded &&
                <div className='flex flex-col gap-3'>
                    <p>Time to pay for offer:</p>
                    <Countdown
                        date={Date.now() + 60000}
                        onComplete={() => {
                            setTransactionEnded(true)
                        }}
                    />
                </div>
            }

            {transactionEnded &&
                <p className='text-xl mt-2 text-red-500'>Time for the transaction has ended!</p>
            }
        </div>
    );
}

export default BuyOffer;
