import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import { Ion, Cartesian3, CesiumTerrainProvider, IonResource, WebMapTileServiceImageryProvider } from 'cesium';
import { Viewer, Entity, PointGraphics, EntityDescription, GeoJsonDataSource, Cesium3DTileset } from 'resium';

Ion.defaultAccessToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJiOGQ2NzAwYS05MDY4LTRmYzMtYTcxZi0wNjNiYmE3MGM5OWYiLCJpZCI6NTc3Nywic2NvcGVzIjpbImFzciIsImdjIl0sImlhdCI6MTU0NDE1MzY1NH0.wVfPywSemmFgFwPErzK5ovEqAcrXFNsfr59leudVLsI';
const data = {
  type: 'Feature',
  properties: {
    name: 'Coors Field',
    amenity: 'Baseball Stadium',
    popupContent: 'This is where the Rockies play!'
  },
  geometry: {
    type: 'Point',
    coordinates: [-104.99404, 39.75621]
  }
};
const terrainProvider = new CesiumTerrainProvider({
  url: IonResource.fromAssetId(3956)
});
const imageryProvider = new WebMapTileServiceImageryProvider({
  url:
    'http://t0.tianditu.gov.cn/img_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=img&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default&format=tiles&tk=e60679f6e9718d3426f745fd8cd94cbd',
  layer: 'tdtBasicLayer',
  style: 'default',
  format: 'image/jpeg',
  tileMatrixSetID: 'GoogleMapsCompatible'
});
const position = Cartesian3.fromDegrees(-74.0707383, 40.7117244, 100);

class App extends Component {
  constructor() {
    super();
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
    return (
      <Viewer
        full
        animation={false}
        baseLayerPicker={false}
        timeline={false}
        geocoder={false}
        // imageryProvider={imageryProvider}
        terrainProvider={terrainProvider}
        ref={e => {
          this.viewer = e && e.cesiumElement;
        }}
      >
        <Entity name="Tokyo" position={position}>
          <PointGraphics pixelSize={20} />
          <EntityDescription>
            <h1>Hello, world.</h1>
            <p>JSX is available here!</p>
          </EntityDescription>
        </Entity>
        <GeoJsonDataSource data={data} />
        {/* <Cesium3DTileset url={IonResource.fromAssetId(5714)} onReady={this._handleReady.bind(this)} /> */}
      </Viewer>
    );
  }
}

export default hot(module)(App);
