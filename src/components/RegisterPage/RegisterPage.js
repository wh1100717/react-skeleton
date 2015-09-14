import React, { PropTypes, Component } from 'react'
import styles from './RegisterPage.css'
import withStyles from '../../utils/withStyles'

@withStyles(styles)
class RegisterPage extends Component {

  static contextTypes = {
    onSetTitle: PropTypes.func.isRequired
  }

  render() {
    let title = 'New User Registration'
    this.context.onSetTitle(title)
    return (
      <div className="RegisterPage">
        <div className="RegisterPage-container">
          <h1>{title}</h1>
          <p>...</p>
        </div>
      </div>
    )
  }

}

export default RegisterPage
