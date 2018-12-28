import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'evergreen-ui';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { fetchGistList } from './redux/actions';
import List from './List';


export class DefaultPage extends Component {
  static propTypes = {
    gists: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  render() {    
    const { fetchGistListPending, gistList, fetchGistListError } = this.props.gists;
    const { fetchGistList } = this.props.actions;
    return (
      <div className="gists-default-page">
        <h1>Gists API Usage</h1>
        <p>This demo shows how to use Redux async actions to fetch data from Gist's REST API.</p>
        <Button className="btn-fetch-reddit" disabled={fetchGistListPending} onClick={fetchGistList}>
          {fetchGistListPending ? 'Fetching...' : 'Fetch gists'}
        </Button>
        
        {fetchGistListError && (
          <div className="fetch-list-error">Failed to load: {fetchGistListError.toString()}</div>
        )}
        <List items={gistList}/>
      </div>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    gists: state.gists,
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ fetchGistList }, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DefaultPage);
