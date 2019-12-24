import * as React from 'react';
import * as d3 from 'd3';
import '../Control.css';

export interface Statistic {
  id: number;
  label: string;
  value: number;
}

interface Props {
  data: Statistic[];
  colours: string[];
}

export class StatisticsControl extends React.Component<Props, {}> {
  private readonly width: number = 240;
  private readonly height: number = 240;
  private readonly margin: number = 10;

  public render(): React.ReactNode {
    const { data, colours } = this.props;

    const x = d3
      .scaleBand()
      .domain(data.map((datum): string => datum.id.toString()))
      .range([0, this.width])
      .padding(0.2);

    const y = d3
      .scaleLinear()
      .domain([0, 50])
      .range([this.height, this.margin]);

    const svg = d3.select('#bar-chart');

    svg
      .selectAll('rect')
      .data(data)
      .join('rect')
      .attr('x', (datum): number => x(datum.id.toString()))
      .attr('width', x.bandwidth())
      .transition()
      .duration(1000)
      .attr('fill', (datum, i): string => colours[i])
      .attr('y', (datum): number => y(datum.value))
      .attr('height', (datum): number => this.height - y(datum.value));

    svg
      .selectAll('text')
      .data(data)
      .join('text')
      .attr('font-family', '"Montserrat", sans-serif')
      .attr('x', (datum): number => {
        return x(datum.id.toString()) + x.bandwidth() / 2;
      })
      .attr('text-anchor', 'middle')
      .text((datum): string => datum.label)
      .transition()
      .duration(1000)
      .attr('y', (datum): number => y(datum.value) + 2 * this.margin);

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
