import * as d3 from 'd3';


/**
 * The base D3 Chart Class for all charts
 *
 * @class D3Chart
 */
class D3Chart {
  /**
   *
   */
  drawpoints = (element, scales, data) => {
    const g = d3.select(element).selectAll('d3-points');
    const point = g.selectAll('d3-point')
      .data(d => d.id);

    // Todo -- Update to something more generic and or configurable
    point.enter().append('circle')
      .attr('class', 'd3-point');

    point.attr('cx', d => scales(d.x))
      .attr('cy', d => scales(d.y))
      .attr('r', d => scales(d.r));

    point.exit().remove();
  }
  /**
   *
   * @param {*} element
   * @param {*} props
   * @param {*} state
   */
  create = (element, props, state) => {
    const svg = d3
      .select(element).append('svg')
      .attr('class', 'd3')
      .attr('width', props.width)
      .attr('height', props.height);

    svg.append('g')
      // See if there's a better way of doing this then hardcoding it.
      .attr('class', 'd3-points');

    this.update(element, state);
  }

  /**
   *
   * @param {element}
   * @param {func}
   *
   * @return {object} the scaled values
   */
  scales = (element, domain) => {
    if (!domain) {
      return null;
    }

    const width = element.offsetWidth;
    const height = element.offsetHeight;

    const x = d3.scale.linear()
      .range([0, width])
      .domain(domain.x);

    const y = d3.scale.linear()
      .range([height, 0])
      .domain(domain.y);

    const z = d3.scale.linear()
      .range([5, 20])
      .domain([1, 10]);

    return { x, y, z };
  };

  /**
   *
   * @param {*} element
   * @param {*} state
   */
  update = (element, state) => {
    const scales = this.scales(element, state.domain);
    this.drawpoints(element, scales, state.data);
  }

  /**
   *
   * @param {*} element
   */
  // destroy(element) {
  //   // Todo
  // }
}

export default D3Chart;
