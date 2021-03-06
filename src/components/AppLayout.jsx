import React from 'react'
import ScrollContainer from './ScrollContainer'

import theme from '../config/theme'
import colors from '../config/colors'
import { fontSizes } from '../config/scales'

class AppLayout extends React.Component {
  static propTypes = {
    toolbar: React.PropTypes.element.isRequired,
    layerList: React.PropTypes.element.isRequired,
    layerEditor: React.PropTypes.element,
    map: React.PropTypes.element.isRequired,
    bottom: React.PropTypes.element,
  }

  static childContextTypes = {
    reactIconBase: React.PropTypes.object
  }

  getChildContext() {
    return {
      reactIconBase: { size: fontSizes[3] }
    }
  }

  render() {
    return <div style={{
      fontFamily: theme.fontFamily,
      color: theme.color,
      fontWeight: 300
    }}>
      {this.props.toolbar}
      <div style={{
        position: 'fixed',
        bottom: 0,
        height: "100%",
        top: 40,
        left: 0,
        zIndex: 1,
        width: 200,
        overflow: "hidden",
        backgroundColor: colors.black
      }}>
        <ScrollContainer>
          {this.props.layerList}
        </ScrollContainer>
      </div>
      <div style={{
        position: 'fixed',
        bottom: 0,
        height: "100%",
        top: 40,
        left: 200,
        zIndex: 1,
        width: 350,
        backgroundColor: colors.black
      }}>
        <ScrollContainer>
          {this.props.layerEditor}
        </ScrollContainer>
      </div>
      {this.props.map}
      {this.props.bottom && <div style={{
          position: 'fixed',
          height: 50,
          bottom: 0,
          left: 550,
          zIndex: 1,
          width: '100%',
          backgroundColor: colors.black
        }}>
          {this.props.bottom}
        </div>
      }
    </div>
  }
}

export default AppLayout
