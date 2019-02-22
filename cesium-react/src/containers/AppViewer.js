import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Ion, Cartesian3, CesiumTerrainProvider, IonResource, Color } from 'cesium';
import { Viewer, Entity, PointGraphics, EntityDescription, CameraFlyTo, Cesium3DTileset } from 'resium';
import appViewerStore from '@/stores/modules/appViewer';
import ImageryLayers from './ImageryLayers';
import GeoJson from './GeoJson';
import Czml from './Czml';

Ion.defaultAccessToken = appViewerStore.cesiumAccessToken

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
    const { geoJsonData,czmlData, destination, imageryProviders } = this.props.appViewer;
    const terrainProvider = new CesiumTerrainProvider({
      url: IonResource.fromAssetId(3956)
    });
    const entityPosition = Cartesian3.fromDegrees(105.0707383, 30.7117244, 100);
    console.log('AppViewer render');

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
        {destination ? <CameraFlyTo destination={destination} /> : null}
        <GeoJson geoJsonData={geoJsonData} />
        <Czml czmlData={czmlData} />
        <Entity name="Sokyo" position={entityPosition}>
          <PointGraphics pixelSize={25} color={Color.CRIMSON} outlineWidth={5} outlineColor={Color.LIGHTCORAL} />
          <EntityDescription>
            <h1>Hello, world.</h1>
            <p>JSX is available here!</p>
          </EntityDescription>
        </Entity>
        {/* <Cesium3DTileset url={IonResource.fromAssetId(5714)} onReady={this._handleReady.bind(this)} /> */}
      </Viewer>
    );
  }
}

export default AppViewer;
