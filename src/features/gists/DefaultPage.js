import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import List from './List';
import GlobalHeader from '../common/GlobalHeader';

export class DefaultPage extends Component {
  static propTypes = {
    gists: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  render() {
    
    const { fetchGistListPending, gistList, fetchGistListError } = this.props.gists;
    const { fetchGistList } = this.props.actions;

    console.log(this.props, fetchGistList);

    return (
      <div className="gists-default-page">
        <GlobalHeader/>
        <List/>
        <h1>Gist API Usage</h1>
        <p>This demo shows how to use Redux async actions to fetch data from Gist's REST API.</p>
        <button className="btn-fetch-reddit" disabled={fetchGistListPending} onClick={fetchGistList}>
          {fetchGistListPending ? 'Fetching...' : 'Fetch reactjs topics'}
        </button>
        {fetchGistListError && (
          <div className="fetch-list-error">Failed to load: {fetchGistListError.toString()}</div>
        )}
        {gistList && gistList.length > 0 ? (
          <ul className="examples-reddit-list">
            {gistList.map(item => (
              <li key={item.data.id}>
                <a href={item.data.url}>{item.data.title}</a>
              </li>
            ))}
          </ul>
        ) : (
          <div className="no-items-tip">No items yet.</div>
        )}
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
    actions: bindActionCreators({ ...actions }, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DefaultPage);
