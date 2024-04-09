import './App.css';
// @ts-ignore
import logo from './logo.svg';
import {Button} from "@mui/material";

function App() {
    return (
        <div className="App">
            <header className="App-header gap-4">
                <img src={logo} className="App-logo" alt="logo"/>
                <p className='text-xl'>
                    Edit <code>src/App.tsx</code> and save to reload.
                </p>
                <Button size='medium' variant='contained' className='mb-12'>Material UI test</Button>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>
            </header>
        </div>
    );
}

export default App;
