import React, { Component } from 'react';
import Button from 'antd/lib/button';
import { inject } from 'mobx-react';

@inject('appViewer')
class ToolBar extends Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {}

  render() {
    const { setDestination } = this.props.appViewer;
    return (
      <>
        <Button
          type="primary"
          onClick={event => {
            setDestination({ x: -2083516.9683773473, y: -4679655.730028949, z: 4270821.855106338 });
          }}
        >
          Fly to czml
        </Button>
        <Button
          type="primary"
          // style={'magrinLeft': "20px"}
          onClick={event => {
            setDestination({ x: -1270324.4013748607, y: 4742888.604918607, z: 4257212.8967981404 });
          }}
        >
          Fly to geojson
        </Button>
      </>
    );
  }
}

export default ToolBar;
