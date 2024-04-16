
import SearchIcon from '@mui/icons-material/Search';

export default function Home () {
    return(
        <div
            className='flex flex-col px-20 py-44 items-center homeContainer'
        >
            <div className='flex flex-col text-center gap-8 mb-16'>
                <h1 className='text-5xl font-bold tracking-wide text-gray-900'>Explore. Discover. Travel.</h1>
                <h3 className='text-gray-700'>Explore our handpicked experiences, delving into the world's most
                    captivating destinations and unforgettable accommodations.</h3>
            </div>

            <div className='flex items-center gap-10 rounded-xl border-gray-400 px-6 py-2' style={{borderWidth: 1,}}>
                <span className='text-red-500 font-bold text-xs'>WIP</span>
                <span className='text-lg'>Destination</span>
                <span className='text-lg'>Guests</span>
                <span className='text-lg'>When</span>
                <span className='text-lg'>From</span>
                <SearchIcon style={{fontSize: 24}}/>
            </div>
        </div>
    );
}
