import View from '../../superclasses/View';
import * as EventEmitter from 'eventemitter3';
import * as d3 from 'd3';
import StatisticsDatum from '../../lib/StatisticsDatum';

export default class StatisticsView extends View {
  public constructor(container: Element, emitter: EventEmitter) {
    super(container, emitter);
  }

  public draw(data: StatisticsDatum[], inverted: boolean): void {
    const width = 240;
    const height = 240;

    const x = d3.scaleBand()
        .domain(data.map((datum): string => datum.id.toString()))
        .range([0, width])
        .padding(0.2);

    const y = d3.scaleLinear()
        .domain([0, 50])
        .range([height, 10]);

    const svg = d3.select('#bar-chart');

    svg.selectAll('rect')
        .data(data)
        .join('rect')
        .attr('x', (datum): number => x(datum.id.toString()))
        .attr('width', x.bandwidth())
        .transition()
        .duration(1000)
        .attr('fill', (datum, i): string => {
          return (inverted)
              ? ['#2345B2', '#BA1BBA', '#FF4111', '#FFCC00'][i]
              : ['#FFCC00', '#FF4111', '#BA1BBA', '#2345B2'][i];
        })
        .attr('y', (datum): number => y(datum.value))
        .attr('height', (datum): number => height - y(datum.value));

    svg.selectAll('text')
        .data(data)
        .join('text')
        .attr('font-family', '"Montserrat", sans-serif')
        .attr('x', (datum): number => {
          return x(datum.id.toString()) + (x.bandwidth() / 2);
        })
        .attr('text-anchor', 'middle')
        .text((datum): string => datum.label)
        .transition()
        .duration(1000)
        .attr('y', (datum): number => y(datum.value) + 20);
  }
}
