import * as React from 'react';
import '../Control.css';

export class StatisticsControl extends React.Component<{}, {}> {
  public render(): React.ReactNode {
    return (
      <div className="control statistics-control">
        <div className="title">Statistics</div>
        <div className="divider" />
        <div className="chart-container">
          <svg
            id="bar-chart"
            className="chart"
            width="240"
            height="240"
            viewBox="0 0 240 240"
            xmlns="http://www.w3.org/2000/svg"
          />
        </div>
      </div>
    );
  }
}
