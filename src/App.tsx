import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Offers from "./offers/screens/Offers";
import NotFound from "./core/screens/NotFound";

function App() {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<Offers/>}/>
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
    );
}

export default App;
