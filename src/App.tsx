import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Offers from "./offers/screens/Offers";
import NotFound from "./core/screens/NotFound";
import Navbar from './core/components/Navbar';

function App() {
    return (
        <Router>
            <Navbar/>
            <Routes>
                <Route path='/' element={<Offers/>}/>
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
    );
}

export default App;
