import React, { Component } from 'react'
import styles from './Header.css'
import Link from '../Link'
import Navigation from '../Navigation'
import withStyles from '../../utils/withStyles'

@withStyles(styles)
class Header extends Component {

  render() {
    return (
      <div className="Header">
        <div className="Header-container">
          <a className="Header-brand" href="/" onClick={Link.handleClick}>
            <img className="Header-brandImg" src={require('./logo-small.png')} width="38" height="38" alt="React" />
            <span className="Header-brandTxt">React Test Demo</span>
          </a>
          <Navigation className="Header-nav" />
          <div className="Header-banner">
            <h1 className="Header-bannerTitle">React</h1>
          </div>
        </div>
      </div>
    )
  }

}

export default Header
