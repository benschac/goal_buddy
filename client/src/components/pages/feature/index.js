import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../actions';
import Timer from '../../Timer';
/**
 * @class Feature
 */
class Feature extends Component {
  /** @inheritDoc */
  componentWillMount() {
    this.props.getAuthedMessage();
  }

  /** @inheritDoc */
  render() {
    return (
      <div>
         Hello from feature
        <Timer remaining={2} />
      </div>
    );
  }
}

export default connect(null, actions)(Feature);
