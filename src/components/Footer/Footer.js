import React, { PropTypes, Component } from 'react'
import styles from './Footer.css'
import withViewport from '../../decorators/withViewport'
import withStyles from '../../decorators/withStyles'
import Link from '../Link'

@withViewport
@withStyles(styles)
class Footer extends Component {

  static propTypes = {
    viewport: PropTypes.shape({
      width: PropTypes.number.isRequired,
      height: PropTypes.number.isRequired
    }).isRequired
  }

  render() {
    // This is just an example how one can render CSS
    let { width, height } = this.props.viewport
    this.renderCss(`.Footer-viewport:after {content:' ${width}x${height}'}`)

    return (
      <div className="Footer">
        <div className="Footer-container">
          <span ref="viewport" className="Footer-viewport Footer-text Footer-text--muted">Viewport:</span>
        </div>
      </div>
    )
  }

}

export default Footer
