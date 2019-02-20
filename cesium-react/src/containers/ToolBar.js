import React, { Component } from 'react';
import Button from 'antd/lib/button';
import { geoJsonData, czmlData } from '../data';
import { inject } from 'mobx-react';

@inject('appViewer')
class ToolBar extends Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {}

  render() {
    const { setCzmlData, setGeoJsonData } = this.props.appViewer;
    return (
      <>
        <Button
          type="primary"
          onClick={event => {
            setCzmlData(czmlData);
          }}
        >
          Render czml and fly to
        </Button>
        <Button
          type="primary"
          style={{ marginLeft: '10px' }}
          onClick={event => {
            setGeoJsonData(geoJsonData);
          }}
        >
          Render geojson and fly to
        </Button>
      </>
    );
  }
}

export default ToolBar;
