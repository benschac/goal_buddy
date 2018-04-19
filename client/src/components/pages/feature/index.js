import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../actions';
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
      </div>
    );
  }
}


export default connect(null, actions)(Feature);
