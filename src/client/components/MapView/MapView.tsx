import * as React from 'react';
import './MapView.css';

import DeckGL from '@deck.gl/react';
import { GeoJsonLayer } from '@deck.gl/layers';
import { StaticMap } from 'react-map-gl';

interface Feature {
  type: string;
  geometry: { type: string; coordinates: number[] };
}

export interface ResidenceFeature extends Feature {
  properties: { zone: number };
}

export interface ZoneFeature extends Feature {
  properties: { id: number };
}

interface Props {
  residences: ResidenceFeature[];
  zones: ZoneFeature[];
  hovered: number; // The ID of the hovered ZoneFeature
  colours: number[][]; // Array of [r, g, b, a]
  zoneToColour: Map<number, number>; // Zone ID to index in colours array
  onHover: Function;
}

export class MapView extends React.Component<Props, {}> {
  public componentDidMount(): void {
    // Prevent a context menu from appearing on right-click
    document
      .getElementById('deckgl-wrapper')
      .addEventListener('contextmenu', event => event.preventDefault());
  }

  public render(): React.ReactNode {
    const { residences, zones, hovered, colours, zoneToColour } = this.props;

    return (
      <div className="map">
        <DeckGL
          layers={[
            new GeoJsonLayer({
              id: 'residences',
              data: residences,
              pickable: false,
              stroked: false,
              filled: true,
              extruded: false,
              getFillColor: (f: ResidenceFeature): number[] => {
                return colours[zoneToColour.get(f.properties.zone)];
              }
            }),
            new GeoJsonLayer({
              id: 'zones',
              data: zones,
              pickable: true,
              stroked: true,
              filled: false,
              extruded: false,
              getLineColor: (f: ZoneFeature): number[] => {
                if (f.properties.id === hovered) {
                  return [0, 0, 255, 255];
                } else {
                  return [255, 255, 255, 128];
                }
              },
              onHover: (info): void => {
                if (info.object) {
                  this.props.onHover(info.object, info.x, info.y);
                } else {
                  this.props.onHover(null, info.x, info.y);
                }
              }
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
            mapStyle="mapbox://styles/mapbox/dark-v9"
            preventStyleDiffing={true}
            mapboxApiAccessToken={process.env.MAPBOX_TOKEN}
          />
        </DeckGL>
      </div>
    );
  }
}
