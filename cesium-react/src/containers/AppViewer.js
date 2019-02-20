import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { hot } from 'react-hot-loader';
import { Ion, Cartesian3, CesiumTerrainProvider, IonResource, WebMapTileServiceImageryProvider, Color } from 'cesium';
import { Viewer, Entity, PointGraphics, EntityDescription, CameraFlyTo, Cesium3DTileset } from 'resium';
import ImageryLayers from './ImageryLayers';
import GeoJson from './GeoJson';
import Czml from './Czml';

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
    console.log(tileset);

    if (this.viewer) {
      this.viewer.zoomTo(tileset);
    }
  }

  render() {
    const td_img_imageryProvider = new WebMapTileServiceImageryProvider(this.props.appViewer.td_img_imageryProvider);
    const td_cia_imageryProvider = new WebMapTileServiceImageryProvider(this.props.appViewer.td_cia_imageryProvider);
    const imageryProviders = [td_img_imageryProvider, td_cia_imageryProvider];
    const geoJsonData = this.props.appViewer.geoJsonData;
    const destination = this.props.appViewer.destination;
    const terrainProvider = new CesiumTerrainProvider({
      url: IonResource.fromAssetId(3956)
    });
    const czmlData = this.props.appViewer.czmlData;
    const entityPosition = Cartesian3.fromDegrees(105.0707383, 30.7117244, 100);

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
        <ImageryLayers imageryProviders={imageryProviders} />
        {/* <ImageryLayer imageryProvider={td_img_imageryProvider} /> */}
        {/* <ImageryLayer imageryProvider={td_cia_imageryProvider} /> */}
        {destination ? <CameraFlyTo destination={destination} /> : null}
        <Entity name="Sokyo" position={entityPosition}>
          <PointGraphics pixelSize={25} color={Color.CRIMSON} outlineWidth={5} outlineColor={Color.LIGHTCORAL} />
          <EntityDescription>
            <h1>Hello, world.</h1>
            <p>JSX is available here!</p>
          </EntityDescription>
        </Entity>
        <GeoJson geoJsonData={geoJsonData} />
        <Czml czmlData={czmlData} />
        {/* <Cesium3DTileset url={IonResource.fromAssetId(5714)} onReady={this._handleReady.bind(this)} /> */}
      </Viewer>
    );
  }
}

export default AppViewer;
