import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../actions';

/**
 * @class Signout
 */
class Signout extends Component {
  /** @inheritDoc */
  componentWillMount() {
    this.props.signout();
  }

  /** @inheritDoc */
  render() {
    return (
      <div>
        <h3>Your signed out</h3>
      </div>
    );
  }
}

/** @inheritDoc */
const mapDispatchToProps = dispatch => ({
  signout: () => {
    dispatch(actions.signoutUser());
  },
});

/** @inheritDoc */
export default connect(null, mapDispatchToProps)(Signout);
