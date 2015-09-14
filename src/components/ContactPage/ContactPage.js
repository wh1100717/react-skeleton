import React, { PropTypes, Component } from 'react'
import styles from './ContactPage.css'
import withStyles from '../../utils/withStyles'

@withStyles(styles)
class ContactPage extends Component {

  static contextTypes = {
    onSetTitle: PropTypes.func.isRequired
  }

  render() {
    let title = 'Contact Us'
    this.context.onSetTitle(title)
    return (
      <div className="ContactPage">
        <div className="ContactPage-container">
          <h1>{title}</h1>
          <p>...</p>
        </div>
      </div>
    )
  }

}

export default ContactPage
