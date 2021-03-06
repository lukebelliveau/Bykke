// @flow
import React from 'react';
import { connect } from 'react-redux';
import SearchBar from './SearchBar';
import actions from '../../redux/actions';

const mapDispatchToProps = dispatch => ({
  placesFetched: places => {
    dispatch(actions.placesFetched(places));
  },
  loadingStarted: () => {
    dispatch(actions.loadingStarted());
  },
  loadingFinished: () => {
    dispatch(actions.loadingFinished());
  },
  searchPlaces: query => {
    dispatch(actions.searchPlaces(query));
  },
  changeSearchText: text => {
    dispatch(actions.changeSearchText(text));
  },
  backButton: () => {
    dispatch(actions.backButton());
  },
});

const mapStateToProps = state => ({
  searchText: state.searchText,
  trip: state.trip,
  mode: state.mode,
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
