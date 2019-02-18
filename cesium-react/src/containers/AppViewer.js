import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { hot } from 'react-hot-loader';
import { Ion, Cartesian3, CesiumTerrainProvider, IonResource, WebMapTileServiceImageryProvider } from 'cesium';
import {
  Viewer,
  ImageryLayer,
  Entity,
  PointGraphics,
  EntityDescription,
  GeoJsonDataSource,
  CzmlDataSource,
  CameraFlyTo,
  Cesium3DTileset
} from 'resium';

Ion.defaultAccessToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJiOGQ2NzAwYS05MDY4LTRmYzMtYTcxZi0wNjNiYmE3MGM5OWYiLCJpZCI6NTc3Nywic2NvcGVzIjpbImFzciIsImdjIl0sImlhdCI6MTU0NDE1MzY1NH0.wVfPywSemmFgFwPErzK5ovEqAcrXFNsfr59leudVLsI';

@inject('appViewer')
@observer
class AppViewer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewer: null
    };
  }

  componentDidMount() {
    if (this.viewer) {
      this.viewer.scene.debugShowFramesPerSecond = true;
      // this.viewer.cesiumWidget.creditContainer.style.display = 'none';
    }
  }

  _handleReady(tileset) {
    if (this.viewer) {
      this.viewer.zoomTo(tileset);
    }
  }

  render() {
    const td_img_imageryProvider = new WebMapTileServiceImageryProvider(this.props.appViewer.td_img_imageryProvider);
    const td_cia_imageryProvider = new WebMapTileServiceImageryProvider(this.props.appViewer.td_cia_imageryProvider);
    const geoJsonData = this.props.appViewer.geoJsonData;
    const terrainProvider = new CesiumTerrainProvider({
      url: IonResource.fromAssetId(3956)
    });
    const czmlData = this.props.appViewer.czmlData;
    const entityPosition = Cartesian3.fromDegrees(104.0707383, 40.7117244, 100);

    return (
      <Viewer
        full
        animation={false}
        baseLayerPicker={false}
        timeline={false}
        geocoder={false}
        // terrainProvider={terrainProvider}
        ref={e => {
          this.viewer = e && e.cesiumElement;
        }}
      >
        <ImageryLayer imageryProvider={td_img_imageryProvider} maximumTerrainLevel={16} />
        <ImageryLayer imageryProvider={td_cia_imageryProvider} maximumTerrainLevel={16} />
        {this.props.appViewer.destination ? <CameraFlyTo destination={this.props.appViewer.destination} /> : null}
        <Entity name="Sokyo" position={entityPosition}>
          <PointGraphics pixelSize={20} />
          <EntityDescription>
            <h1>Hello, world.</h1>
            <p>JSX is available here!</p>
          </EntityDescription>
        </Entity>
        <GeoJsonDataSource data={geoJsonData} />
        <CzmlDataSource data={czmlData} />
        {/* <Cesium3DTileset url={IonResource.fromAssetId(5714)} onReady={this._handleReady.bind(this)} /> */}
      </Viewer>
    );
  }
}

export default AppViewer;
