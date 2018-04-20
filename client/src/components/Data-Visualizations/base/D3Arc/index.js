import * as d3 from 'd3';
import { MILLISECONDS, SECONDS } from '../../../../utils/timeFormat';

const tau = 2 * Math.PI; // http://tauday.com/tau-manifesto


/**
 * The base D3 Chart Class for all charts
 *
 * @class D3Chart
 */
class D3Chart {
  constructor() {
    this.arc = d3.arc();
  }
  /**
   *
   * @param {*} element
   * @param {*} props
   * @param {*} state
   */
  create = (element, props) => {
    const { innerRadius, outerRadius, backgroundFill } = props;
    // An arc function with all values bound except the endAngle. So, to compute an
    // SVG path string for a given angle, we pass an object with an endAngle
    // property to the `arc` function, and it will return the corresponding string.

    // Get the SVG container, and apply a transform such that the origin is the
    // center of the canvas. This way, we don’t need to position arcs individually.
    this.arc.innerRadius(innerRadius)
      .outerRadius(outerRadius)
      .startAngle(0);
    const svg = d3.select(element);
    const width = +svg.attr('width');
    const height = +svg.attr('height');
    const g = svg.append('g').attr('transform', `translate(${width / 2},${height / 2})`);

    g.append('path')
      .datum({ endAngle: tau })
      .style('fill', backgroundFill)
      .attr('d', this.arc);
  }


  /**
   *
   * @param {*} element
   * @param {*} state
   */
  update = (element, props, state) => {
    const { progress, totalTime } = state;
    const { progressFill } = props;
    const progressToMinutes = (progress / MILLISECONDS) / SECONDS;
    const totalTimeToMinutes = (totalTime / MILLISECONDS) / SECONDS;

    const convertedTime = ((totalTimeToMinutes - progressToMinutes) * tau);


    d3.select(element).selectAll('g').append('path')
      .datum({ endAngle: convertedTime / 2 })
      .style('fill', progressFill)
      .attr('d', this.arc);
  }
}

export default D3Chart;

