import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { SearchInput } from 'evergreen-ui';
import * as actions from './redux/actions';
import MovieList from './MovieList';

class MovieSearchForm extends Component { 
  constructor(props){
    super(props);
    this.search = this.search.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.state = { text: "" };
  }
  
  search(){
    const query = Object.freeze({ text: this.state.text });
    console.log(this, query);
    if(this.props.onSearch)
      this.props.onSearch(query);
  }
  
  handleChange(event) {
    this.setState({text: event.target.value});
  }
  
  render() {
    return <form>
      <SearchInput 
        width="100%"
        onChange={this.handleChange} 
        value={this.state.text} />
      <button onClick={this.search} type="button">Search</button>
    </form>;
  }
}




export class MovieContainer extends Component {
  static propTypes = {
    movies: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  render() {
    console.log(this.props);
    return (
      <div className="movies-movie-container">
        <MovieSearchForm onSearch={this.props.actions.search}/>
        <MovieList items={this.props.movies.Search}/>
      </div>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    movies: state.movies,
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
)(MovieContainer);
