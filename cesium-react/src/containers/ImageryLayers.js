import React from 'react';
import { ImageryLayer, ImageryLayerCollection } from 'resium';

const ImageryLayers = ({ imageryProviders }) => {
  return (
    <ImageryLayerCollection>
      {imageryProviders.map((imageryProvider, i) => {
        return <ImageryLayer key={i} imageryProvider={imageryProvider} />;
      })}
    </ImageryLayerCollection>
  );
};

export default ImageryLayers;
