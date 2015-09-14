import React, { PropTypes, Component } from 'react'
import styles from './App.css'
import Header from '../Header'
import Feedback from '../Feedback'
import Footer from '../Footer'
import withContext from '../../utils/withContext'
import withStyles from '../../utils/withStyles'

@withContext
@withStyles(styles)
class App extends Component {

  static propTypes = {
    children: PropTypes.element.isRequired,
    error: PropTypes.object
  }

  render() {
    return !this.props.error ? (
      <div>
        <Header />
        {this.props.children}
        <Feedback />
        <Footer />
      </div>
    ) : this.props.children
  }

}

export default App
