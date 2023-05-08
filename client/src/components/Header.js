import './Header.css';
import { Route, Link as RouterLink } from 'react-router-dom';
import useToken from 'hooks/useToken';

function Header() {
    const {token, setToken} = useToken();
    return(
        <header className="Header">
            <img src='2a.png' alt='DonationPal' draggable="false" />
            <nav>
                <RouterLink to='/' className='Header-link'>Home</RouterLink>
                <RouterLink to='/me' className='Header-link'>My Profile</RouterLink>
                { token ?
                <RouterLink to='/logout' className='Header-link'>Log Out</RouterLink>:
                <RouterLink to='/login' className='Header-link'>Log In</RouterLink>
                }
            </nav>
        </header>
    );
}

export default Header;