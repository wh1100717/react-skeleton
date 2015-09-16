import fontawesome from '../../lib/rfontawesome/index.less'


import React, { PropTypes, Component } from 'react'
import styles from './App.css'
import Notebook from '../Notebook'
import Preview from '../Preview'
import withContext from '../../utils/withContext'
import withStyles from '../../utils/withStyles'

@withContext
@withStyles(styles)
@withStyles(fontawesome)
class App extends Component {

  static propTypes = {
    children: PropTypes.element.isRequired,
    error: PropTypes.object
  }

  render() {
    return !this.props.error ? (
      <div>
        <Notebook />
        {/*this.props.children*/}
        <Preview />
      </div>
    ) : this.props.children
  }

}

export default App
