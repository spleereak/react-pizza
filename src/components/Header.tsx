import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import logoSvg from '../assets/img/pizza-logo.svg'
import cartSvg from '../assets/img/cart.svg'
import { Search } from './Search'
import { useSelector } from 'react-redux'
import { selectCart } from '../redux/cart/selectors'

export const Header: React.FC = () => {
  const { totalPrice, items } = useSelector(selectCart);
  const location = useLocation();

  const totalCount = items.reduce((sum: number, item: {
    count: number
  }) => sum + item.count, 0);

  React.useEffect(() => {
    if (items.length > 0) {
      const json = JSON.stringify(items);
      localStorage.setItem('cart', json);
    } else {
      localStorage.setItem('cart', "[]");
    }
  }, [items])

  return (
    <div className="header">
      <div className="container">
        <Link to='/'>
          <div className="header__logo">
            <img width="38" src={logoSvg} alt="Pizza logo" />
            <div>
              <h1>React Pizza</h1>
              <p>самая вкусная пицца во вселенной</p>
            </div>
          </div>
        </Link>
        {location.pathname !== '/cart' && <Search />}
        {location.pathname !== '/cart' && <div className="header__cart">
          <Link to='/cart' className='button button--cart'>
            <span>{totalPrice} ₽</span>
            <div className="button__delimiter"></div>
            <img src={cartSvg} width="18" height="18" alt='CartImg' />
            <span>{totalCount}</span>
          </Link>          
        </div>}
      </div>
    </div>    
  )
}