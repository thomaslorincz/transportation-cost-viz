import * as React from 'react';
import * as d3 from 'd3-fetch';
import './App.css';

import { MapView } from '../MapView/MapView';

export interface Household {
  lon: number;
  lat: number;
  cost: number; // Cost per month (rounded to nearest dollar)
  proportion: number; // Proportion of income spent on transportation
}

interface Scenario {
  id: string;
  file: string;
  label: string;
  data: Household[];
}

interface State {
  loading: boolean;
  hovered: number;
  hoverX: number;
  hoverY: number;
  colours: number[][];
  households: Household[];
}

export class App extends React.Component<{}, State> {
  private scenarios: Map<string, Scenario> = new Map<string, Scenario>();
  private activeScenario: string;

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

  private scenarioSequence: Map<string, string>;

  public constructor(props) {
    super(props);

    this.state = {
      loading: true,
      hovered: null,
      hoverX: 0,
      hoverY: 0,
      colours: [
        [0, 0, 0, 0],
        [35, 69, 178, 255],
        [186, 27, 186, 255],
        [255, 65, 17, 255],
        [255, 204, 0, 255]
      ],
      households: []
    };

    Promise.all([d3.csv('./scenario_config.csv')]).then(([config]) => {
      this.scenarioSequence = new Map<string, string>();

      let lastEntryId = '';
      config.forEach(
        (entry: { file: string; id: string; label: string }, i: number) => {
          this.scenarios.set(entry.id, {
            id: entry.id,
            file: entry.file,
            label: entry.label,
            data: []
          });

          if (i === 0) {
            this.activeScenario = entry.id;
            lastEntryId = entry.id;
          } else if (i === config.length - 1) {
            this.scenarioSequence.set(entry.id, config[0].id);
          } else {
            this.scenarioSequence.set(lastEntryId, entry.id);
            lastEntryId = entry.id;
          }
        }
      );

      this.scenarios.forEach((scenario: Scenario) => {
        d3.csv(scenario.file).then((data: Household[]) => {
          data.forEach((household: Household) => {
            scenario.data.push({
              lon: +household.lon,
              lat: +household.lat,
              cost: +household.cost,
              proportion: +household.proportion
            });
          });
        });
      });

      this.setState({
        loading: false,
        households: this.scenarios.get(this.activeScenario).data
      });
    });
  }

  private invertColours(): void {
    const colours = [];
    colours.push(this.state.colours[0]);
    colours.push(this.state.colours.slice(1).reverse());
    this.setState({ colours });
  }

  public render(): React.ReactNode {
    return (
      <React.Fragment>
        <MapView households={this.state.households} />
      </React.Fragment>
    );
  }
}
