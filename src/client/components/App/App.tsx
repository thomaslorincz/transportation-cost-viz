import * as React from 'react';
import * as d3 from 'd3-fetch';
import './App.css';

import { MapView, ResidenceFeature, ZoneFeature } from '../MapView/MapView';

interface State {
  loading: boolean;
  hovered: number;
  hoverX: number;
  hoverY: number;
  colours: number[][];
  zoneToColour: Map<number, number>;
}

export class App extends React.Component<{}, State> {
  private residences: ResidenceFeature[];
  private zones: ZoneFeature[];

  private costRanges = new Map<number, number>([
    [0, 499],
    [500, 749],
    [750, 1000],
    [1000, Number.MAX_SAFE_INTEGER]
  ]);

  private proportionRanges = new Map<number, number>([
    [0, 4],
    [5, 9],
    [10, 14],
    [15, Number.MAX_SAFE_INTEGER]
  ]);

  private scenarioSequence = new Map<string, string>([
    ['now', 'bap'],
    ['bap', 'preferred'],
    ['preferred', 'now']
  ]);

  public constructor(props) {
    super(props);

    this.state = {
      loading: true,
      hovered: null,
      hoverX: 0,
      hoverY: 0,
      colours: [
        [35, 69, 178, 255],
        [186, 27, 186, 255],
        [255, 65, 17, 255],
        [255, 204, 0, 255]
      ],
      zoneToColour: new Map<number, number>()
    };

    Promise.all([d3.json('./residences.json'), d3.json('./zones.json')]).then(
      ([residences, zones]): void => {
        this.residences = residences as ResidenceFeature[];
        this.zones = zones as ZoneFeature[];

        const zoneToColour = new Map<number, number>();
        for (const zone of zones) {
          zoneToColour.set(zone.properties.id, 0);
        }

        this.setState({ loading: false, zoneToColour });
      }
    );
  }

  private invertColours(): void {
    this.setState({ colours: this.state.colours.reverse() });
  }

  private handleMapHover(feature: ZoneFeature, x: number, y: number): void {
    if (feature) {
      this.setState({ hovered: feature.properties.id, hoverX: x, hoverY: y });
    }
  }

  public render(): React.ReactNode {
    return (
      <React.Fragment>
        <MapView
          residences={this.residences}
          zones={this.zones}
          hovered={this.state.hovered}
          colours={this.state.colours}
          zoneToColour={this.state.zoneToColour}
          onHover={(feature, x, y): void => this.handleMapHover(feature, x, y)}
        />
      </React.Fragment>
    );
  }
}
