import * as React from 'react';
import './MapView.css';

import { Household } from '../App/App';
import DeckGL from '@deck.gl/react';
import { ScatterplotLayer } from '@deck.gl/layers';
import { StaticMap } from 'react-map-gl';

export interface Feature {
  type: string;
  properties: { id: number };
  geometry: { type: string; coordinates: number[] };
}

interface Props {
  households: Household[];
}

export class MapView extends React.Component<Props, {}> {
  public componentDidMount(): void {
    // Prevent a context menu from appearing on right-click
    document
      .getElementById('deckgl-wrapper')
      .addEventListener('contextmenu', event => event.preventDefault());
  }

  public render(): React.ReactNode {
    const { households } = this.props;

    return (
      <div className="map">
        <DeckGL
          layers={[
            new ScatterplotLayer({
              id: 'households',
              data: households,
              pickable: false,
              getPosition: (hh: Household): number[] => [hh.lon, hh.lat]
            })
          ]}
          initialViewState={{
            longitude: -113.4938,
            latitude: 53.5461,
            zoom: 8,
            pitch: 0,
            bearing: 0
          }}
          controller={true}
        >
          <StaticMap
            resuseMaps
            mapStyle="mapbox://styles/mapbox/dark-v9"
            preventStyleDiffing={true}
            mapboxApiAccessToken={process.env.MAPBOX_TOKEN}
          />
        </DeckGL>
      </div>
    );
  }
}