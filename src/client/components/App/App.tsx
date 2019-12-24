import * as React from 'react';
import * as d3 from 'd3';
import './App.css';

import { MapView } from '../MapView/MapView';
import { LegendControl } from '../ControlPanel/LegendControl/LegendControl';
import {
  StatisticsControl,
  Statistic
} from '../ControlPanel/StatisticsControl/StatisticsControl';
import { LoadingScreen } from '../LoadingScreen/LoadingScreen';

interface ConfigEntry {
  file: string;
  id: string;
  label: string;
}

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
  statistics: Statistic[];
}

export class App extends React.Component<{}, State> {
  private scenarios: Map<string, Scenario> = new Map<string, Scenario>();

  private costLabels = [
    '$0 - $499/month',
    '$500 - $749/month',
    '$750 - $999/month',
    '$1000+/month'
  ];
  private costRange = [
    [0, 499],
    [500, 749],
    [750, 1000],
    [1000, Number.MAX_SAFE_INTEGER]
  ];

  private proportionLabels = ['0% - 4%', '5% - 9%', '10% - 14%', '15%+'];
  private proportionRange = [
    [0, 4],
    [5, 9],
    [10, 14],
    [15, Number.MAX_SAFE_INTEGER]
  ];

  private scenarioSequence: Map<string, string>;

  public constructor(props) {
    super(props);

    this.state = {
      loading: true,
      animating: false,
      activeScenario: '',
      activeProperty: 'cost',
      colours: ['#FFCC00', '#FF4111', '#BA1BBA', '#2345B2'],
      households: [],
      statistics: []
    };

    d3.csv('./scenario_config.csv').then(async config => {
      this.scenarioSequence = new Map<string, string>();

      let activeScenario = '';
      let lastEntryId = '';
      config.forEach((entry: ConfigEntry, i: number) => {
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
      });

      for (const [id, scenario] of this.scenarios) {
        const data = await d3.csv(scenario.file);
        data.forEach((household: Household) => {
          this.scenarios.get(id).data.push({
            lon: +household.lon,
            lat: +household.lat,
            cost: +household.cost,
            proportion: +household.proportion
          });
        });
      }

      this.updateStatistics(activeScenario, this.state.activeProperty);
      this.setState({
        loading: false,
        activeScenario,
        households: this.scenarios.get(activeScenario).data
      });
    });
  }

  private updateStatistics(scenario: string, property: string): void {
    const data = this.scenarios.get(scenario).data;
    const range = property === 'cost' ? this.costRange : this.proportionRange;

    const statistics: Statistic[] = [
      { id: 0, label: '', value: 0 },
      { id: 1, label: '', value: 0 },
      { id: 2, label: '', value: 0 },
      { id: 3, label: '', value: 0 }
    ];

    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < range.length; j++) {
        if (
          range[j][0] <= data[i][property] &&
          data[i][property] <= range[j][1]
        ) {
          statistics[j].value++;
        }
      }
    }

    if (data.length) {
      for (let id = 0; id < statistics.length; id++) {
        statistics[id].value = Math.round(
          (statistics[id].value / data.length) * 100
        );
        statistics[id].label = `${statistics[id].value}%`;
      }
    }

    this.setState({ statistics });
  }

  private handleScenarioClicked(scenario: string): void {
    this.updateStatistics(scenario, this.state.activeProperty);
    this.setState({
      activeScenario: scenario,
      households: this.scenarios.get(scenario).data
    });
  }

  private handleAnimateClicked(): void {
    this.setState({ animating: !this.state.animating });
  }

  private handlePropertyClicked(property: string): void {
    this.updateStatistics(this.state.activeScenario, property);
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
          <StatisticsControl
            data={this.state.statistics}
            colours={this.state.colours}
          />
        </div>
        <LoadingScreen loading={this.state.loading} />
      </React.Fragment>
    );
  }
}
