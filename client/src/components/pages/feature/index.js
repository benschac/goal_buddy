import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { connect } from 'react-redux';
import * as actions from '../../../actions';
import Timer from '../../Timer';
import Form from './Form';
/**
 * @class Feature
 */
class Feature extends Component {
  static propTypes = {
    remaining: PropTypes.number.isRequired,
  }


  /** @inheritDoc */
  componentWillMount() {
    this.props.getAuthedMessage();
  }

  /** @inheritDoc */
  render() {
    const { remaining } = this.props;
    return (
      <div>
        <Form placeholder={remaining} value={remaining} />
        <Timer remaining={remaining} />
      </div>
    );
  }
}

/** @inheritDoc */
const mapStateToProps = state => ({
  remaining: Number(_.get(state.form, 'remaining.values.remaining', 30)),
});

export default connect(mapStateToProps, actions)(Feature);
