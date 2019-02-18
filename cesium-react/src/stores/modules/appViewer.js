import { observable, action } from 'mobx';

const cesiumAccessToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJiOGQ2NzAwYS05MDY4LTRmYzMtYTcxZi0wNjNiYmE3MGM5OWYiLCJpZCI6NTc3Nywic2NvcGVzIjpbImFzciIsImdjIl0sImlhdCI6MTU0NDE1MzY1NH0.wVfPywSemmFgFwPErzK5ovEqAcrXFNsfr59leudVLsI';
const td_img_imageryProvider = {
  url:
    'http://t0.tianditu.gov.cn/img_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=img&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default&format=tiles&tk=e60679f6e9718d3426f745fd8cd94cbd',
  layer: 'tdtBasicLayer',
  style: 'default',
  format: 'image/jpeg',
  tileMatrixSetID: 'GoogleMapsCompatible'
};
const td_cia_imageryProvider = {
  url:
    'http://t0.tianditu.gov.cn/cia_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=cia&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default.jpg&tk=e60679f6e9718d3426f745fd8cd94cbd',
  layer: 'tdtAnnoLayer',
  style: 'default',
  format: 'image/jpeg',
  tileMatrixSetID: 'GoogleMapsCompatible'
};
const geoJsonData = {
  type: 'Feature',
  properties: {
    name: 'Coors Field',
    amenity: 'Baseball Stadium',
    popupContent: 'This is where the Rockies play!'
  },
  geometry: {
    type: 'Point',
    coordinates: [104.99404, 39.75621]
  }
};
const czmlData = [
  {
    id: 'document',
    name: 'box',
    version: '1.0'
  },
  {
    id: 'shape1',
    name: 'Blue box',
    position: {
      cartographicDegrees: [-114.0, 40.0, 300000.0]
    },
    box: {
      dimensions: {
        cartesian: [400000.0, 300000.0, 500000.0]
      },
      material: {
        solidColor: {
          color: {
            rgba: [0, 0, 255, 255]
          }
        }
      }
    }
  },
  {
    id: 'shape2',
    name: 'Red box with black outline',
    position: {
      cartographicDegrees: [-107.0, 40.0, 300000.0]
    },
    box: {
      dimensions: {
        cartesian: [400000.0, 300000.0, 500000.0]
      },
      material: {
        solidColor: {
          color: {
            rgba: [255, 0, 0, 128]
          }
        }
      },
      outline: true,
      outlineColor: {
        rgba: [0, 0, 0, 255]
      }
    }
  },
  {
    id: 'shape3',
    name: 'Yellow box outline',
    position: {
      cartographicDegrees: [-100.0, 40.0, 300000.0]
    },
    box: {
      dimensions: {
        cartesian: [400000.0, 300000.0, 500000.0]
      },
      fill: false,
      outline: true,
      outlineColor: {
        rgba: [255, 255, 0, 255]
      }
    }
  }
];
const destination = null;

class AppViewer {
  cesiumAccessToken = cesiumAccessToken;
  td_img_imageryProvider = td_img_imageryProvider;
  td_cia_imageryProvider = td_cia_imageryProvider;
  czmlData = czmlData;
  geoJsonData = geoJsonData;
  @observable destination = destination;

  @action
  setDestination = destination => (this.destination = destination);
}

export default new AppViewer();
