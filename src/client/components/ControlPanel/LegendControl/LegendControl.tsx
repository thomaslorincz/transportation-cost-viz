import * as React from 'react';
import '../Control.css';

interface Props {
  scenarios: [string, string][];
}

export class LegendControl extends React.Component<Props, {}> {
  public render(): React.ReactNode {
    return (
      <div className="control legend-control">
        <div className="title">Legend</div>
        <div className="divider" />
        {/* Scenario Section */}
        <div className="control-entry-container">
          {this.props.scenarios.map(([id, label]) => {
            return (
              <div
                id={`${id}-entry`}
                className="control-entry scenario-entry selectable"
                key={id}
                data-value={id}
              >
                <i className="material-icons">trending_up</i>
                <div className="entry-label">{label}</div>
              </div>
            );
          })}
          <div id="scenario-animate" className="control-entry selectable">
            <i className="material-icons">play_circle_outline</i>
            <div className="entry-label">Animate</div>
          </div>
        </div>
        <div className="divider" />
        {/* Data Metric (Cost/Proportion) Section */}
        <div className="control-entry-container">
          <div
            id="cost-entry"
            className="control-entry property-entry selectable"
            data-value="cost"
          >
            <i className="material-icons">attach_money</i>
            <div className="entry-label">Transportation Cost</div>
          </div>
          <div
            id="proportion-entry"
            className="control-entry property-entry selectable"
            data-value="proportion"
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
            <i className="material-icons coloured yellow-colour">lens</i>
            <div id="first-bin" className="entry-label" />
          </div>
          <div className="control-entry">
            <i className="material-icons coloured red-colour">lens</i>
            <div id="second-bin" className="entry-label" />
          </div>
          <div className="control-entry">
            <i className="material-icons coloured purple-colour">lens</i>
            <div id="third-bin" className="entry-label" />
          </div>
          <div className="control-entry">
            <i className="material-icons coloured blue-colour">lens</i>
            <div id="fourth-bin" className="entry-label" />
          </div>
          <div id="invert-colours" className="control-entry selectable">
            <i className="material-icons">invert_colors</i>
            <div className="entry-label">Invert Colours</div>
          </div>
        </div>
      </div>
    );
  }
}
