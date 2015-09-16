import React, { Component } from 'react'
import styles from './Toolbox.css'
import withStyles from '../../../utils/withStyles'

@withStyles(styles)
class Toolbox extends Component {

  render() {
    return (
      <div className='toolbox'>
        <ul className='toollist'>
          <li className='item'>
            <i className="fa fa-scissors"></i>
          </li>
          <li className='item'>
            <i className="fa fa-clipboard"></i>
          </li>
          <li className='item'>
            <i className="fa fa-undo"></i>
          </li>
          <li className='item'>
            <i className="fa fa-align-left"></i>
          </li>
          <li className='item'>
            <i className="fa fa-battery-three-quarters"></i>
          </li>
        </ul>
      </div>
    )
  }

}

export default Toolbox
