import React, { Component } from 'react'
import styles from './Notebook.css'
import withStyles from '../../utils/withStyles'

import Toolbox from './Toolbox'

@withStyles(styles)
class Notebook extends Component {

  render() {
    return (
      <div className="Notebook">
        <Toolbox />
        Notebook
      </div>
    )
  }

}

export default Notebook
