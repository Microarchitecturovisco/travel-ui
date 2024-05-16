import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Offers from "./offers/screens/Offers";
import NotFound from "./core/screens/NotFound";
import Navbar from './core/components/Navbar';
import Home from "./core/screens/Home";
import OfferDetails from "./offers/screens/OfferDetails";

function App() {
    return (
        <Router>
            <Navbar/>
            <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/offers' element={<Offers/>}/>
                <Route path='/offerDetails' element={<OfferDetails/>}/>
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
    );
}

export default App;
