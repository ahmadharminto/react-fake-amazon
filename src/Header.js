import React from 'react'
import './Header.scss'
import SearchIcon from "@material-ui/icons/Search"
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket"
import { Link } from 'react-router-dom'
import { useStateValue } from './StateProvider'
import { auth } from './firebase'

export default function Header() {
    const [{ user, basket }, dispatch] = useStateValue()

    const handleLogin = () => {
        if (user) {
            auth.signOut();
        }
    }

    return (
        <div className="header">
            <Link to="/">
                <img src="https://pngimg.com/uploads/amazon/amazon_PNG11.png" className="header__logo" />
            </Link>
            <div className="header__search">
                <input type="text" className="header__searchInput" />
                <SearchIcon className="header__searchIcon" />
            </div>
            <div className="header__nav">
                <Link to={user ? '/' : '/login'}>
                    <div className="header__option" onClick={handleLogin}>
                        <span className="header__optionLineOne">Hello {user ? user.email : 'Guest'}</span>
                        <span className="header__optionLineTwo">{user ? 'Sign Out' : 'Sign In'}</span>
                    </div>
                </Link>
                <Link to="/orders">
                    <div className="header__option">
                        <span className="header__optionLineOne">Return</span>
                        <span className="header__optionLineTwo">& Orders</span>
                    </div>
                </Link>
                <a href="https://github.com/ahmadharminto/react-fake-amazon">
                    <div className="header__option">
                        <span className="header__optionLineOne">Your</span>
                        <span className="header__optionLineTwo">Prime</span>
                    </div>
                </a>
                <Link to="/checkout">
                    <div className="header__optionBasket">
                        <ShoppingBasketIcon />
                        <span className="header__optionLineTwo header__basketCount">{ basket?.length }</span>
                    </div>
                </Link>
            </div>
        </div>
    )
}
