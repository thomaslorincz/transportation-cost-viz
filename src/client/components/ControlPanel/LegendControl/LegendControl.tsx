import * as React from 'react';
import '../Control.css';

interface Props {
  scenarios: [string, string][];
  animating: boolean;
  scenario: string;
  property: string;
  colours: string[];
  binLabels: string[];
  onScenarioClicked: Function;
  onAnimateClicked: Function;
  onPropertyClicked: Function;
  onInvertColoursClicked: Function;
}

export class LegendControl extends React.Component<Props, {}> {
  public render(): React.ReactNode {
    const {
      scenarios,
      animating,
      scenario,
      property,
      colours,
      binLabels
    } = this.props;

    return (
      <div className="control legend-control">
        <div className="title">Legend</div>
        <div className="divider" />
        {/* Scenario Section */}
        <div className="control-entry-container">
          {scenarios.map(([id, label]) => {
            return (
              <div
                id={`${id}-entry`}
                className={`control-entry selectable${
                  id === scenario ? ' selected' : ''
                }`}
                key={id}
                data-value={id}
                onClick={(): void => this.props.onScenarioClicked(id)}
              >
                <i className="material-icons">trending_up</i>
                <div className="entry-label">{label}</div>
              </div>
            );
          })}
          <div
            id="scenario-animate"
            className={`control-entry selectable${
              animating ? ' selected' : ''
            }`}
            onClick={(): void => this.props.onAnimateClicked()}
          >
            <i className="material-icons">play_circle_outline</i>
            <div className="entry-label">Animate</div>
          </div>
        </div>
        <div className="divider" />
        {/* Data Metric (Cost/Proportion) Section */}
        <div className="control-entry-container">
          <div
            id="cost-entry"
            className={`control-entry selectable${
              property === 'cost' ? ' selected' : ''
            }`}
            data-value="cost"
            onClick={(): void => this.props.onPropertyClicked('cost')}
          >
            <i className="material-icons">attach_money</i>
            <div className="entry-label">Transportation Cost</div>
          </div>
          <div
            id="proportion-entry"
            className={`control-entry selectable${
              property === 'proportion' ? ' selected' : ''
            }`}
            data-value="proportion"
            onClick={(): void => this.props.onPropertyClicked('proportion')}
          >
            <i className="material-icons">home</i>
            <div className="entry-label">
              Proportion of Income Spent on Transportation
            </div>
          </div>
        </div>
        <div className="divider" />
        {/* Legend/Colour Section */}
        <div className="control-entry-container">
          <div className="control-entry">
            <i
              className="material-icons coloured"
              style={{ color: colours[0] }}
            >
              lens
            </i>
            <div id="first-bin" className="entry-label">
              {binLabels[0]}
            </div>
          </div>
          <div className="control-entry">
            <i
              className="material-icons coloured"
              style={{ color: colours[1] }}
            >
              lens
            </i>
            <div id="second-bin" className="entry-label">
              {binLabels[1]}
            </div>
          </div>
          <div className="control-entry">
            <i
              className="material-icons coloured"
              style={{ color: colours[2] }}
            >
              lens
            </i>
            <div id="third-bin" className="entry-label">
              {binLabels[2]}
            </div>
          </div>
          <div className="control-entry">
            <i
              className="material-icons coloured"
              style={{ color: colours[3] }}
            >
              lens
            </i>
            <div id="fourth-bin" className="entry-label">
              {binLabels[3]}
            </div>
          </div>
          <div
            id="invert-colours"
            className="control-entry selectable"
            onClick={(): void => this.props.onInvertColoursClicked()}
          >
            <i className="material-icons">invert_colors</i>
            <div className="entry-label">Invert Colours</div>
          </div>
        </div>
      </div>
    );
  }
}
