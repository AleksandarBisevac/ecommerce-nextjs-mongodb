import React, { useContext } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { DataContext } from '../store/GlobalState';
import Cookie from 'js-cookie';

function NavBar() {
  const router = useRouter();
  const { state, dispatch } = useContext(DataContext);
  const { auth } = state;

  const isActive = (routeRef) => {
    if (routeRef === router.pathname) {
      return 'active';
    }
    return '';
  };

  const handleLogut = () => {
    Cookie.remove('refreshtoken', { path: 'api/auth/accessToken' });
    localStorage.removeItem('firstLogin');
    dispatch({ type: 'AUTH', payload: {} });
    dispatch({ type: 'NOTIFY', payload: { success: 'Logged out' } });
  };

  const loggedRouter = () => {
    return (
      <li className='nav-item dropdown'>
        <a
          className='nav-link dropdown-toggle text-end'
          href='#'
          id='navbarDropdownMenuLink'
          role='button'
          data-bs-toggle='dropdown'
          aria-expanded='false'
        >
          <img
            src={auth.user.avatar}
            alt={auth.user.avatar}
            style={{
              borderRadius: '50%',
              width: '30px',
              height: '30px',
              transform: 'translateY(-3px)',
              marginRight: '3px',
            }}
          />
          User Name
        </a>
        <div className='dropdown-menu' aria-labelledby='navbarDropdownMenuLink'>
          <a className='dropdown-item' href='#'>
            Profile
          </a>

          <button className='dropdown-item' onClick={handleLogut}>
            Logout
          </button>
        </div>
      </li>
    );
  };

  return (
    <nav className='navbar navbar-expand-lg navbar-light bg-light'>
      <div className='container-fluid'>
        <Link href='/'>
          <a className='navbar-brand'>BeerDuke</a>
        </Link>

        <Link href='/about'>
          <a className={'nav item nav-link' + ' ' + isActive('/about')}>
            About BeerDuke
          </a>
        </Link>

        <button
          className='navbar-toggler'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#navbarNavDropdown'
          aria-controls='navbarNavDropdown'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </button>
        <div
          className='collapse navbar-collapse justify-content-end'
          id='navbarNavDropdown'
        >
          <ul className='navbar-nav d-flex justify-content-end align-items-end'>
            <li className='nav-item'>
              <Link href='/cart'>
                <a className={'nav-link' + ' ' + isActive('/cart')}>
                  <i className='fa fa-shopping-cart' aria-hidden='true'></i>{' '}
                  Cart
                </a>
              </Link>
            </li>
            {Object.keys(auth).length === 0 ? (
              <li className='nav-item'>
                <Link href='/login'>
                  <a className={'nav-link' + ' ' + isActive('/login')}>
                    <i className='fa fa-user' aria-hidden='true'></i> Sign In
                  </a>
                </Link>
              </li>
            ) : (
              loggedRouter()
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
