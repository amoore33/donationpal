import './Header.css';
import { Link as RouterLink } from 'react-router-dom';

function Header() {
    return(
        <header className="Header">
            <img src='2.png' alt='DonationPal' height={300}/>
            <nav>
                <RouterLink to='/' className='Header-link'>
                    Home
                </RouterLink>
            </nav>
        </header>
    );
}

export default Header;