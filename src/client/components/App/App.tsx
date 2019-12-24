import * as React from 'react';
import * as d3 from 'd3-fetch';
import './App.css';

import { MapView } from '../MapView/MapView';
import { LegendControl } from '../ControlPanel/LegendControl/LegendControl';
import { StatisticsControl } from '../ControlPanel/StatisticsControl/StatisticsControl';
import { OverlayControl } from '../ControlPanel/OverlayControl/OverlayControl';
import { LoadingScreen } from '../LoadingScreen/LoadingScreen';

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
  animating: boolean;
  activeScenario: string;
  activeProperty: string;
  colours: string[];
  households: Household[];
}

export class App extends React.Component<{}, State> {
  private scenarios: Map<string, Scenario> = new Map<string, Scenario>();

  private costLabels = [
    '$0 - $499/month',
    '$500 - $749/month',
    '$750 - $999/month',
    '$1000+/month'
  ];
  private costRanges = new Map<number, number>([
    [0, 499],
    [500, 749],
    [750, 1000],
    [1000, Number.MAX_SAFE_INTEGER]
  ]);

  private proportionLabels = ['0% - 4%', '5% - 9%', '10% - 14%', '15%+'];
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
      animating: false,
      activeScenario: '',
      activeProperty: 'cost',
      colours: ['#FFCC00', '#FF4111', '#BA1BBA', '#2345B2'],
      households: []
    };

    Promise.all([d3.csv('./scenario_config.csv')]).then(([config]) => {
      this.scenarioSequence = new Map<string, string>();

      let activeScenario = '';
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
            activeScenario = entry.id;
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
        activeScenario,
        households: this.scenarios.get(activeScenario).data
      });
    });
  }

  private handleScenarioClicked(scenario: string): void {
    this.setState({ activeScenario: scenario });
  }

  private handleAnimateClicked(): void {
    this.setState({ animating: !this.state.animating });
  }

  private handlePropertyClicked(property: string): void {
    this.setState({ activeProperty: property });
  }

  private handleInvertColoursClicked(): void {
    this.setState({ colours: this.state.colours.reverse() });
  }

  public render(): React.ReactNode {
    const scenarios = [];
    this.scenarios.forEach((value: Scenario) => {
      scenarios.push([value.id, value.label]);
    });

    return (
      <React.Fragment>
        <MapView households={this.state.households} />
        <div className="control-panel">
          <LegendControl
            scenarios={scenarios}
            animating={this.state.animating}
            scenario={this.state.activeScenario}
            property={this.state.activeProperty}
            colours={this.state.colours}
            binLabels={
              this.state.activeProperty === 'cost'
                ? this.costLabels
                : this.proportionLabels
            }
            onScenarioClicked={(scenario): void =>
              this.handleScenarioClicked(scenario)
            }
            onAnimateClicked={(): void => this.handleAnimateClicked()}
            onPropertyClicked={(property): void =>
              this.handlePropertyClicked(property)
            }
            onInvertColoursClicked={(): void =>
              this.handleInvertColoursClicked()
            }
          />
          <StatisticsControl />
          <OverlayControl />
        </div>
        <LoadingScreen loading={this.state.loading} />
      </React.Fragment>
    );
  }
}
