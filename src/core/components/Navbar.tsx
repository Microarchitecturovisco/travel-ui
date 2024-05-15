import {Button} from "@mui/material";
// @ts-ignore
import logo from '../../assets/tourcentral.png'
import LoginIcon from '@mui/icons-material/Login';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import {Link} from "react-router-dom";

export default function Navbar () {
    return (
        <div className='flex flex-row items-center justify-between mx-6 px-6 py-2 border-b-gray-200' style={{borderBottomWidth: 1.2}}>
            <div>
                <img src={logo} style={{maxHeight: '60px', pointerEvents: 'none'}} alt="logo"/>
            </div>
            <ul className='flex flex-row gap-12'>
                <li className='flex flex-row items-center'>
                    <Link to='/offers'
                    >
                        <Button
                            variant='text'
                            endIcon={<ArrowDropDownIcon style={{color: '#333'}}/>}
                            style={{color: '#333'}}
                        >
                            Offers
                        </Button>
                    </Link>
                </li>
                <li className='flex flex-row items-center'>
                    <Button
                        variant='text'
                        endIcon={<ArrowDropDownIcon style={{color: '#333'}}/>}
                        style={{color: '#333'}}
                    >
                        Destinations
                    </Button>
                </li>

            </ul>
            <div>
                <Button variant='contained' startIcon={<LoginIcon/>}>Log in</Button>
            </div>
        </div>
    );
}
