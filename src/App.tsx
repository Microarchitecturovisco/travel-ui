import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Offers from "./offers/screens/Offers";
import NotFound from "./core/screens/NotFound";
import Navbar from './core/components/Navbar';
import Home from "./core/screens/Home";
import OfferDetails from "./offers/screens/OfferDetails";
import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {useEffect} from "react";

function App() {
    useEffect(() => {
        document.title = 'Tour Central'
    }, []);

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Router>
                <Navbar/>
                <Routes>
                    <Route path='/' element={<Home/>}/>
                    <Route path='/offers' element={<Offers/>}/>
                    <Route path='/offerDetails' element={<OfferDetails/>}/>
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Router>
        </LocalizationProvider>
    );
}

export default App;
